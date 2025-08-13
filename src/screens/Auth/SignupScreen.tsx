import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Colors from '../../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
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
    <LinearGradient
      colors={[Colors.gold, Colors.yellow]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* TOP UI SECTION */}
        <View style={styles.headerBox}>
          <View style={styles.logoWrapper}>
            <Ionicons name="bicycle-outline" size={18} color={Colors.black} />
            <Ionicons name="cube-outline" size={18} color={Colors.black} />
          </View>
          <Text style={styles.appTitle}>RidePorter</Text>
          <Text style={styles.appTagline}>Your one-stop mobility solution</Text>

          <View style={styles.featureIcons}>
            <View style={styles.featureItem}>
              <View style={styles.iconbg}>
                <Ionicons name="bicycle-outline" size={30} color={Colors.white} />
              </View>
              <Text style={styles.featureText}>Quick Rides</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.iconbg}>
                <Ionicons name="cube-outline" size={30} color={Colors.white} />
              </View>
              <Text style={styles.featureText}>Goods Transport</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.iconbg}>
                <Ionicons name="location-outline" size={30} color={Colors.white} />
              </View>
              <Text style={styles.featureText}>Live Tracking</Text>
            </View>
          </View>
        </View>

        {/* SIGNUP FORM */}
        <View style={styles.signupBoxContainer}>
          <View style={styles.signupBox}>
            <Text style={styles.logoText}>Create Account</Text>
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
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>Send OTP</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: Colors.white,
  },
  headerBox: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    height: '80%',
  },
  logoWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  appTagline: {
    fontSize: 13,
    color: Colors.white,
    marginBottom: 25,
  },
  featureIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  featureItem: {
    alignItems: 'center',
  },
  featureText: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 6,
  },
  iconbg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#abbdfe5e',
  },
  signupBoxContainer: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height: '100%',
  },
  signupBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 30,
    shadowColor: '#000',
    elevation: 20,
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
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
    backgroundColor: Colors.blue,
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
    gap: 5,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.gray,
    marginVertical: 5,
  },
});

export default SignupScreen;