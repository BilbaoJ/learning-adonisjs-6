/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RedisController = () => import('#controllers/redis_controller')
const DirectorsController = () => import('#controllers/directors_controller')
const WritersController = () => import('#controllers/writers_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const HomeController = () => import('#controllers/home_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const MoviesController = () => import('#controllers/movies_controller')

//router.on('/').render('pages/home').as('home')

router.get('/', [HomeController, 'index']).as('home')

router.get('/movies', [MoviesController, 'index']).as('movies.index')

// router.get('/movies', () => {}).as('movies.index')
// router.get('/movies/my-awesome-movie', () => {}).as('movies.show')
// router.get('/movies/create', () => {}).as('movies.create')
// router.post('/movies', () => {}).as('movies.store')
// router.get('/movies/my-awesome-movie/edit', () => {}).as('movies.edit')
// router.put('/movies/my-awesome-movie', () => {}).as('movies.update')
// router.delete('/movies/my-awesome-movie', () => {}).as('movies.destroy')

router
  .get('/movies/:slug', [MoviesController, 'show'])
  .as('movies.show')
  .where('slug', router.matchers.slug())

router.get('/directors', [DirectorsController, 'index']).as('directors.index')
router.get('/directors/:id', [DirectorsController, 'show']).as('directors.show')

router.get('/writers', [WritersController, 'index']).as('writers.index')
router.get('/writers/:id', [WritersController, 'show']).as('writers.show')

router.delete('redis/flush', [RedisController, 'flush']).as('redis.flush')
router.delete('redis/:slug', [RedisController, 'destroy']).as('redis.destroy')

router
  .group(() => {
    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post('register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())

    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

    router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())
  })
  .prefix('/auth')
  .as('auth')

router
  .group(() => {
    router
      .get('/', async (ctx) => {
        return 'You are here!'
      })
      .as('index')
  })
  .prefix('/admin')
  .as('admin')
  .use(middleware.admin())
