import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,region,population';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch country data when the screen opens
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch country data.');
        }

        const data = await response.json();
        setCountries(data.slice(0, 20));
      } catch (err) {
        setError('Unable to load countries. Please try again.');
        console.log(err);
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
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={countries}
          keyExtractor={(item, index) =>
            item.name?.common || index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.countryName}>
                {item.name?.common}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F1FF',
    padding: 20,
    paddingTop: 55,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#5146A5',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#77718F',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  loading: {
    marginTop: 30,
    alignItems: 'center',
  },
  message: {
    marginTop: 15,
    color: '#5146A5',
  },
  error: {
    color: '#D64545',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 14,
    marginBottom: 12,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5146A5',
  },
});