import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Colors from '../../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleContinue = () => {
    if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMessage('');
    navigation.navigate('Otp');
  };

  return (
    <LinearGradient
      colors={[Colors.gold, Colors.yellow]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.logoText}>Login</Text>

        <Text style={styles.title}>Enter your mobile number</Text>
        <Text style={styles.subtitle}>We will send you an OTP to verify</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={(text) => {
            setMobileNumber(text);
            setErrorMessage('');
          }}
        />

        {errorMessage.length > 0 && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity style={styles.btn} onPress={handleContinue}>
          <View style={styles.btnContent}>
            <Text style={styles.btnText}>Continue </Text>
           <Icons name="login" size={20} color='#fff' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>New user? Sign up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: Colors.black,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.gray,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
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
    marginBottom: 15,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:5,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  linkText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.gray,
  },
});

export default LoginScreen;
