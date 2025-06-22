import type { HttpContext } from '@adonisjs/core/http'
import ContentAttachment from '#models/Content/attachment'
import { createAttachmentValidator } from '#validators/Content/attachment_validator'
import string from '@adonisjs/core/helpers/string'
import drive from '@adonisjs/drive/services/main'
import db from '@adonisjs/lucid/services/db'

export default class AttachmentsController {
  /**
   * @index
   * @paramQuery <page> - Page number for pagination - @type(number)
   * @paramQuery <perPage> - Number of items per page - @type(number)
   * @paramQuery <q> - Search query for attachment names - @type(string)
   * @responseBody 200 - <ContentAttachment[]>.paginated()
   * @tag Content Attachments
   */
  public async index({ request, response, auth, site }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')

    const attachments = await ContentAttachment.query()
      .where('site_id', site.id)
      .where('user_id', auth.user!.id)
      .if(q, (qB) => {
        qB.whereILike('name', `%${q}%`)
      })
      .preload('user')
      .preload('site')
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return response.ok(attachments)
  }
  /**
   * @store
   * @requestFormDataBody {"name":{"type":"string"},"file":{"type":"string","format":"binary"}}
   * @responseBody 201 - <ContentAttachment>
   * @tag Content Attachments
   */
  public async store({ request, response, auth, site }: HttpContext) {
    // Validar nombre si se proporciona
    const payload = await request.validateUsing(createAttachmentValidator)

    // validar el limite de almacenamiento para el usuario obteniedo la suma de los archivos
    const sumSize = await db.from('content_attachments').where('user_id', auth.user!.id).sum('size as totalSize').first()

    if (sumSize.totalSize > Number(process.env.MAX_USER_STORAGE)) {
      throw new Error('Storage limit exceeded')
    }

    // Generar ruta única por sitio y usuario
    const path = `${site.id}/${auth.user!.id}/${payload.file.size}-${string.slug(payload.file.clientName)}`

    // store file
    await payload.file.moveToDisk(path)

    // Crear el registro en la base de datos
    const attachment = await ContentAttachment.create({
      siteId: site.id,
      userId: auth.user!.id,
      name: payload.name ?? payload.file.clientName,
      path: payload.file.meta?.path ?? path,
      size: payload.file.size,
      mime: payload.file.type ?? payload.file.subtype,
    })

    return response.created(attachment)
  }
  /**
   * @destroy
   * @responseBody 204 - No Content
   * @tag Content Attachments
   */
  public async destroy({ params, response, auth, site }: HttpContext) {
    const attachment = await ContentAttachment.query().where('id', params.id).where('site_id', site.id).where('user_id', auth.user!.id).firstOrFail()

    // Eliminar el archivo físico
    const disk = drive.use()
    await disk.delete(attachment.path)

    await attachment.delete()
    return response.noContent()
  }
}
