import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMutation } from "@apollo/client";
import { CREATE_COMPANY_REVIEW } from "../graphql/mutations";

const CompanyReviewScreen = ({ navigation, route }) => {
  const [rating, setRating] = useState(1); 
  const [reviewText, setReviewText] = useState("");
  const [createCompanyReview] = useMutation(CREATE_COMPANY_REVIEW);
  const { name } = route.params;

  const handleReviewSubmit = () => {
    createCompanyReview({
      variables: {
        companyName: name,
        review: reviewText,
        stars: rating
      },
    }).then(response => {
        if (response.data.createCompanyReview.success) {
          Alert.alert("Success", "Company review successfully submitted!");
          navigation.goBack();
        } else {
          Alert.alert("Error", "Failed to submit company review.");
        }
      })
      .catch(error => {
        Alert.alert("Error", error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate and Review the Company</Text>

      <Text style={styles.label}>Rating:</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Icon
              name={star <= rating ? "star" : "star-o"} // Filled star or empty star
              size={50} // Increased size for stars
              color="#f8c700"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Your Review:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your review here..."
        multiline
        numberOfLines={4}
        value={reviewText}
        onChangeText={(text) => setReviewText(text)}
      />

      <Button title="Submit Review" onPress={handleReviewSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center', // Center the stars horizontally
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top', // Align text to the top of the multiline input
  },
});

export default CompanyReviewScreen;
