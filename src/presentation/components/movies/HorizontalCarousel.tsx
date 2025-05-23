import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Movie } from '../../../core/entities/movie.entties';
import { FlatList } from 'react-native-gesture-handler';
import { MoviesPoster } from './MoviesPoster';

interface Props {
  movie: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

export const HorizontalCarousel = ({ movie, title, loadNextPage }: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movie]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
    if (!isEndReached) return;
    isLoading.current = true;
    loadNextPage && loadNextPage();
  };

  return (
    <View style={{ height: title ? 200 : 220 }}>
      {title && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: 300,
            marginLeft: 20,
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}
      <FlatList
        data={movie}
        renderItem={({ item }) => (
          <MoviesPoster movie={item} width={100} height={150} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};
