// App.js

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/apolloClient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import RegisterCompanyScreen from './src/screens/RegisterCompanyScreen';
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen'; // Import MatchesScreen
import JobListingScreen from './src/screens/JobListingScreen'; // Import JobListingScreen

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="User Registration" component={RegisterUserScreen} />
            <Stack.Screen name="Company Registration" component={RegisterCompanyScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="MatchesScreen" 
              component={MatchesScreen} 
              options={{ title: 'Matches' }} 
            />
            <Stack.Screen 
              name="JobListingScreen" 
              component={JobListingScreen} 
              options={{ title: 'Job Listing' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
