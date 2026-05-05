import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const MovieSkeleton = () => {
  const opacity = new Animated.Value(0.3);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textPlaceholderShort} />
      <View style={styles.textPlaceholderLong} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { width: 165, height: 320, backgroundColor: '#222', borderRadius: 20, margin: 10 },
  imagePlaceholder: { width: '100%', height: 250, backgroundColor: '#333', borderRadius: 20 },
  textPlaceholderShort: { width: '60%', height: 12, backgroundColor: '#333', marginTop: 12, marginLeft: 10, borderRadius: 6 },
  textPlaceholderLong: { width: '40%', height: 10, backgroundColor: '#333', marginTop: 8, marginLeft: 10, borderRadius: 5 },
});

export default MovieSkeleton;