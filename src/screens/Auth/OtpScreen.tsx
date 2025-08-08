import React, { useRef, useState, useEffect } from 'react';
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
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OTP_LENGTH = 4;

const OtpScreen = ({ navigation }: any) => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill('1'));
  const [validationMessage, setValidationMessage] = useState('');
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];

    if (text === '') {
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0) inputs.current[index - 1]?.focus();
    } else if (/^\d$/.test(text)) {
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length !== OTP_LENGTH || !/^\d{4}$/.test(finalOtp)) {
      setValidationMessage('Please enter a valid 4-digit OTP');
      setTimeout(() => setValidationMessage(''), 3000);
      return;
    }

    setValidationMessage('');
    navigation.navigate('Home');
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

        <View style={styles.otpBoxContainer}>
          <View style={styles.otpBox}>
            <Text style={styles.logoText}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 4-digit code sent to your mobile number
            </Text>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputs.current[index] = ref;
                  }}
                  value={digit}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.otpInput}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && otp[index] === '') {
                      if (index > 0) {
                        inputs.current[index - 1]?.focus();
                        const newOtp = [...otp];
                        newOtp[index - 1] = '';
                        setOtp(newOtp);
                      }
                    }
                  }}
                />
              ))}
            </View>

            {validationMessage.length > 0 && (
              <Text style={styles.errorText}>{validationMessage}</Text>
            )}

            <TouchableOpacity style={styles.btn} onPress={handleVerify}>
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>Verify & Continue</Text>
                <Feather name="check-circle" size={20} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Change Number</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Resend')}>
              <Text style={styles.linkText}>Didn't receive the code? Resend</Text>
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
  otpBoxContainer: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height: '100%',
  },
  otpBox: {
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
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: Colors.white,
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
    marginVertical: 5,
  },
});

export default OtpScreen;