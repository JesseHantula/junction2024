import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import Slider from '@react-native-community/slider';
import styles from '../styles/registrationStyles'
import { REGISTER_COMPANY } from '../graphql/mutations';
import { CORE_VALUES } from '../constants/constants';

const RegisterCompanyScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [registerCompany] = useMutation(REGISTER_COMPANY);

  const handleRegister = () => {
    const variables = {
      name: formData.companyName,
      password: formData.password,
      values: formData.coreValues,
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
              value={formData.companyName}
              placeholder="Enter company name"
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
              placeholder="Enter password"
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry={true}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Select up to 3 values that best represent your company:</Text>
            {CORE_VALUES.map(value => (
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
              <Text style={styles.infoText}>Company name: {formData.companyName}</Text>
              <Text style={styles.infoText}>Core values: {formData.coreValues.join(', ')}</Text>
              <Text style={styles.infoText}>Work-life balance: {formData.workLifeBalance}</Text>
              <Text style={styles.infoText}>Flexible hours: {formData.flexibility}</Text>
              <Text style={styles.infoText}>Mental health priority: {formData.mentalHealth}</Text>
            </View>
          );
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={prevStep}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={step < 5 ? nextStep : handleRegister}>
          <Text style={styles.buttonText}>{step < 5 ? 'Next' : 'Finish'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterCompanyScreen