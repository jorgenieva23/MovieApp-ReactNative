import { HttpAdapter } from '../../../config/adapter/http/http.adapter';
import { NowPlayingResponse } from '../../../infrastructure/interface/Interface';
import { MovieMapper } from '../../../infrastructure/mappers/Movie.mappers';
import { Movie } from '../../entities/movie.entties';

export const moviesNowPlayingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');

    return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - NowPlaying');
  }
};
