import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entties';
import * as UseCases from '../../core/use-cases/index';
import { movieDBFetcher } from '../../config/adapter/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const [popularPage, setPopularPage] = useState(1);


  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPlayingPromises = await UseCases.moviesNowPlayingUseCase(
      movieDBFetcher,
    );
    const popularPromises = await UseCases.moviesPopularUseCase(movieDBFetcher);
    const topRatedPromises = await UseCases.moviesTopRatedUseCase(
      movieDBFetcher,
    );
    const upcomingPromises = await UseCases.moviesUpcomingUseCase(
      movieDBFetcher,
    );

    const [newPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] =
      await Promise.all([
        nowPlayingPromises,
        popularPromises,
        topRatedPromises,
        upcomingPromises,
      ]);

    setNowPlaying(newPlayingMovies);
    setPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  };
  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,

    popularNextPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(
        movieDBFetcher,
        {
          page: popularPageNumber,
        },
      );
      setPopular(prev => [...prev, ...popularMovies]);
    },
  };
};
