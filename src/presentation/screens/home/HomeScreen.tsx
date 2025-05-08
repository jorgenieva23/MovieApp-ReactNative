import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { useMovies } from '../../hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLouder } from '../../components/louder/FullScreenLouder';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage,
  } = useMovies();

  if (isLoading) {
    return <FullScreenLouder />;
  }

  return (
    <ScrollView>
      <View
        style={{
          marginTop: top + 20,
          paddingBottom: 30,
        }}>
        <PosterCarousel movies={nowPlaying} />
        <HorizontalCarousel
          movie={popular}
          title="Populares"
          loadNextPage={popularNextPage}
        />
        <HorizontalCarousel movie={topRated} title="Mejor Calificada" />
        <HorizontalCarousel movie={upcoming} title="Próximamente" />
      </View>
    </ScrollView>
  );
};
