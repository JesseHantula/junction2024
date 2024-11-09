// src/components/CompanyMatches.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_MATCHES } from '../graphql/queries';
import styles from '../styles/matchStyles';
import Spinner from '../utils/Animations';

const CompanyMatches = ({ companyName, navigation }) => {
  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables: { companyName },
  });

  if (loading) return <Spinner />;
  if (error) return <Text>Error: {error.message}</Text>;

  const topMatches = data.match.slice(0, 100);

  const handlePress = (username) => {
    navigation.navigate('UserScreen', { username: username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Potential job candidates</Text>
      <FlatList
        data={topMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handlePress(item.user.username)}
          >
            <Text style={styles.companyName}>Anonymous user {item.user.id}</Text>
            <Text style={styles.matchScore}>Suitable job: {item.jobListing.title}</Text>
            <Text style={styles.matchScore}>Match score: {item.score}%</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CompanyMatches;
