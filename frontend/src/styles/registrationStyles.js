import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  stepContainer: {
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subheader: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputText: {
    color: '#888',
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#66b3ff',
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  disabledOption: {
    opacity: 0.5,
  },
  scrollContainer: {
    position: 'absolute', // Position relative to the parent container
    top: 0,             // Adjust top position
    left: 0,
    right: 100,
    bottom: 1500,          // Leave space for header and buttons
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default styles