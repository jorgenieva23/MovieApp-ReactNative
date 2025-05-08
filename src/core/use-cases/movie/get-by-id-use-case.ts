import { HttpAdapter } from '../../../config/adapter/http/http.adapter';
import { MovieDBMovie } from '../../../infrastructure/interface/Interface';
import { MovieMapper } from '../../../infrastructure/mappers/Movie.mappers';
import { FullMovie } from '../../entities/movie.entties';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);
    const fullMovie = MovieMapper.fromMovieDBToEntity(movie);
    return fullMovie;
  } catch (error) {
    throw new Error(`Cannot get movie by id: ${movieId}`);
  }
};
