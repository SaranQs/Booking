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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Colors from '../../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('5497924624');
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
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

        <View style={styles.loginBoxContainer}>
          <View style={styles.loginBox}>
            <Text style={styles.logoText}>Welcome Back</Text>
            <Text style={styles.title}>Sign in to continue your journey</Text>

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
                <Icons name="login" size={20} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>New user? Sign up</Text>
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
  loginBoxContainer: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height:'100%',
  },
  loginBox: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 30,
    shadowColor: '#000',
    elevation: 20,
    
  },
  iconbg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#abbdfe5e',
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
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
  },
});

export default LoginScreen;