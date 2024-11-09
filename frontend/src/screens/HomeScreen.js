// src/screens/HomeScreen.js

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MatchesScreen from './MatchesScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import SearchCompanyScreen from './SearchCompanyScreen';
import CompanyDashboard from './CompanyDashboard'; // Import the component here

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Matches" component={MatchesScreen} />
    <Tab.Screen name="Search" component={SearchCompanyScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const HomeScreen = () => {
  const { accountType } = useContext(AuthContext);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Mindlink" component={TabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      {accountType === 'Company' && (
        <Drawer.Screen name="CompanyDashboard" component={CompanyDashboard} />
      )}
    </Drawer.Navigator>
  );
};

export default HomeScreen;
