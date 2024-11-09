import React from 'react';
import { GET_USER } from '../graphql/queries';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import styles from '../styles/profileStyles'

const UserProfile = ({ username }) => {
  const variables = { username: username }
  const { loading, error, data } = useQuery(GET_USER, { variables: variables })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading profile data.</Text>

  const {
    username: userName,
    birthday,
    gender,
    race,
    values,
    workingStyle,
    workLifeBalance,
    flexibility,
    mentalHealth,
    skills
  } = data.user

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.field}>Username: {userName}</Text>
      <Text style={styles.field}>Birthday: {birthday}</Text>
      <Text style={styles.field}>Gender: {gender}</Text>
      <Text style={styles.field}>Race: {race}</Text>
      <Text style={styles.field}>Values: {JSON.parse(values).join(', ')}</Text>
      <Text style={styles.field}>Working Style: {workingStyle || 'N/A'}</Text>
      <Text style={styles.field}>Work-Life Balance: {workLifeBalance}/10</Text>
      <Text style={styles.field}>Flexibility: {flexibility}/10</Text>
      <Text style={styles.field}>Mental Health: {mentalHealth}/10</Text>
      <Text style={styles.field}>Skills: {JSON.parse(skills).join(', ')}</Text>
    </View>
  )
}

export default UserProfile