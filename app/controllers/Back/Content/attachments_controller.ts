import type { HttpContext } from '@adonisjs/core/http'
import ContentAttachment from '#models/Content/attachment'
import { createAttachmentValidator } from '#validators/Back/Content/attachment_validator'
import string from '@adonisjs/core/helpers/string'
import drive from '@adonisjs/drive/services/main'

export default class AttachmentsController {
  /**
   * Lista todos los archivos adjuntos del sitio con paginación y búsqueda
   */
  public async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')

    const attachments = await ContentAttachment.query()
      .where('site_id', site.id)
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
   * Sube un nuevo archivo adjunto
   */
  public async store({ request, response, site, auth }: HttpContext) {
    // Validar nombre si se proporciona
    const payload = await request.validateUsing(createAttachmentValidator)
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
   * Elimina un archivo adjunto
   */
  public async destroy({ params, response, site }: HttpContext) {
    const attachment = await ContentAttachment.query().where('id', params.id).where('site_id', site.id).firstOrFail()

    // Eliminar el archivo físico
    const disk = drive.use()
    await disk.delete(attachment.path)

    await attachment.delete()
    return response.noContent()
  }
}
