import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import { GET_JOB_LISTING } from '../graphql/queries'
import styles from '../styles/matchStyles'

const JobListingScreen = ({ route }) => {
  const { listingId } = route.params

  // Query to fetch the job listing details
  const { loading, error, data } = useQuery(GET_JOB_LISTING, {
    variables: { id: parseInt(listingId, 10) },
  })

  console.log(data)

  if (loading) return <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>

  const { title, description, requirements, company } = data.jobListing

  const parsedRequirements = typeof requirements === 'string' ? JSON.parse(requirements) : requirements;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.company}>Company: {company.name}</Text>
      <Text style={styles.sectionHeader}>Job Description</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.sectionHeader}>Requirements</Text>
      {parsedRequirements.map((req, index) => (
        <Text key={index} style={styles.requirement}>
          - {req}
        </Text>
      ))}
    </View>
  )
}

export default JobListingScreen
