// src/screens/CompanyRequests.js

import React, { useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REQUEST_BY_COMPANY } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';

const CompanyRequests = () => {
  const { userData } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_REQUEST_BY_COMPANY, {
    variables: { companyId: parseInt(userData.id) },
  });

  if (loading) return <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  const requests = data?.requestsByCompany || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Requests</Text>
      {requests.length === 0 ? (
        <Text style={styles.noRequests}>No requests found</Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <Text style={styles.requestText}>Anonymous User {item.user.id}</Text>
              <Text style={styles.requestText}>Job Listing: {item.jobListing.title}</Text>
              <Text style={styles.requestText}>Status: {item.status}</Text>
              <Text style={styles.requestText}>Requested On: {new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  noRequests: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestText: {
    fontSize: 16,
    color: '#555',
  },
});

export default CompanyRequests;
