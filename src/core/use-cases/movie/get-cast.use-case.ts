import { HttpAdapter } from '../../../config/adapter/http/http.adapter';
import { MovieDBCastResponse } from '../../../infrastructure/interface/Interface';
import { CastMapper } from '../../../infrastructure/mappers/Cast.mapper';
import { Cast } from '../../entities/cast.entities';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Cast[]> => {
  try {
    const { cast } = await fetcher.get<MovieDBCastResponse>(
      `/${movieId}/credits`,
    );
    const actors = cast.map(CastMapper.fromMovieDBCastToEntity);
    return actors;
  } catch (error) {
    throw new Error(`Cannot get movie cast ${movieId}`);
  }
};
