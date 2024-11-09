// src/screens/LoginScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/authStyles';
import { LOGIN_COMPANY, LOGIN_USER } from '../graphql/mutations';

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
    <View style={styles.container}>
      <Text style={styles.title}>Login as:</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setAccountType('User')}
          style={[styles.option, accountType === 'User' && styles.selectedOption]}
        >
          <Text style={[styles.optionText, accountType === 'User' && styles.selectedOptionText]}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAccountType('Company')}
          style={[styles.option, accountType === 'Company' && styles.selectedOption]}
        >
          <Text style={[styles.optionText, accountType === 'Company' && styles.selectedOptionText]}>Company</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder={accountType === 'User' ? 'Username' : 'Company Name'}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('User Registration')}>
        <Text style={styles.linkText}>Register as User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Company Registration')}>
        <Text style={styles.linkText}>Register as Company</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;