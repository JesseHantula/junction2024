import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    listContainer: {
      padding: 16,
    },
    loading: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: '#666',
    },
    error: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: 'red',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // for Android shadow
      borderWidth: 1,
      borderColor: '#eee',
    },
    companyName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 6,
    },
    matchScore: {
      fontSize: 16,
      color: '#555',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      },
      company: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
      },
      sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 5,
      },
      description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
      },
      requirement: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
      }
  })

export default styles;