import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function App() {
  // Track the loading status
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 World Explorer</Text>
      <Text style={styles.subtitle}>
        Discover countries around the world
      </Text>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.message}>Loading countries...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#5146A5',
  },
  subtitle: {
    fontSize: 14,
    color: '#77718F',
    marginTop: 8,
  },
  loading: {
    marginTop: 30,
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    color: '#5146A5',
  },
});