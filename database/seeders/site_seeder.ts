import Site from '#models/site'
import string from '@adonisjs/core/helpers/string'

export default class SiteSeeder {
  public async run() {
    await Site.create({
      name: 'Droni.co',
      domain: 'droni.co',
      secret: string.generateRandom(32),
      description: 'Sitio principal de la plataforma',
      logo: null,
      icon: null,
      provider: null,
      providerClientId: null,
      providerClientSecret: null,
    })
    await Site.create({
      name: 'Kosante',
      domain: 'secundario.com',
      secret: string.generateRandom(32),
      description: 'Sitio secundario de pruebas',
      logo: null,
      icon: null,
      provider: null,
      providerClientId: null,
      providerClientSecret: null,
    })
  }
}
