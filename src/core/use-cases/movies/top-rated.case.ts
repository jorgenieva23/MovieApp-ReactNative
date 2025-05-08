import { HttpAdapter } from '../../../config/adapter/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interface/Interface';
import { MovieMapper } from '../../../infrastructure/mappers/Movie.mappers';
import { Movie } from '../../entities/movie.entties';

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<MovieDBMoviesResponse>('/top_rated');

    return topRated.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - TopRated');
  }
};
