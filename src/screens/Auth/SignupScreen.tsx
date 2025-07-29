import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../../constants/colors'; // update the path based on your file structure

const SignupScreen = ({ navigation }: any) => {
  const [mobile, setMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMessage('');
    navigation.navigate('Otp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Enter your mobile number to sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        maxLength={10}
        value={mobile}
        onChangeText={(text) => {
          setMobile(text);
          setErrorMessage('');
        }}
      />

      {errorMessage.length > 0 && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleSendOtp}>
        <Text style={styles.btnText}>Send OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: Colors.black,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.black,
  },
  errorText: {
    color: Colors.red,
    fontSize: 13,
    marginTop: 6,
    marginBottom: 10,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.black,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 14,
  },
});

export default SignupScreen;
