
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

// Free country API - no API key required
const API_URL =
  'https://countries.dev/countries?fields=name,capital,region,population,flag&limit=20';

// Country card with fade and slide animation
function CountryCard({ item, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  // Animate each card when it appears
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 70,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 70,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Country flag and name */}
      <View style={styles.countryHeader}>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>{item.flag || '🌍'}</Text>
        </View>

        <View style={styles.countryInfo}>
          <Text style={styles.countryName}>
            {item.name || 'Unknown Country'}
          </Text>
          <Text style={styles.region}>
            {item.region || 'Region unavailable'}
          </Text>
        </View>

        <Text style={styles.arrow}>✦</Text>
      </View>

      <View style={styles.divider} />

      {/* Country details */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>🏙️ Capital</Text>
        <Text style={styles.detailValue}>
          {item.capital || 'Not available'}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>👥 Population</Text>
        <Text style={styles.detailValue}>
          {typeof item.population === 'number'
            ? item.population.toLocaleString()
            : 'Not available'}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function App() {
  // Store API data and loading information
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Control the header animation
  const headerAnim = useRef(new Animated.Value(0)).current;

  // Fetch country data when the app opens
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URL);

        // Check if the API request was successful
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        // Convert the response into JSON
        const data = await response.json();

        // Make sure the API returns a list
        if (!Array.isArray(data)) {
          throw new Error('Invalid API response.');
        }

        setCountries(data);
      } catch (err) {
        // Display an error if fetching fails
        console.log('API Error:', err);
        setError('Unable to load countries. Please check your connection.');
      } finally {
        // Hide the loading screen
        setLoading(false);
      }
    };

    fetchCountries();

    // Animate the header when the app opens
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // Display loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F3FF" />

        <View style={styles.loadingIcon}>
          <Text style={styles.loadingEmoji}>🌍</Text>
        </View>

        <ActivityIndicator
          size="large"
          color="#9061F9"
          style={styles.loader}
        />

        <Text style={styles.loadingTitle}>Exploring the world</Text>
        <Text style={styles.loadingSubtitle}>
          Preparing your travel discovery...
        </Text>
      </View>
    );
  }

  // Display error screen
  if (error) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F3FF" />
        <Text style={styles.errorIcon}>🌧️</Text>
        <Text style={styles.errorTitle}>
          Oops! Something went wrong
        </Text>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F3FF" />

      {/* Decorative background circles */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      {/* Animated application header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-25, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.topLabel}>
          <Text style={styles.topLabelText}>
            ✦ YOUR TRAVEL COMPANION ✦
          </Text>
        </View>

        <Text style={styles.title}>World Explorer</Text>
        <Text style={styles.subtitle}>
          Discover the beauty of our world 🌷
        </Text>

        {/* Welcome banner */}
        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerSmall}>
              YOUR WORLD AT A GLANCE
            </Text>
            <Text style={styles.bannerTitle}>Explore Beyond</Text>
            <Text style={styles.bannerDescription}>
              Every country has a story.
            </Text>
          </View>

          <Text style={styles.bannerEmoji}>🌎</Text>
        </View>
      </Animated.View>

      {/* Country list heading and count */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Discover Countries
          </Text>
          <Text style={styles.sectionSubtitle}>
            A little journey around the globe
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countNumber}>
            {countries.length}
          </Text>
          <Text style={styles.countLabel}>COUNTRIES</Text>
        </View>
      </View>

      {/* Display country information using FlatList */}
      <FlatList
        data={countries}
        keyExtractor={(item, index) =>
          item.name || index.toString()
        }
        renderItem={({ item, index }) => (
          <CountryCard item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No countries found.
          </Text>
        }
      />

      {/* Application footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with 💜 for curious explorers
        </Text>
      </View>
    </View>
  );
}

// Purple and lavender application design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3FF',
    paddingHorizontal: 20,
    paddingTop: 45,
    overflow: 'hidden',
  },

  // Loading and error screen
  center: {
    flex: 1,
    backgroundColor: '#F7F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  // Decorative background circles
  circleOne: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#E9DFFF',
    top: -100,
    right: -65,
    opacity: 0.7,
  },

  circleTwo: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#EEE5FF',
    bottom: 70,
    left: -95,
    opacity: 0.8,
  },

  // Header design
  header: {
    marginBottom: 25,
  },

  topLabel: {
    backgroundColor: '#EDE4FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 12,
  },

  topLabelText: {
    fontSize: 9,
    color: '#8556D8',
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#54318C',
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 13,
    color: '#9685B0',
    marginTop: 5,
  },

  // Welcome banner
  banner: {
    backgroundColor: '#8054CE',
    borderRadius: 23,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#8054CE',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  bannerSmall: {
    color: '#E9DFFF',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 7,
  },

  bannerDescription: {
    color: '#E9DCFF',
    fontSize: 11,
    marginTop: 5,
  },

  bannerEmoji: {
    fontSize: 48,
  },

  // Country section heading
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#54318C',
  },

  sectionSubtitle: {
    fontSize: 10,
    color: '#A092B9',
    marginTop: 4,
  },

  countBadge: {
    backgroundColor: '#E9DFFF',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 13,
    alignItems: 'center',
  },

  countNumber: {
    color: '#7045B5',
    fontSize: 16,
    fontWeight: 'bold',
  },

  countLabel: {
    color: '#987AC5',
    fontSize: 8,
    fontWeight: 'bold',
  },

  // Country list and cards
  list: {
    paddingBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 20,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#F0E9FC',
    elevation: 3,
    shadowColor: '#7250A5',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  countryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#F3ECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  flag: {
    fontSize: 27,
  },

  countryInfo: {
    flex: 1,
  },

  countryName: {
    color: '#55368A',
    fontSize: 15,
    fontWeight: 'bold',
  },

  region: {
    color: '#A18EBB',
    fontSize: 11,
    marginTop: 4,
  },

  arrow: {
    color: '#A47BE4',
    fontSize: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#F0EAF8',
    marginVertical: 13,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
  },

  detailLabel: {
    color: '#A092B3',
    fontSize: 11,
  },

  detailValue: {
    color: '#65499A',
    fontSize: 11,
    fontWeight: '600',
    maxWidth: '55%',
    textAlign: 'right',
  },

  // Loading screen design
  loadingIcon: {
    width: 85,
    height: 85,
    borderRadius: 28,
    backgroundColor: '#E9DFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingEmoji: {
    fontSize: 42,
  },

  loader: {
    marginTop: 25,
  },

  loadingTitle: {
    color: '#54318C',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
  },

  loadingSubtitle: {
    color: '#9685B0',
    fontSize: 12,
    marginTop: 7,
  },

  // Error screen design
  errorIcon: {
    fontSize: 45,
    marginBottom: 15,
  },

  errorTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#54318C',
    textAlign: 'center',
  },

  error: {
    color: '#A092B3',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#9685B0',
    marginTop: 25,
  },

  // Footer design
  footer: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F7F3FF',
  },

  footerText: {
    fontSize: 10,
    color: '#A18EBB',
    fontWeight: '500',
  },
});
