import { HttpAdapter } from '../../../config/adapter/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interface/Interface';
import { MovieMapper } from '../../../infrastructure/mappers/Movie.mappers';
import { Movie } from '../../entities/movie.entties';

interface Options {
  page?: number;
  limit?: number;
}

export const moviesPopularUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const popular = await fetcher.get<MovieDBMoviesResponse>('/popular', {
      params: {
        page: options?.page ?? 1,
      },
    });

    return popular.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - PopularUseCase');
  }
};
