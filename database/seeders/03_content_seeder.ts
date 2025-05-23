import ContentCategory from '#models/Content/category'
import ContentPost from '#models/Content/post'
import ContentAttr from '#models/Content/attr'
import SocialComment from '#models/Social/comment'
import Site from '#models/site'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class ContentSeeder {
  public async run() {
    // Buscar el sitio principal
    const site = await Site.findBy('domain', 'droni.co')
    if (!site) throw new Error('Site droni.co not found')

    // Buscar el usuario de prueba
    const user = await User.findBy('email', 'kalvinmanson@gmail.com')
    if (!user) throw new Error('User not found')

    // Crear dos categorías
    const cat1 = await ContentCategory.create({
      siteId: site.id,
      name: 'Categoría de Prueba 1',
      slug: 'categoria-prueba-1',
      description: 'Descripción de la categoría 1',
      picture: null,
    })
    const cat2 = await ContentCategory.create({
      siteId: site.id,
      name: 'Categoría de Prueba 2',
      slug: 'categoria-prueba-2',
      description: 'Descripción de la categoría 2',
      picture: null,
    })

    // Crear dos posts
    const post1 = await ContentPost.create({
      userId: user.id,
      siteId: site.id,
      contentCategoryId: cat1.id,
      slug: 'primer-post',
      name: 'Primer Post',
      description: 'Descripción del primer post',
      picture: null,
      content: 'Contenido del primer post',
      format: 'markdown',
      active: true,
    })
    const post2 = await ContentPost.create({
      userId: user.id,
      siteId: site.id,
      contentCategoryId: cat2.id,
      slug: 'segundo-post',
      name: 'Segundo Post',
      description: 'Descripción del segundo post',
      picture: null,
      content: 'Contenido del segundo post',
      format: 'markdown',
      active: true,
    })

    // Crear dos attrs para cada post
    await ContentAttr.createMany([
      { contentPostId: post1.id, name: 'color', type: 'string', value: 'rojo' },
      { contentPostId: post1.id, name: 'tamaño', type: 'string', value: 'grande' },
      { contentPostId: post2.id, name: 'color', type: 'string', value: 'azul' },
      { contentPostId: post2.id, name: 'tamaño', type: 'string', value: 'pequeño' },
    ])

    // Crear comentarios de prueba para cada post
    await SocialComment.create({
      userId: user.id,
      siteId: site.id,
      commentableType: 'ContentPost',
      commentableId: post1.id,
      content: 'Comentario de prueba en el primer post',
      approvedAt: DateTime.now(),
    })
    await SocialComment.create({
      userId: user.id,
      siteId: site.id,
      commentableType: 'ContentPost',
      commentableId: post2.id,
      content: 'Comentario de prueba en el segundo post',
      approvedAt: DateTime.now(),
    })
  }
}
