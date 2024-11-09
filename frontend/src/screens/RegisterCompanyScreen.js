import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import Slider from '@react-native-community/slider';
import styles from '../styles/registrationStyles'
import { REGISTER_COMPANY } from '../graphql/mutations';

const RegisterCompanyScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [registerCompany] = useMutation(REGISTER_COMPANY);

  const handleRegister = () => {
    const variables = {
      name: formData.companyName,
      password: formData.password,
      values: formData.coreValues,
      preferences: null,
      workingHabits: null,
      workLifeBalance: formData.workLifeBalance,
      flexibility: formData.flexibility,
      mentalHealth: formData.mentalHealth
    };

    registerCompany({ variables })
      .then(response => {
        console.log(response)
        if (response.data.registerCompany.success) {
          login('Company', response.data.registerCompany.company);
          navigation.replace('Home');
        } else {
          alert('Registration failed');
        }
      })
      .catch(err => alert('Error registering company'));
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    password: '',
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
            <Text style={styles.header}>Please enter your company name</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={value => handleInputChange('companyName', value)}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Please enter a password for your account</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry={true}
            />
          </View>
        )  
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Select up to 3 values that best represent your company:</Text>
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
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Please answer the following questions from the scale of 1 to 10 on how important each one is for your company</Text>
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
            <Text>Company name: {formData.companyName}</Text>
            <Text>Core values: {formData.coreValues.join(', ')}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
      <View style={styles.buttonContainer}>
        {step > 1 && <Button title="Back" onPress={prevStep} />}
        <Button title={step < 5 ? "Next" : "Finish"} onPress={step < 5 ? nextStep : handleRegister} />
      </View>
    </View>
  );
}

export default RegisterCompanyScreen