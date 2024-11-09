// src/screens/MatchesScreen.js

import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MATCHES } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/matchStyles';

const MatchesScreen = () => {
  const { accountType, userData } = useContext(AuthContext);

  //handlePress and navigate to information Screen
  const variables = accountType === 'User'
    ? { username: userData.username }
    : { companyName: userData.name };

  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables,
  });

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [loading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[
            styles.spinner, 
            { transform: [{ rotate: spin }] },
          ]}
        />
      </View>
    );
  }

  if (error) return <Text>Error: {error.message}</Text>;

  // Get only the top 100 matches
  const topMatches = data.match.slice(0, 100);

  return (
    <View style={styles.container}>
      <FlatList
        data={topMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.companyName}>Job Title: {item.jobListing.title}</Text>
            <Text style={styles.matchScore}>Match Score: {item.score}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures the container takes up full screen height, enabling scrolling
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  spinner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#0d6efd',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    overflow: 'hidden',
  },
});

export default MatchesScreen;
