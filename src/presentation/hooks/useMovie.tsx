import React, { useEffect, useState } from 'react';
import * as useCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapter/movieDB.adapter';
import { FullMovie } from '../../core/entities/movie.entties';
import { Cast } from '../../core/entities/cast.entities';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    try {
      setIsLoading(true);

      const moviePromise = useCases.getMovieByIdUseCase(
        movieDBFetcher,
        movieId,
      );
      const castPromise = useCases.getMovieCastUseCase(movieDBFetcher, movieId);

      const [fullMovie, castList] = await Promise.all([
        moviePromise,
        castPromise,
      ]);

      setMovie(fullMovie);
      setCast(castList);
    } catch (error) {
      console.error('Error loading movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    movie,
    cast,
  };
};
