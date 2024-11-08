// src/screens/SettingsScreen.js

import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default SettingsScreen;
