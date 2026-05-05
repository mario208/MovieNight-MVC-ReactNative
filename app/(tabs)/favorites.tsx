import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGlobalController } from '../../src/controller/MovieContext';
import MovieCard from '../../src/views/components/MovieCard';
import { Colors } from '../../src/views/theme/colors';

export default function FavoritesScreen() {
  // Use the Global Controller to get the list of favorite IDs
  const { favorites, movies } = useGlobalController();

  // Filter the movies list to only show the ones saved as favorites
  const favoriteMovies = movies.filter((m: any) => favorites.includes(m.id));

  return (
    <View style={styles.container}>
      {favoriteMovies.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No favorites added yet. 🎬</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <MovieCard movie={item} />} // No onPress needed here, as we
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 18,
  },
  list: {
    paddingTop: 20,
    alignItems: 'center',
  },
});