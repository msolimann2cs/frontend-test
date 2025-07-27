import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import { fetchUsers } from './redux/userSlice';
import UserCard from './components/UserCard';

// Main component that handles user data, search, and pagination
function MainApp() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(5); // Number of users shown initially

  // Fetch users 
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // Filter users based on search bar
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => <UserCard user={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Directory</Text>
      <TextInput
        placeholder="Search users by name"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#a0a0a0"
      />
      {status === 'loading' && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#6c5ce7" />
        </View>
      )}
      {status === 'failed' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <FlatList
        data={filtered.slice(0, visibleCount)}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      {/* Pagination, Load more button */}
      {visibleCount < filtered.length && (
        <View style={styles.buttonContainer}>
          <Button
            title="Load More Users"
            onPress={() => setVisibleCount(prev => prev + 5)}
            color="#6c5ce7"
          />
        </View>
      )}
    </View>
  );
}

// Root component that wraps MainApp with Redux Provider
export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#f5f6fa'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3436',
    textAlign: 'center',
  },
  search: {
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
});
