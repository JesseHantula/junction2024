// src/screens/MatchesScreen.js

import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data.match}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Text style={styles.companyName}>Company: {item.company.name}</Text>
          <Text style={styles.matchScore}>Match Score: {item.score}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default MatchesScreen;
