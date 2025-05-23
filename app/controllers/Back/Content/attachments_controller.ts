import type { HttpContext } from '@adonisjs/core/http'
import ContentAttachment from '#models/Content/attachment'
import fs from 'node:fs'
import { createAttachmentValidator } from '#validators/Back/Content/attachment_validator'

export default class AttachmentsController {
  /**
   * Lista todos los archivos adjuntos del sitio con paginación y búsqueda
   */
  public async index({ request, response, site }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const q = request.input('q')

    const query = ContentAttachment.query().where('site_id', site.id)
    if (q) {
      query.whereILike('name', `%${q}%`)
    }

    const attachments = await query.orderBy('created_at', 'desc').paginate(page, perPage)
    return response.ok(attachments)
  }

  /**
   * Sube un nuevo archivo adjunto
   */
  public async store({ request, response, site, auth }: HttpContext) {
    // Validar nombre si se proporciona
    const payload = await request.validateUsing(createAttachmentValidator)
    const fileName = `${Date.now()}-${payload.file.clientName}`

    // Crear el registro en la base de datos
    const attachment = await ContentAttachment.create({
      siteId: site.id,
      userId: auth.user!.id,
      name: payload.name || payload.file.clientName,
      path: `uploads/${fileName}`,
      size: payload.file.size,
      mime: payload.file.type ?? payload.file.subtype,
    })

    return response.created(attachment)
  }

  /**
   * Elimina un archivo adjunto
   */
  public async destroy({ params, response, site }: HttpContext) {
    const attachment = await ContentAttachment.query()
      .where('id', params.id)
      .where('site_id', site.id)
      .firstOrFail()

    // Eliminar el archivo físico
    try {
      const filePath = `./public/${attachment.path}`
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    } catch (error) {
      console.error('Error al eliminar archivo físico:', error)
    }

    await attachment.delete()
    return response.noContent()
  }
}
