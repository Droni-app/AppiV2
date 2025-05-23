import vine from '@vinejs/vine'

export const BackLearnCourseValidator = vine.compile(
  vine.object({
    userId: vine.string().uuid().nullable().optional(),
    category: vine.string().nullable(),
    name: vine.string().trim().minLength(3),
    icon: vine.string().nullable().optional(),
    picture: vine.string().nullable().optional(),
    video: vine.string().nullable().optional(),
    description: vine.string(),
    open: vine.boolean().optional(),
  })
)
