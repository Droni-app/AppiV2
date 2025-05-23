import vine from '@vinejs/vine'

export const BackLearnLessonValidator = vine.compile(
  vine.object({
    courseId: vine.string().uuid(),
    name: vine.string().trim().minLength(3),
    slug: vine.string().trim().minLength(3),
    description: vine.string().nullable(),
    content: vine.string().nullable(),
    video: vine.string().nullable(),
    order: vine.number().min(0),
    active: vine.boolean(),
  })
)
