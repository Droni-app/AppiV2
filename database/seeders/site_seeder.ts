import Site from '#models/site'

export default class SiteSeeder {
  public async run() {
    await Site.create({
      name: 'Droni.co',
      domain: 'principal.com',
      secret: null,
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
      secret: null,
      description: 'Sitio secundario de pruebas',
      logo: null,
      icon: null,
      provider: null,
      providerClientId: null,
      providerClientSecret: null,
    })
  }
}
