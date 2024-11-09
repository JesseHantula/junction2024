import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_COMPANY_NAMES } from '../graphql/queries';

const SearchCompanyScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const [getAllCompanies, { loading, error, data }] = useLazyQuery(GET_ALL_COMPANY_NAMES);

  const handleSearch = () => {
    getAllCompanies();
  };

  const handleCompanyPress = (companyName) => {
    navigation.navigate('CompanyProfileScreen', { companyName });
  };

  React.useEffect(() => {
    if (data?.companies) {
      const filtered = data.companies.filter((company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [data, searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a company..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}

      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.companyCard} onPress={() => handleCompanyPress(item.name)}>
            <Text style={styles.companyName}>{item.name}</Text>
            <Text>Values: {Array.isArray(item.values) ? item.values.join(', ') : 'No values provided'}</Text>
            {item.jobListings?.length > 0 && (
              <Text>Job Listings:</Text>
            )}
            {item.jobListings?.map((job, index) => (
              <Text key={index} style={styles.jobListing}>
                - {job.title} ({job.location})
              </Text>
            ))}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  companyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  jobListing: {
    fontSize: 14,
    color: '#555',
  },
});

export default SearchCompanyScreen;

