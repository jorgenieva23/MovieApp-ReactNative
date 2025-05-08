import React from 'react';
import { Text, View } from 'react-native';
import { Movie } from '../../../core/entities/movie.entties';
import { ScrollView } from 'react-native-gesture-handler';
import { MoviesPoster } from './MoviesPoster';

interface Props {
  movies: Movie[];
  height?: number;
}

export const PosterCarousel = ({ height = 400, movies }: Props) => {
  return (
    <View style={{ height }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <MoviesPoster key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
};
