import { CineastFactory } from '#database/factories/cineast_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { UserFactory } from '#database/factories/user_factory'
import MovieStatuses from '#enums/movies_statuses'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment: string[] = ['development', 'testing']
  async run() {
    await CineastFactory.createMany(10)
    await MovieFactory.merge({
      statusId: MovieStatuses.RELEASED,
      releasedAt: DateTime.now().minus({ month: 1 }),
    }).createMany(3)
    await UserFactory.createMany(5)
  }
}
