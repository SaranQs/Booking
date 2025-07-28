import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';




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
//     <LinearGradient
//    colors={['#FFD700', '#fde77cff']} // Customize as needed
//   style={{ flex: 1 }}
// >
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

      {/* Error Message Below Input */}
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
     // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 10,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#000',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  },
});

export default SignupScreen;
