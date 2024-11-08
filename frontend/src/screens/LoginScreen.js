// src/screens/LoginScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      success
      user {
        username
      }
    }
  }
`;

const LOGIN_COMPANY = gql`
  mutation LoginCompany($name: String!, $password: String!) {
    loginCompany(name: $name, password: $password) {
      success
      company {
        name
      }
    }
  }
`;

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [accountType, setAccountType] = useState('User');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useMutation(LOGIN_USER);
  const [loginCompany] = useMutation(LOGIN_COMPANY);

  const handleLogin = () => {
    if (accountType === 'User') {
      loginUser({ variables: { username, password } })
        .then(response => {
          if (response.data.loginUser.success) {
            login('User', response.data.loginUser.user);
            navigation.replace('Home');
          } else {
            alert('Login failed');
          }
        })
        .catch(err => alert('Error logging in'));
    } else {
      loginCompany({ variables: { name: username, password } })
        .then(response => {
          if (response.data.loginCompany.success) {
            login('Company', response.data.loginCompany.company);
            navigation.replace('Home');
          } else {
            alert('Login failed');
          }
        })
        .catch(err => alert('Error logging in'));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login as:</Text>
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

      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register as User"
        onPress={() => navigation.navigate('RegisterUser')}
        style={{ marginTop: 10 }}
      />
      <Button
        title="Register as Company"
        onPress={() => navigation.navigate('RegisterCompany')}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default LoginScreen;
