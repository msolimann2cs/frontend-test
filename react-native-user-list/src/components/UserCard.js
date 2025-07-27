import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Card component to display individual user info
export default function UserCard({ user }) {
  return (
    <View style={styles.card}>
      {/* Avatar circle with user's first initial */}
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{user.name[0]}</Text>
      </View>
      {/* User details section */}
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.address}>{user.fullAddress}</Text>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#2d3436',
  },
  email: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#b2bec3',
  },
});
