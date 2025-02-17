import Movie from '#models/movie'

type MovieSortOption = {
  id: string
  text: string
  field: keyof Movie
  dir: 'asc' | 'desc' | undefined
}

export default class MovieService {
  static sortOptions: MovieSortOption[] = [
    { id: 'title_asc', text: 'Title (asc)', field: 'title', dir: 'asc' },
    { id: 'title_desc', text: 'Title (desc)', field: 'title', dir: 'desc' },
    { id: 'released_asc', text: 'Released Date (asc)', field: 'releasedAt', dir: 'asc' },
    { id: 'released_desc', text: 'Released Date (desc)', field: 'releasedAt', dir: 'desc' },
  ]

  static getFiltered(filters: Record<string, any>) {
    const sort =
      this.sortOptions.find((option) => option.id === filters.sort) || this.sortOptions[0]

    return Movie.query()
      .apply((scope) => scope.released())
      .if(filters.search, (query) => query.whereILike('title', `%${filters.search}%`))
      .if(filters.status, (query) => query.where('statusId', filters.status))
      .preload('director')
      .preload('writer')
      .preload('status')
      .orderBy(sort.field, sort.dir)
      .limit(15)
  }
}
