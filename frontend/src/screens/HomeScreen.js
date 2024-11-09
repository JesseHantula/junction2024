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
import CompanyListings from './CompanyListings'; // Import the component here

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = ({route: {params: {accountType}}}) => (
  <Tab.Navigator>
    <Tab.Screen name="Matches" component={MatchesScreen} />
    {accountType === 'User' && (
      <Tab.Screen name="Search" component={SearchCompanyScreen} />
    )}
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const HomeScreen = () => {
  const { accountType } = useContext(AuthContext);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Mindlink" component={TabNavigator} initialParams={{ accountType }}/>
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      {accountType === 'Company' && (
        <Drawer.Screen name="Add Job Listings" component={CompanyDashboard} />
      )}
      {accountType === 'Company' && (
        <Drawer.Screen name="View Job Listings" component={CompanyListings} />
      )}
    </Drawer.Navigator>
  );
};

export default HomeScreen;
