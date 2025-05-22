import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    description: vine.string().maxLength(255).nullable(),
    picture: vine.string().url().nullable().optional(),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    description: vine.string().maxLength(255).nullable().optional(),
    picture: vine.string().url().nullable().optional(),
  })
)
