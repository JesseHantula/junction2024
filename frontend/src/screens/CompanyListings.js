import React, { useContext, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { GET_JOB_LISTINGS_BY_COMPANY } from '../graphql/queries';

const CompanyListings = () => {
  const { userData } = useContext(AuthContext);
  const companyName = userData.name;

  // Fetch job listings by company
  const { loading, error, data, refetch } = useQuery(GET_JOB_LISTINGS_BY_COMPANY, {
    variables: { companyName },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (loading) return <Text>Loading job listings...</Text>;
  if (error) return <Text>Error loading job listings: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Listings for {companyName}</Text>
      <FlatList
        data={data.jobListingsByCompany}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Parse requirements if it's a string
          const requirements = typeof item.requirements === 'string'
            ? JSON.parse(item.requirements)
            : item.requirements;

          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text>Location: {item.location}</Text>
              <Text>Work Type: {item.workType}</Text>
              <Text>Salary: ${item.salary}</Text>
              <Text>Posted Date: {new Date(item.postedDate).toLocaleDateString()}</Text>
              
              <Text style={styles.requirements}>Requirements:</Text>
              {Array.isArray(requirements) && requirements.length > 0 ? (
                requirements.map((req, index) => (
                  <Text key={index} style={styles.requirementItem}>- {req}</Text>
                ))
              ) : (
                <Text style={styles.noRequirements}>No specific requirements listed.</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  requirements: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  requirementItem: {
    fontSize: 12,
    color: '#555',
  },
  noRequirements: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default CompanyListings;
