import vine from '@vinejs/vine'

export const BackLearnCourseValidator = vine.compile(
  vine.object({
    category: vine.string().nullable(),
    slug: vine.string().trim().minLength(3),
    name: vine.string().trim().minLength(3),
    icon: vine.string().nullable(),
    picture: vine.string().nullable(),
    video: vine.string().nullable(),
    description: vine.string().nullable(),
    open: vine.boolean(),
    ranking: vine.number().min(0).max(5),
  })
)
