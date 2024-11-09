// src/screens/MatchesScreen.js

import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MATCHES } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/matchStyles';
import Spinner from '../utils/Animations';

const MatchesScreen = ({ navigation }) => {  // Receive navigation prop
  const { accountType, userData } = useContext(AuthContext);

  const variables = accountType === 'User'
    ? { username: userData.username }
    : { companyName: userData.name };

  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables,
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) return <Text>Error: {error.message}</Text>;

  // Get only the top 100 matches
  const topMatches = data.match.slice(0, 100);

  // Navigate to JobListingScreen with listingId
  const handlePress = (listingId) => {
    navigation.navigate('JobListingScreen', { listingId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={topMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handlePress(item.jobListing.id)}
          >
            <Text style={styles.companyName}>Job Title: {item.jobListing.title}</Text>
            {accountType === 'Company' && <Text style={styles.matchScore}>User ID: {item.user.id}</Text>}
            <Text style={styles.matchScore}>Match Score: {item.score}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MatchesScreen;
