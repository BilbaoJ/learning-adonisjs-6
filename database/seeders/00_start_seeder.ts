import MovieStatuses from '#enums/movies_statuses'
import Roles from '#enums/roles'
import MovieStatus from '#models/movie_status'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.USER,
        name: 'User',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])

    await MovieStatus.createMany([
      {
        id: MovieStatuses.WRITING,
        name: 'writing',
      },
      {
        id: MovieStatuses.CASTING,
        name: 'casting',
      },
      {
        id: MovieStatuses.PRODUCTION,
        name: 'production',
      },
      {
        id: MovieStatuses.POST_PRODUCTION,
        name: 'Post production',
      },
      {
        id: MovieStatuses.RELEASED,
        name: 'Released',
      },
    ])
  }
}
