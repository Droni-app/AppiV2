import vine from '@vinejs/vine'

export const createAnswerValidator = vine.compile(
  vine.object({
    answer: vine.string().trim().maxLength(1000),
    attachments: vine.string().optional(),
    active: vine.boolean().optional(),
  })
)
