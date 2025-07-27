import React, { useState } from 'react';
import { View, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import UserCard from './UserCard';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.data);
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(5); // pagination size

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadMore = () => {
    if (visibleCount < users.length) {
      setVisibleCount(visibleCount + 5);
    } else {
      dispatch(fetchUsers()); // in case there's more from API in real usage
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchBar}
      />

      <FlatList
        data={filtered.slice(0, visibleCount)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
        ListFooterComponent={
          visibleCount < filtered.length && (
            <Button title="Load More" onPress={loadMore} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  searchBar: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
});
