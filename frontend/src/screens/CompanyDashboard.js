import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker'; // Updated import
import { CREATE_JOB_LISTING } from '../graphql/mutations';

const CompanyDashboard = () => {
  const { accountType, userData } = useContext(AuthContext);
  const [createJobListing] = useMutation(CREATE_JOB_LISTING);

  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    workType: 'onsite', // Default value
    salary: '',
  });

  if (accountType !== 'Company') {
    return (
      <View style={{ padding: 20 }}>
        <Text>Only companies can access this dashboard.</Text>
      </View>
    );
  }

  const handleInputChange = (field, value) => {
    setJobDetails({ ...jobDetails, [field]: value });
  };

  const handleAddJobListing = () => {
    const requirementsArray = jobDetails.requirements.split(',').map(req => req.trim());

    createJobListing({
      variables: {
        companyName: userData.name,
        title: jobDetails.title,
        description: jobDetails.description,
        requirements: requirementsArray,
        location: jobDetails.location,
        workType: jobDetails.workType,
        salary: parseFloat(jobDetails.salary),
      },
    })
      .then(response => {
        if (response.data.createJobListing.success) {
          Alert.alert("Success", "Job listing created successfully!");
          setJobDetails({
            title: '',
            description: '',
            requirements: '',
            location: '',
            workType: 'onsite', // Reset to default
            salary: '',
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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Job Listing</Text>

      <TextInput
        placeholder="Job Title"
        value={jobDetails.title}
        onChangeText={value => handleInputChange('title', value)}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Description"
        value={jobDetails.description}
        onChangeText={value => handleInputChange('description', value)}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Requirements (comma separated)"
        value={jobDetails.requirements}
        onChangeText={value => handleInputChange('requirements', value)}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Location"
        value={jobDetails.location}
        onChangeText={value => handleInputChange('location', value)}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      <Text style={{ marginBottom: 5 }}>Work Type</Text>
      <Picker
        selectedValue={jobDetails.workType}
        onValueChange={value => handleInputChange('workType', value)}
        style={{ marginBottom: 20 }}
      >
        <Picker.Item label="Onsite" value="onsite" />
        <Picker.Item label="Remote" value="remote" />
        <Picker.Item label="Hybrid" value="hybrid" />
      </Picker>

      <TextInput
        placeholder="Salary"
        value={jobDetails.salary}
        onChangeText={value => handleInputChange('salary', value)}
        keyboardType="numeric"
        style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderRadius: 5 }}
      />

      <Button title="Add Job Listing" onPress={handleAddJobListing} />
    </View>
  );
};

export default CompanyDashboard;
