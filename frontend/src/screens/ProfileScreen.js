// src/screens/ProfileScreen.js

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import styles from '../styles/profileStyles'
import { GET_USER, GET_COMPANY } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { accountType, userData } = useContext(AuthContext)
  const QUERY = accountType === 'User' ? GET_USER : GET_COMPANY
  console.log(accountType)
  console.log(userData)
  const variables = accountType === 'User' 
  ? { username: userData.username } 
  : { name: userData.name }
  console.log(variables)
  
  const { loading, error, data } = useQuery(QUERY, { variables: variables })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading profile data.</Text>

  const {
    username,
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
      <Text style={styles.field}>Username: {username}</Text>
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

export default ProfileScreen;
