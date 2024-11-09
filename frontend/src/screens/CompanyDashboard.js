import React, { useState, useContext } from 'react';
import { ScrollView, Text, TextInput, Button, Alert, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { CREATE_JOB_LISTING } from '../graphql/mutations';
import { SKILLS } from '../constants/constants';

const CompanyDashboard = () => {
  const { accountType, userData } = useContext(AuthContext);
  const [createJobListing] = useMutation(CREATE_JOB_LISTING);

  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requirements: [],
    location: '',
    workType: 'Onsite',
    salary: '',
    workingStyle: 'Independent'
  });

  if (accountType !== 'Company') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Only companies can access this dashboard.</Text>
      </View>
    );
  }

  const handleInputChange = (field, value) => {
    setJobDetails({ ...jobDetails, [field]: value });
  };

  const toggleSkill = (skill) => {
    setJobDetails((prevDetails) => {
      const { requirements } = prevDetails;
      if (requirements.includes(skill)) {
        return { ...prevDetails, requirements: requirements.filter(req => req !== skill) };
      } else if (requirements.length < 8) {
        return { ...prevDetails, requirements: [...requirements, skill] };
      }
      return prevDetails;
    });
  };

  const handleAddJobListing = () => {
    createJobListing({
      variables: {
        companyName: userData.name,
        title: jobDetails.title,
        description: jobDetails.description,
        requirements: jobDetails.requirements,
        location: jobDetails.location,
        workType: jobDetails.workType,
        salary: parseInt(jobDetails.salary),
        workingStyle: jobDetails.workingStyle
      },
    })
      .then(response => {
        if (response.data.createJobListing.success) {
          Alert.alert("Success", "Job listing created successfully!");
          setJobDetails({
            title: '',
            description: '',
            requirements: [],
            location: '',
            workType: 'Onsite',
            salary: '',
            workingStyle: 'Independent'
          });
        } else {
          Alert.alert("Error", "Failed to create job listing.");
        }
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={styles.container}>
      <Text style={styles.header}>Add Job Listing</Text>

      <TextInput
        placeholder="Job Title"
        value={jobDetails.title}
        onChangeText={value => handleInputChange('title', value)}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={jobDetails.description}
        onChangeText={value => handleInputChange('description', value)}
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Salary"
        value={jobDetails.salary}
        onChangeText={value => handleInputChange('salary', value)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Location"
        value={jobDetails.location}
        onChangeText={value => handleInputChange('location', value)}
        style={styles.input}
      />

      <Text style={styles.subHeader}>Requirements (Select up to 8)</Text>
      <View style={styles.skillContainer}>
        {SKILLS.map((skill) => (
          <TouchableOpacity
            key={skill}
            onPress={() => toggleSkill(skill)}
            style={[
              styles.skill,
              jobDetails.requirements.includes(skill) && styles.skillSelected
            ]}
          >
            <Text style={styles.skillText}>{skill}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subHeader}>Work Type</Text>
      <Picker
        selectedValue={jobDetails.workType}
        onValueChange={value => handleInputChange('workType', value)}
        style={styles.picker}
      >
        <Picker.Item label="Onsite" value="onsite" />
        <Picker.Item label="Remote" value="remote" />
        <Picker.Item label="Hybrid" value="hybrid" />
      </Picker>

      <Text style={styles.subHeader}>Working Style</Text>
      <Picker
        selectedValue={jobDetails.workingStyle}
        onValueChange={value => handleInputChange('workingStyle', value)}
        style={styles.picker}
      >
        <Picker.Item label="Independent" value="independent" />
        <Picker.Item label="Collaborative" value="collaborative" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAddJobListing}>
        <Text style={styles.buttonText}>Add Job Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  skill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  skillSelected: {
    backgroundColor: '#add8e6', // Keep blue color
  },
  skillText: {
    color: '#333',
  },
  picker: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#add8e6', // Keep blue color
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default CompanyDashboard;

