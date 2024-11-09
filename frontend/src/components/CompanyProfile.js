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

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Company Information</Text>
        <Text style={styles.field}>Company name: <Text style={styles.fieldValue}>{companyName}</Text></Text>
        <Text style={styles.field}>Company values: <Text style={styles.fieldValue}>{JSON.parse(values).join(', ')}</Text></Text>
        <Text style={styles.field}>Average Rating: <Text style={styles.fieldValue}>{averageStars.toFixed(1)}/5</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Value of well-being in the company</Text>
        <Text style={styles.field}>Work-Life Balance: <Text style={styles.fieldValue}>{workLifeBalance}/10</Text></Text>
        <Text style={styles.field}>Flexibility: <Text style={styles.fieldValue}>{flexibility}/10</Text></Text>
        <Text style={styles.field}>Mental Health: <Text style={styles.fieldValue}>{mentalHealth}/10</Text></Text>
      </View>
    </View>
  );
};

export default CompanyProfile;
