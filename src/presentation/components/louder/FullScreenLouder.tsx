import { ActivityIndicator, View } from 'react-native';
import React from 'react';

export const FullScreenLouder = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <ActivityIndicator size="large" color={'indigo'} />
    </View>
  );
};
