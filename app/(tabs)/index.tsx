import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useHomeController } from '../../src/controller/useHomeController'; // تأكد من المسار
import MovieCard from '../../src/views/components/MovieCard'; // تأكد من المسار
import { Colors } from '../../src/views/theme/colors'; // تأكد من المسار

export default function TabOneScreen() {
  const { movies, isLoading, refresh, searchQuery, handleSearch } = useHomeController();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
        selectionColor="#FF4400"
      />

      {isLoading && movies.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF4400" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <MovieCard 
              movie={item} 
              onPress={() => router.push({ pathname: "/movie/[id]", params: { id: String(item.id) } })} 
            />
          )}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading} 
              onRefresh={refresh} 
              tintColor="#FF4400" 
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
    backgroundColor: '#000', // لون الخلفية الداكن (Dark Mode)
    paddingTop: 10,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 0, 0.3)', // إطار بلون نيون
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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