import vine from '@vinejs/vine'

export const BackLearnQuestionValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    question: vine.string().trim().nullable(),
    answer1: vine.string().trim(),
    answer2: vine.string().trim(),
    answer3: vine.string().trim(),
    answer4: vine.string().trim(),
    answer5: vine.string().trim(),
    correct: vine.number().min(1).max(5).optional(),
  })
)
