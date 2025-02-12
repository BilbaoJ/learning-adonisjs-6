import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies = await Movie.all()
    return view.render('pages/home', { movies })
  }

  async show({ view, params }: HttpContext) {
    //ctx.view.share({ movie: 'My awesome movie' })
    const movie = await Movie.findByOrFail('slug', params.slug)
    return view.render('pages/movies/show', { movie })
  }
}
