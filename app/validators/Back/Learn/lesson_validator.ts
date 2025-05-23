import vine from '@vinejs/vine'

export const BackLearnLessonValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().nullable(),
    content: vine.string().nullable().optional(),
    video: vine.string().nullable().optional(),
    active: vine.boolean().optional(),
    position: vine.number().optional(),
  })
)
