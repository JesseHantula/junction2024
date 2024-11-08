// src/screens/RegisterScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $values: [String]
    $preferences: [String]
    $workingHabits: [String]
  ) {
    registerUser(
      username: $username
      password: $password
      values: $values
      preferences: $preferences
      workingHabits: $workingHabits
    ) {
      success
      user {
        username
      }
    }
  }
`;

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

const RegisterScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [accountType, setAccountType] = useState('User'); // 'User' or 'Company'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [values, setValues] = useState('');
  const [preferences, setPreferences] = useState('');
  const [workingHabits, setWorkingHabits] = useState('');

  const [registerUser] = useMutation(REGISTER_USER);
  const [registerCompany] = useMutation(REGISTER_COMPANY);

  const handleRegister = () => {
    const variables = {
      username: username,
      password: password,
      values: values.split(',').map(s => s.trim()),
      preferences: preferences.split(',').map(s => s.trim()),
      workingHabits: workingHabits.split(',').map(s => s.trim()),
    };

    if (accountType === 'User') {
      registerUser({ variables })
        .then(response => {
          if (response.data.registerUser.success) {
            login('User', response.data.registerUser.user);
            navigation.replace('Home');
          } else {
            alert('Registration failed');
          }
        })
        .catch(err => alert('Error registering user'));
    } else {
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
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Register as:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Button
          title="User"
          onPress={() => setAccountType('User')}
          color={accountType === 'User' ? 'blue' : 'gray'}
        />
        <Button
          title="Company"
          onPress={() => setAccountType('Company')}
          color={accountType === 'Company' ? 'blue' : 'gray'}
        />
      </View>

      <TextInput
        placeholder={accountType === 'User' ? 'Username' : 'Company Name'}
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />

      <TextInput
        placeholder="Values (comma separated)"
        value={values}
        onChangeText={setValues}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Preferences (comma separated)"
        value={preferences}
        onChangeText={setPreferences}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Working Habits (comma separated)"
        value={workingHabits}
        onChangeText={setWorkingHabits}
        style={{ marginBottom: 10 }}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
