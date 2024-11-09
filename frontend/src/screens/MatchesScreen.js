// src/screens/MatchesScreen.js
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import UserMatches from '../components/UserMatches';
import CompanyMatches from '../components/CompanyMatches';
import styles from '../styles/matchStyles';

const MatchesScreen = ({ navigation }) => {
  const { accountType, userData } = useContext(AuthContext);

  if (accountType === 'User') {
    return <UserMatches username={userData.username} navigation={navigation} />;
  } else if (accountType === 'Company') {
    return <CompanyMatches companyName={userData.name} navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <Text>Error: Invalid account type</Text>
    </View>
  );
};

export default MatchesScreen;
