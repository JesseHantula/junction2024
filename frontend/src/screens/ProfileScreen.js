// src/screens/ProfileScreen.js

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_COMPANY } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import CompanyProfile from '../components/CompanyProfile';

const ProfileScreen = () => {
  const { accountType, userData } = useContext(AuthContext)

  if (accountType === 'User') {
    return (
      <UserProfile username={userData.username} ></UserProfile>
    )
  }
  else {
    return (
      <CompanyProfile name={userData.name}></CompanyProfile>
    )
  }
  
  const QUERY = accountType === 'User' ? GET_USER : GET_COMPANY
  const variables = accountType === 'User' 
  ? { username: userData.username } 
  : { name: userData.name }
  
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
}

export default ProfileScreen;
