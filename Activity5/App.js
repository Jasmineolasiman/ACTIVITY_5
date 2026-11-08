import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';

// REST Countries API
const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags';

export default function App() {
  // Store the country data
  const [countries, setCountries] = useState([]);

  // Track loading and errors
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

        // Display the first 20 countries
        setCountries(data.slice(0, 20));
      } catch (err) {
        setError('Unable to load countries. Please try again.');
        console.log('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Show loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.message}>Exploring the world...</Text>
      </View>
    );
  }

  // Show error message
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F1FF" />

      {/* Application header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌍 World Explorer</Text>
        <Text style={styles.subtitle}>
          Discover countries around the world
        </Text>
      </View>

      {/* Country count */}
      <Text style={styles.count}>
        🌎 Showing {countries.length} countries
      </Text>

      {/* Display country information */}
      <FlatList
        data={countries}
        keyExtractor={(item, index) =>
          item.name?.common || index.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.message}>No countries found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.countryHeader}>
              <Text style={styles.flag}>
                {item.flags?.emoji || '🌍'}
              </Text>

              <Text style={styles.countryName}>
                {item.name?.common || 'Unknown Country'}
              </Text>
            </View>

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

      {/* Application footer */}
      <Text style={styles.footer}>
        Explore more. Learn more. 🌸
      </Text>
    </View>
  );
}

// Application design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F1FF',
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F1FF',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#5146A5',
  },
  subtitle: {
    fontSize: 13,
    color: '#77718F',
    textAlign: 'center',
    marginTop: 6,
  },
  count: {
    fontSize: 13,
    color: '#5146A5',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#5146A5',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  countryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flag: {
    fontSize: 28,
    marginRight: 10,
  },
  countryName: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5146A5',
  },
  detail: {
    fontSize: 13,
    color: '#625E70',
    marginTop: 6,
  },
  message: {
    marginTop: 12,
    color: '#5146A5',
    fontSize: 14,
  },
  error: {
    color: '#D64545',
    textAlign: 'center',
    fontSize: 14,
  },
  footer: {
    textAlign: 'center',
    color: '#8981B5',
    fontSize: 11,
    paddingVertical: 12,
  },
});