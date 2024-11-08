import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';

const REGISTER_COMPANY = gql`
  mutation RegisterCompany(
    $name: String!
    $password: String!
    $values: [String]
    $preferences: [String]
    $workingHabits: [String]
  ) {
    registerCompany(
      name: $name
      password: $password
      values: $values
      preferences: $preferences
      workingHabits: $workingHabits
    ) {
      success
      company {
        name
      }
    }
  }
`;

const RegisterCompanyScreen = ({ navigation }) => {
  const companyVariables = {
    name: username,
    password: password,
    values: variables.values,
    preferences: variables.preferences,
    workingHabits: variables.workingHabits,
  };
  registerCompany({ variables: companyVariables })
    .then(response => {
      if (response.data.registerCompany.success) {
        login('Company', response.data.registerCompany.company);
        navigation.replace('Home');
      } else {
        alert('Registration failed');
      }
    })
    .catch(err => alert('Error registering company'));
  return (
    <Text>TEST</Text>
  )
}

export default RegisterCompanyScreen