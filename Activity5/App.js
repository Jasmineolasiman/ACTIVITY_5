import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,region,population';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch country information
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
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>🌍 World Explorer</Text>
      <Text style={styles.subtitle}>
        Discover countries around the world
      </Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.message}>Exploring the world...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <>
          <Text style={styles.count}>
            Showing {countries.length} countries
          </Text>

          <FlatList
            data={countries}
            keyExtractor={(item, index) =>
              item.name?.common || index.toString()
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.countryName}>
                  {item.name?.common || 'Unknown Country'}
                </Text>

                <Text style={styles.detail}>
                  🏙️ Capital: {item.capital?.[0] || 'Not available'}
                </Text>

                <Text style={styles.detail}>
                  📍 Region: {item.region || 'Not available'}
                </Text>

                <Text style={styles.detail}>
                  👥 Population:{' '}
                  {item.population?.toLocaleString() || 'Not available'}
                </Text>
              </View>
            )}
          />
        </>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 6,
    marginBottom: 20,
  },
  count: {
    fontSize: 13,
    color: '#5146A5',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5146A5',
    marginBottom: 10,
  },
  detail: {
    fontSize: 13,
    color: '#625E70',
    marginTop: 5,
  },
  message: {
    marginTop: 12,
    color: '#5146A5',
  },
  error: {
    color: '#D64545',
    textAlign: 'center',
  },
});