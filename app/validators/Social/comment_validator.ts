import vine from '@vinejs/vine'

export const createCommentValidator = vine.compile(
  vine.object({
    commentableType: vine.string().trim().minLength(2).maxLength(50),
    commentableId: vine.string().uuid(),
    content: vine.string().trim().minLength(1).maxLength(500),
  })
)

export const indexCommentValidator = vine.compile(
  vine.object({
    commentableType: vine.string().trim().minLength(2).maxLength(50),
    commentableId: vine.string().uuid(),
    page: vine.number().positive().optional(),
    limit: vine.number().positive().max(100).optional(),
  })
)
