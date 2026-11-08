import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 World Explorer</Text>
      <Text style={styles.subtitle}>
        Discover countries around the world
      </Text>
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
});