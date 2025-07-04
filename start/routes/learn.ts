import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LearnCoursesController = () => import('#controllers/Learn/courses_controller')
const LearnCourseLessonsController = () => import('#controllers/Learn/course_lessons_controller')
const LearnCourseLessonAnswersController = () => import('#controllers/Learn/course_lesson_answers_controller')
const LearnCourseQuestionsController = () => import('#controllers/Learn/course_questions_controller')
const LearnCourseInscriptionsController = () => import('#controllers/Learn/course_inscriptions_controller')

// Public routes
router
  .group(() => {
    router.resource('courses', LearnCoursesController).only(['index', 'show'])
    router.resource('courses.lessons', LearnCourseLessonsController).only(['index', 'show'])
    router.resource('courses.questions', LearnCourseQuestionsController).only(['index', 'show'])
    router.resource('courses.lessons.answers', LearnCourseLessonAnswersController).only(['index', 'show'])
  })
  .use([middleware.site()])
  .prefix('learn')

// Private routes
router
  .group(() => {
    router.resource('courses.lessons.answers', LearnCourseLessonAnswersController).only(['store'])
    router.resource('courses.inscriptions', LearnCourseInscriptionsController).only(['index', 'store', 'destroy'])
  })
  .use([middleware.auth(), middleware.site()])
  .prefix('learn')
