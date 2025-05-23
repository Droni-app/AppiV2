import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    contentCategoryId: vine.string().uuid().nullable().optional(),
    name: vine.string().trim().minLength(2).maxLength(100),
    description: vine.string().maxLength(255).nullable().optional(),
    picture: vine.string().url().nullable().optional(),
    content: vine.string().nullable().optional(),
    format: vine.string().trim().toLowerCase().in(['markdown', 'html']),
    active: vine.boolean().optional(),
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    contentCategoryId: vine.string().uuid().nullable().optional(),
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    description: vine.string().maxLength(255).nullable().optional(),
    picture: vine.string().url().nullable().optional(),
    content: vine.string().nullable().optional(),
    format: vine.string().trim().toLowerCase().in(['markdown', 'html']),
    active: vine.boolean().optional(),
  })
)
