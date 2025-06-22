import LearnCourse from '#models/Learn/course'
import LearnCourseLesson from '#models/Learn/course_lesson'
import LearnCourseLessonAnswer from '#models/Learn/course_lesson_answer'
import Site from '#models/site'
import User from '#models/user'

export default class LearnSeeder {
  public async run() {
    // Buscar el sitio principal
    const site = await Site.findBy('domain', 'droni.co')
    if (!site) throw new Error('Site droni.co not found')

    // Buscar el usuario de prueba
    const user = await User.findBy('email', 'kalvinmanson@gmail.com')
    if (!user) throw new Error('User not found')

    // Crear un curso de prueba
    const course = await LearnCourse.create({
      siteId: site.id,
      userId: user.id,
      category: 'programming',
      name: 'Curso de Programación AdonisJS',
      slug: 'curso-programacion-adonisjs',
      description: 'Aprende a desarrollar aplicaciones web con AdonisJS, un framework para NodeJS',
      icon: null,
      picture: null,
      video: null,
      open: true,
      rank: 4.5,
    })

    // Crear lecciones para el curso
    const lessons = await LearnCourseLesson.createMany([
      {
        learnCourseId: course.id,
        position: 1,
        type: 'document',
        name: 'Introducción a AdonisJS',
        slug: 'introduccion-a-adonisjs',
        description: 'Conoce los conceptos básicos de AdonisJS y su ecosistema',
        content:
          '# Introducción a AdonisJS\n\nAdonisJS es un framework MVC para Node.js que ofrece un ecosistema estable para escribir aplicaciones web del lado del servidor.\n\nEn esta lección aprenderemos los conceptos básicos y la estructura de una aplicación AdonisJS.',
        video: null,
        live: null,
        liveDate: null,
        limitDate: null,
      },
      {
        learnCourseId: course.id,
        position: 2,
        type: 'video',
        name: 'Modelo-Vista-Controlador en AdonisJS',
        slug: 'mvc-en-adonisjs',
        description: 'Aprende el patrón MVC y cómo se implementa en AdonisJS',
        content:
          '# Modelo-Vista-Controlador en AdonisJS\n\nEl patrón MVC (Modelo-Vista-Controlador) es un patrón de arquitectura de software que separa los datos y la lógica de negocio de una aplicación de la interfaz de usuario y el módulo encargado de gestionar los eventos y las comunicaciones.',
        video: 'https://www.youtube.com/watch?v=example',
        live: null,
        liveDate: null,
        limitDate: null,
      },
    ])
    // Crear respuestas de lecciones
    await LearnCourseLessonAnswer.createMany([
      {
        userId: user.id,
        learnCourseLessonId: lessons[0].id,
        answer: 'Esta es una respuesta de prueba para la lección 1',
        active: true,
      },
    ])
  }
}
