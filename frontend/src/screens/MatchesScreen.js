// src/screens/MatchesScreen.js

import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MATCHES } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';

const MatchesScreen = () => {
  const { accountType, userData } = useContext(AuthContext);

  // Set variables for the query based on logged-in user type
  const variables = accountType === 'User'
    ? { username: userData.username }
    : { companyName: userData.name };

  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Get only the top 100 matches
  const topMatches = data.match.slice(0, 100);

  return (
    <View style={styles.container}>
      <FlatList
        data={topMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>User: {item.user.username}</Text>
            <Text>Job Title: {item.jobListing.title}</Text>
            <Text>Match Score: {item.score}</Text>
          </View>
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
});

export default MatchesScreen;
