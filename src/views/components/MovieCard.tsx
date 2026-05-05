import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Movie } from '../../models/movie.model';
import { Colors } from '../theme/colors';
import { useGlobalController } from '../../controller/MovieContext';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const { isFavorite, toggleFavorite } = useGlobalController();
  const active = isFavorite(movie.id);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity 0 -> 1
  const slideAnim = useRef(new Animated.Value(20)).current; // Position 20 -> 0

  useEffect(() => {
    // Start animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={{ 
        opacity: fadeAnim, 
        transform: [{ translateY: slideAnim }] 
      }}
    >
      <TouchableOpacity 
        style={styles.card} 
        onPress={onPress} 
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        
        <Pressable 
          style={styles.favoriteBadge} 
          onPress={() => toggleFavorite(movie.id)}
        >
          <FontAwesome 
            name={active ? "heart" : "heart-o"} 
            size={20} 
            color={active ? Colors.primary : "#fff"} 
          />
        </Pressable>

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.title}
          </Text>
          <View style={styles.row}>
            <FontAwesome name="star" size={12} color="#FFB33F" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            <Text style={styles.year}>{movie.release_date?.split('-')[0] || 'N/A'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 165,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    margin: 10,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  poster: {
    width: '100%',
    height: 250,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    zIndex: 10, // Ensure the badge stays clickable
  },
  info: {
    padding: 12,
    backgroundColor: '#1A1A1A',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    color: '#FFB33F',
    fontSize: 12,
    fontWeight: '600',
  },
  year: {
    color: '#888',
    fontSize: 11,
    marginLeft: 'auto',
  }
});

export default MovieCard;