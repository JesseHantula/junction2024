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
}

export default ProfileScreen;
