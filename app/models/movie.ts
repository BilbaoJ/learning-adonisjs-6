import MovieStatuses from '#enums/movies_statuses'
import { BaseModel, column, scope } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare statusId: number

  @column()
  declare writerId: number

  @column()
  declare directorId: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare summary: string

  @column()
  declare abstract: string

  @column()
  declare posterUrl: string

  @column.dateTime()
  declare releasedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static releaded = scope((query) => {
    query.where((group) =>
      group
        .where('statusId', MovieStatuses.RELEASED)
        .whereNotNull('releasedAt')
        .where('releasedAt', '<=', DateTime.now().toSQL())
    )
  })

  // static async all() {
  //   const slugs = await MovieService.getSlugs()
  //   const movies: Movie[] = []

  //   for (const slug of slugs) {
  //     const movie = await this.find(slug)
  //     movies.push(movie)
  //   }

  //   return movies
  // }

  // static async find(slug: string) {
  //   if (await cache.has(slug)) {
  //     console.log(`Cache Hit: ${slug}`)
  //     return cache.get(slug)
  //   }
  //   const md = await MovieService.read(slug)
  //   const movie = new Movie()
  //   movie.title = md.frontmatter.title
  //   movie.summary = md.frontmatter.summary
  //   movie.slug = slug
  //   movie.abstract = toHtml(md).contents

  //   await cache.set(slug, movie)

  //   return movie
  // }
}
