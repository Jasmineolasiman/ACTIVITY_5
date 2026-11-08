import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,region,population';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch country data when the screen opens
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        setCountries(data.slice(0, 20));
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 World Explorer</Text>
      <Text style={styles.subtitle}>
        Discover countries around the world
      </Text>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.message}>Loading countries...</Text>
        </View>
      ) : (
        <Text style={styles.message}>
          {countries.length} countries loaded!
        </Text>
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
    marginTop: 15,
    color: '#5146A5',
  },
});