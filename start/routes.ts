/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RedisController = () => import('#controllers/redis_controller')
import router from '@adonisjs/core/services/router'
const MoviesController = () => import('#controllers/movies_controller')

//router.on('/').render('pages/home').as('home')

router.get('/', [MoviesController, 'index']).as('home')

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

router.delete('redis/flush', [RedisController, 'flush']).as('redis.flush')
router.delete('redis/:slug', [RedisController, 'destroy']).as('redis.destroy')
