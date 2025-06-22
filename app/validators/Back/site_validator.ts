import vine from '@vinejs/vine'

export const storeSiteValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    domain: vine.string().trim().minLength(3).maxLength(100).unique({ table: 'sites', column: 'domain' }),
    description: vine.string().maxLength(255).nullable().optional(),
    logo: vine.string().url().nullable().optional(),
    icon: vine.string().url().nullable().optional(),
    provider: vine.string().nullable().optional(),
    providerClientId: vine.string().nullable().optional(),
    providerClientSecret: vine.string().nullable().optional(),
  })
)

export const updateSiteValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    domain: vine.string().trim().minLength(3).maxLength(100).optional(),
    description: vine.string().maxLength(255).nullable().optional(),
    logo: vine.string().url().nullable().optional(),
    icon: vine.string().url().nullable().optional(),
    provider: vine.string().nullable().optional(),
    providerClientId: vine.string().nullable().optional(),
    providerClientSecret: vine.string().nullable().optional(),
  })
)
