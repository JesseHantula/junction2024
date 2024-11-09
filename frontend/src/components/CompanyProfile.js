import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COMPANY, GET_COMPANY_REVIEWS_AVG_SCORE } from '../graphql/queries';
import styles from '../styles/profileStyles';

const CompanyProfile = ({ name }) => {
  const { loading: loadingCompany, error: errorCompany, data: companyData } = useQuery(GET_COMPANY, {
    variables: { name },
  });

  const { loading: loadingAvgScore, error: errorAvgScore, data: avgScoreData } = useQuery(GET_COMPANY_REVIEWS_AVG_SCORE, {
    variables: { companyName: name },
  });

  if (loadingCompany || loadingAvgScore) return <Text>Loading...</Text>;
  if (errorCompany) return <Text>Error loading profile data.</Text>;
  if (errorAvgScore) return <Text>Error loading average rating.</Text>;

  const {
    id,
    name: companyName,
    values,
    workLifeBalance,
    flexibility,
    mentalHealth,
    jobListings,
  } = companyData.company;

  const averageStars = avgScoreData?.companyReviewsAvgScore || 5;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company Profile</Text>
      <Text style={styles.field}>Company name: {companyName}</Text>
      <Text style={styles.field}>Values: {JSON.parse(values).join(', ')}</Text>
      <Text style={styles.field}>Work-Life Balance: {workLifeBalance}/10</Text>
      <Text style={styles.field}>Flexibility: {flexibility}/10</Text>
      <Text style={styles.field}>Mental Health: {mentalHealth}/10</Text>
      <Text style={styles.field}>Average Rating: {averageStars.toFixed(1)} ★</Text>
    </View>
  );
};

export default CompanyProfile;
