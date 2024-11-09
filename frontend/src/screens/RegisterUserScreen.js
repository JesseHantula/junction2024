import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/registrationStyles'

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $birthday: Date!
    $gender: String!
    $race: String!
    $values: [String]
    $workingStyle: String
    $workLifeBalance: Int
    $flexibility: Int
    $mentalHealth: Int
  ) {
    registerUser(
      username: $username
      password: $password
      birthday: $birthday
      gender: $gender
      race: $race
      values: $values
      workingStyle: $workingStyle
      workLifeBalance: $workLifeBalance
      flexibility: $flexibility
      mentalHealth: $mentalHealth
    ) {
      success
      user {
        username
      }
    }
  }
`;

const RegisterUserScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = () => {
    const variables = {
      username: formData.username,
      password: formData.password,
      birthday: formData.birthDate,
      gender: formData.gender,
      race: formData.race,
      values: formData.coreValues,
      workingStyle: formData.workingStyle,
      workLifeBalance: formData.workLifeBalance,
      flexibility: formData.flexibility,
      mentalHealth: formData.mentalHealth,
    };

    registerUser({ variables })
      .then(response => {
        console.log(response)
        if (response.data.registerUser.success) {
          login('User', response.data.registerUser.user);
          navigation.replace('Home');
        } else {
          alert('Registration failed');
        }
      })
      .catch(err => alert(err));
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    birthDate: '',
    gender: '',
    race: '',
    coreValues: [],
    workingStyle: '',
    workLifeBalance: 5,
    flexibility: 5,
    mentalHealth: 5
  });

  const coreValuesList = [
    'Honesty',
    'Integrity',
    'Teamwork',
    'Innovation',
    'Excellence',
    'Respect',
    'Accountability',
    'Passion',
    'Courage',
    'Empathy',
  ];

  const [showDateModal, setShowDateModal] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCoreValueToggle = (value) => {
    const selected = formData.coreValues;
    if (selected.includes(value)) {
      setFormData({ ...formData, coreValues: selected.filter(val => val !== value) });
    } else if (selected.length < 3) {
      setFormData({ ...formData, coreValues: [...selected, value] });
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => (prev > 1 ? prev - 1 : prev));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Create a Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              value={formData.username}
              onChangeText={value => handleInputChange('username', value)}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Set Your Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Birth Date</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDateModal(true)}>
              <Text style={styles.inputText}>{formData.birthDate || 'Select Date'}</Text>
            </TouchableOpacity>
            <Modal transparent visible={showDateModal} animationType="slide" onRequestClose={() => setShowDateModal(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    maximumDate={new Date(2010, 11, 31)}
                    onChange={(event, selectedDate) => setTempDate(selectedDate || tempDate)}
                  />
                  <View style={styles.modalButtons}>
                    <Button title="Cancel" onPress={() => setShowDateModal(false)} />
                    <Button title="Confirm" onPress={() => { handleInputChange('birthDate', tempDate.toISOString().split('T')[0]); setShowDateModal(false); }} />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Select Gender</Text>
            {['Male', 'Female', 'Other'].map(option => (
              <TouchableOpacity key={option} style={[styles.option, formData.gender === option && styles.selectedOption]} onPress={() => handleInputChange('gender', option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Choose Race</Text>
            {['Asian', 'Black or African American', 'Hispanic or Latino', 'White', 'Native American'].map(option => (
              <TouchableOpacity key={option} style={[styles.option, formData.race === option && styles.selectedOption]} onPress={() => handleInputChange('race', option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Core Values (Choose up to 3)</Text>
            {coreValuesList.map(value => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.option,
                  formData.coreValues.includes(value) && styles.selectedOption,
                  formData.coreValues.length >= 3 && !formData.coreValues.includes(value) && styles.disabledOption,
                ]}
                onPress={() => handleCoreValueToggle(value)}
                disabled={formData.coreValues.length >= 3 && !formData.coreValues.includes(value)}
              >
                <Text style={styles.optionText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 7:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Which working style best aligns with you?</Text>
            {['Collaborative', 'Independent'].map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  formData.workingStyle.includes(option) && styles.selectedOption,
                ]}
                onPress={() => handleInputChange('workingStyle', option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )  
        case 8:
          return (
            <View style={styles.stepContainer}>
              <Text style={styles.header}>Please answer the following questions from the scale of 1 to 10 on how important each one is to you</Text>
              <Text style={styles.subheader}>Work-life balance: {formData.workLifeBalance}</Text>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={formData.workLifeBalance}
                onValueChange={value => handleInputChange('workLifeBalance', value)}
              />

              <Text style={styles.subheader}>Flexible hours and working location: {formData.flexibility}</Text>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={formData.flexibility}
                onValueChange={value => handleInputChange('flexibility', value)}
              />

              <Text style={styles.subheader}>The priority of mental health in the workplace: {formData.mentalHealth}</Text>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={formData.mentalHealth}
                onValueChange={value => handleInputChange('mentalHealth', value)}
              />
            </View>
          );  
      default:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Review your information:</Text>
            <Text>Username: {formData.username}</Text>
            <Text>Date of Birth: {formData.birthDate}</Text>
            <Text>Gender: {formData.gender}</Text>
            <Text>Race: {formData.race}</Text>
            <Text>Core values: {formData.coreValues.join(', ')}</Text>
            <Text>Working Style: {formData.workingStyle}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
      <View style={styles.buttonContainer}>
        {step > 1 && <Button title="Back" onPress={prevStep} />}
        <Button title={step < 9 ? "Next" : "Finish"} onPress={step < 9 ? nextStep : handleRegister} />
      </View>
    </View>
  );
};

export default RegisterUserScreen;
