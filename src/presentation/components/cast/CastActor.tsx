import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Cast } from '../../../core/entities/cast.entities';

interface Props {
  actor: Cast;
}

export const CastActor = ({ actor }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 150, borderRadius: 10 }}
        source={{ uri: actor.avatar }}
      />
      <View>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{actor.name}</Text>
        <Text style={{ fontSize: 12, opacity: 0.7 }}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
});
