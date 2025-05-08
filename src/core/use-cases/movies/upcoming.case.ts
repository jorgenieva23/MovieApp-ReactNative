import { HttpAdapter } from '../../../config/adapter/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interface/Interface';
import { MovieMapper } from '../../../infrastructure/mappers/Movie.mappers';
import { Movie } from '../../entities/movie.entties';

export const moviesUpcomingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const upcoming = await fetcher.get<MovieDBMoviesResponse>('/upcoming');

    return upcoming.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - UpcomingUseCase');
  }
};
