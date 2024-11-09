import React, { useContext } from 'react'
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native'
import { useQuery, useMutation } from '@apollo/client'
import { GET_JOB_LISTING } from '../graphql/queries'
import { CREATE_REQUEST } from '../graphql/mutations'
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/matchStyles'

const JobListingScreen = ({ route }) => {
  const { listingId } = route.params
  const { userData } = useContext(AuthContext);

  // Query to fetch the job listing details
  const { loading, error, data } = useQuery(GET_JOB_LISTING, {
    variables: { id: parseInt(listingId, 10) },
  })

  console.log(userData, listingId)

  const [createRequest, { loading: requestLoading }] = useMutation(CREATE_REQUEST, {
    onCompleted: (response) => {
      if (response.createRequest.success == "True") {
        Alert.alert("Request Sent", "You've expressed interest in this job listing.");
      } else {
        Alert.alert("Error", response.createRequest.message);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to send request. Please try again later.");
    }
  });

  const handleInterest = () => {
    createRequest({
      variables: { userId: userData.id, jobListingId: listingId }
    });
  };

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
      <Button
        title="I'm Interested"
        onPress={handleInterest}
        disabled={requestLoading}
      />
    </View>
  )
}

export default JobListingScreen
