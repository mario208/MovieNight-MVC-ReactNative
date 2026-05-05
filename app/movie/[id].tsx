import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useDetailController } from '../../src/controller/useDetailController';
import { Colors } from '../../src/views/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview'; // Ensure this is installed

const { width } = Dimensions.get('window');

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  // Now destructuring trailers from the updated controller
  const { movie, trailers, isLoading } = useDetailController(id as string);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Movie details could not be found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Stack.Screen 
        options={{ 
          headerTransparent: true, 
          headerTitle: '', 
          headerTintColor: '#fff' 
        }} 
      />

      {/* Hero Backdrop */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }} 
          style={styles.backdrop} 
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View style={styles.glassCard}>
          <Text style={styles.title}>{movie.title}</Text>
          
          <View style={styles.row}>
            <View style={styles.badge}>
              <FontAwesome name="star" size={14} color="#FFB33F" />
              <Text style={styles.badgeText}>{movie.vote_average.toFixed(1)}</Text>
            </View>
            <Text style={styles.dateText}>{movie.release_date.split('-')[0]}</Text>
          </View>

          {movie.tagline ? <Text style={styles.tagline}>"{movie.tagline}"</Text> : null}

          <Text style={styles.sectionHeader}>Overview</Text>
          <Text style={styles.overview}>{movie.overview}</Text>

          {/* Trailer Section - Only renders if a trailer key exists */}
          {trailers && trailers.length > 0 && (
            <View style={styles.trailerWrapper}>
              <Text style={styles.sectionHeader}>Official Trailer</Text>
              <View style={styles.videoContainer}>
                <WebView
                  style={styles.webview}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsFullscreenVideo={true}
                  source={{ uri: `https://www.youtube.com/embed/${trailers[0].key}` }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: width,
    height: 450,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    marginTop: -100,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  glassCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.85)',
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 179, 63, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
  },
  badgeText: {
    color: '#FFB33F',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#aaa',
    fontSize: 16,
  },
  tagline: {
    color: Colors.primary,
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
    opacity: 0.9,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  overview: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  trailerWrapper: {
    marginTop: 10,
  },
  videoContainer: {
    height: 200,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginTop: 10,
  },
  webview: {
    flex: 1,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  }
});