import { Text } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootsStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/MovieHeader';

import { ScrollView } from 'react-native-gesture-handler';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { FullScreenLouder } from '../../components/louder/FullScreenLouder';

interface Props extends StackScreenProps<RootsStackParams, 'Details'> {}

export const DetailsScreen = ({ route }: Props) => {
  const { movieId } = route.params;
  const { isLoading, movie, cast } = useMovie(movieId);
  
  if (isLoading) {
    return <FullScreenLouder />;
  }

  return (
    <ScrollView>
      <MovieHeader
        poster={movie!.poster}
        originalTitle={movie!.originalTitle}
        title={movie!.title}
        description={movie!.description}
      />
      <MovieDetails movie={movie!} cast={cast!} />
    </ScrollView>
  );
};
