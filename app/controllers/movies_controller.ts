import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const comingSoon = await Movie.query()
      .apply((scope) => scope.notReleased)
      .preload('director')
      .preload('writer')
      .whereNotNull('releasedAt')
      .orderBy('releasedAt')
      .limit(3)

    const recentlyReleased = await Movie.query()
      .apply((scope) => scope.released())
      .preload('director')
      .preload('writer')
      .orderBy('releasedAt', 'desc')
      .limit(9)
    return view.render('pages/home', { comingSoon, recentlyReleased })
  }

  async show({ view, params }: HttpContext) {
    //ctx.view.share({ movie: 'My awesome movie' })
    const movie = await Movie.findByOrFail('slug', params.slug)
    await movie.load('director')
    await movie.load('writer')
    return view.render('pages/movies/show', { movie })
  }
}
