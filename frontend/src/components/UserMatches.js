// src/components/UserMatches.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MATCHES } from '../graphql/queries';
import styles from '../styles/matchStyles';
import Spinner from '../utils/Animations';

const UserMatches = ({ username, navigation }) => {
  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables: { username },
  });

  if (loading) return <Spinner />;
  if (error) return <Text>Error: {error.message}</Text>;

  const topMatches = data.match.slice(0, 100);

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
            <Text style={styles.matchScore}>Match Score: {item.score}%</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserMatches;
