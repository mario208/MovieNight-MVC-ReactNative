import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useHomeController } from '../../src/controller/useHomeController';
import MovieCard from '../../src/views/components/MovieCard';
import { Colors } from '../../src/views/theme/colors';

export default function TabOneScreen() {
  // Destructure the new search state and handler from the controller
  const { movies, isLoading, refresh, searchQuery, handleSearch } = useHomeController();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movie Night</Text>

      {/* Neon Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
        selectionColor={Colors.primary}
      />

      {isLoading && movies.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <MovieCard 
              movie={item} 
              onPress={() => router.push(`/movie/${item.id}`)} 
            />
          )}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading} 
              onRefresh={refresh} 
              tintColor={Colors.primary} 
            />
          }
          ListEmptyComponent={
            !isLoading ? <Text style={styles.emptyText}>No movies found.</Text> : null
          }
          contentContainerStyle={styles.listPadding}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 20,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 0, 0.3)', // Neon orange border
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  listPadding: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 50,
  }
});