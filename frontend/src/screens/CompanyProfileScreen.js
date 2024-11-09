import React from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COMPANY, GET_COMPANY_REVIEWS_AVG_SCORE } from '../graphql/queries';
import styles from '../styles/profileStyles';

const CompanyProfileScreen = ({ route, navigation }) => {
  const { companyName } = route.params;

  const { loading: loadingCompany, error: errorCompany, data: companyData } = useQuery(GET_COMPANY, {
    variables: { name: companyName },
  });

  const { loading: loadingAvgScore, error: errorAvgScore, data: avgScoreData } = useQuery(GET_COMPANY_REVIEWS_AVG_SCORE, {
    variables: { companyName },
  });

  if (loadingCompany || loadingAvgScore) {
    return <ActivityIndicator style={styles.loadingText} size="large" color="#0000ff" />;
  }
  if (errorCompany) {
    return <Text style={styles.errorText}>Error: {errorCompany.message}</Text>;
  }
  if (errorAvgScore) {
    return <Text style={styles.errorText}>Error loading average rating: {errorAvgScore.message}</Text>;
  }

  const { name, values, workLifeBalance, flexibility, mentalHealth, jobListings } = companyData.company;

  const averageStars = avgScoreData.companyReviewsAvgScore || 5;

  const parsedValues = typeof values === 'string' ? JSON.parse(values) : values;

  const handleReview = () => {
    Alert.alert("Warning", "Please only leave a review if you are currently employed at the company.");
    navigation.navigate('CompanyReviewScreen', { name: companyName });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Average Rating</Text>
        <Text style={styles.field}>{averageStars.toFixed(1)} ★</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Values</Text>
        <Text style={styles.field}>{parsedValues.join(', ')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Value of well-being in the company</Text>
        <Text style={styles.field}>Work-life Balance: {workLifeBalance}/10</Text>
        <Text style={styles.field}>Flexibility: {flexibility}/10</Text>
        <Text style={styles.field}>Mental Health: {mentalHealth}/10</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Job Listings</Text>
        {jobListings.map((job, index) => (
          <Text key={index} style={styles.field}>
            - {job.title} ({job.location})
          </Text>
        ))}
      </View>

      <TouchableOpacity onPress={handleReview} style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>Leave review for company</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CompanyProfileScreen;