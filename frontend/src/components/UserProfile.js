import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import styles from '../styles/profileStyles'

const UserProfile = ({ username }) => {
  const { loading, error, data } = useQuery(GET_USER, { variables: { username } });

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error loading profile data.</Text>;

  const {
    username: userName,
    birthday,
    gender,
    race,
    values,
    workingStyle,
    workLifeBalance,
    flexibility,
    mentalHealth,
    skills,
  } = data.user;

  return (
    <View style={styles.container}>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <Text style={styles.field}>Username: <Text style={styles.fieldValue}>{userName}</Text></Text>
        <Text style={styles.field}>Birthday: <Text style={styles.fieldValue}>{birthday}</Text></Text>
        <Text style={styles.field}>Gender: <Text style={styles.fieldValue}>{gender}</Text></Text>
        <Text style={styles.field}>Race: <Text style={styles.fieldValue}>{race}</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Professional Traits</Text>
        <Text style={styles.field}>Values: <Text style={styles.fieldValue}>{JSON.parse(values).join(', ')}</Text></Text>
        <Text style={styles.field}>Working Style: <Text style={styles.fieldValue}>{workingStyle || 'N/A'}</Text></Text>
        <Text style={styles.field}>Skills: <Text style={styles.fieldValue}>{JSON.parse(skills).join(', ')}</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Value of well-being in the workplace</Text>
        <Text style={styles.field}>Work-Life Balance: <Text style={styles.fieldValue}>{workLifeBalance}/10</Text></Text>
        <Text style={styles.field}>Flexibility: <Text style={styles.fieldValue}>{flexibility}/10</Text></Text>
        <Text style={styles.field}>Mental Health: <Text style={styles.fieldValue}>{mentalHealth}/10</Text></Text>
      </View>
    </View>
  );
};

export default UserProfile;