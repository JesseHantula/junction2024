import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COMPANY, GET_COMPANY_REVIEWS_AVG_SCORE } from '../graphql/queries';

const CompanyProfileScreen = ({ route, navigation }) => {
  const { companyName } = route.params;

  const { loading: loadingCompany, error: errorCompany, data: companyData } = useQuery(GET_COMPANY, {
    variables: { name: companyName },
  });

  const { loading: loadingAvgScore, error: errorAvgScore, data: avgScoreData } = useQuery(GET_COMPANY_REVIEWS_AVG_SCORE, {
    variables: { companyName },
  });

  if (loadingCompany || loadingAvgScore) {
    return <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />;
  }
  if (errorCompany) {
    return <Text style={styles.error}>Error: {errorCompany.message}</Text>;
  }
  if (errorAvgScore) {
    return <Text style={styles.error}>Error loading average rating: {errorAvgScore.message}</Text>;
  }

  const { name, values, workLifeBalance, flexibility, mentalHealth, jobListings } = companyData.company;

  const averageStars = avgScoreData.companyReviewsAvgScore || 5;

  parsedValues = typeof values === 'string' ? JSON.parse(values) : values;

  const handleReview = () => {
    Alert.alert("Warning", "Please only leave a review if you are currently employed at the company.");
    navigation.navigate('CompanyReviewScreen', { name: companyName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Values: {parsedValues.join(', ')}</Text>
      <Text>Work-Life Balance: {workLifeBalance}</Text>
      <Text>Flexibility: {flexibility}</Text>
      <Text>Mental Health: {mentalHealth}</Text>
      <Text>Average Rating: {averageStars.toFixed(1)} ★</Text>
      <Text>Job Listings:</Text>
      {jobListings.map((job, index) => (
        <Text key={index} style={styles.jobListing}>
          - {job.title} ({job.location})
        </Text>
      ))}
      <TouchableOpacity onPress={handleReview} style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>Leave review for company</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  jobListing: {
    fontSize: 16,
    color: '#555',
  },
  reviewButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  reviewButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CompanyProfileScreen;
