import React from 'react';
import { GET_COMPANY } from '../graphql/queries';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import styles from '../styles/profileStyles'

const CompanyProfile = ({ name }) => {
  const variables = { name: name }
  const { loading, error, data } = useQuery(GET_COMPANY, { variables: variables })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading profile data.</Text>

  const {
    id,
    name: Name,
    values,
    workLifeBalance,
    flexibility,
    mentalHealth,
    jobListings
  } = data.company

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company Profile</Text>
      <Text style={styles.field}>Company name: {Name}</Text>
      <Text style={styles.field}>Values: {JSON.parse(values).join(', ')}</Text>
      <Text style={styles.field}>Work-Life Balance: {workLifeBalance}/10</Text>
      <Text style={styles.field}>Flexibility: {flexibility}/10</Text>
      <Text style={styles.field}>Mental Health: {mentalHealth}/10</Text>
    </View>
  )
}

export default CompanyProfile