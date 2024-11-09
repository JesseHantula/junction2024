import React from "react"
import { Text, View } from "react-native"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/queries"
import styles from '../styles/profileStyles'

const UserScreen = ({ route }) => {
  const { username } = route.params
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username: username },
  })

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
    skills
  } = data.user

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.field}>Gender: {gender}</Text>
      <Text style={styles.field}>Race: {race}</Text>
      <Text style={styles.field}>Values: {JSON.parse(values).join(', ')}</Text>
      <Text style={styles.field}>Working Style: {workingStyle || 'N/A'}</Text>
      <Text style={styles.field}>Work-Life Balance: {workLifeBalance}/10</Text>
      <Text style={styles.field}>Flexibility: {flexibility}/10</Text>
      <Text style={styles.field}>Mental Health: {mentalHealth}/10</Text>
      <Text style={styles.field}>Skills: {JSON.parse(skills).join(', ')}</Text>
    </View>
  )
}

export default UserScreen