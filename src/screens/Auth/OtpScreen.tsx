import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/colors';

const OTP_LENGTH = 4;

const OtpScreen = ({ navigation }: any) => {
    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const [validationMessage, setValidationMessage] = useState('');
    const inputs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        // Auto-focus the first input once mounted
        inputs.current[0]?.focus();
    }, []);
    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];

        if (text === '') {
            newOtp[index] = '';
            setOtp(newOtp);

            // If user pressed backspace, go to previous input
            if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        } else if (/^\d$/.test(text)) {
            newOtp[index] = text;
            setOtp(newOtp);

            // Move to next input if not last
            if (index < OTP_LENGTH - 1) {
                inputs.current[index + 1]?.focus();
            }
        }
    };


    const handleVerify = () => {
        const finalOtp = otp.join('');
        if (finalOtp.length !== OTP_LENGTH || !/^\d{4}$/.test(finalOtp)) {
            setValidationMessage('Please enter a valid 4-digit OTP');
            setTimeout(() => setValidationMessage(''), 3000);
            return;
        }

        // Proceed only if valid
        setValidationMessage('');
        navigation.navigate('Home');
    };

    return (
        <LinearGradient
              colors={['#FFD700', '#fde77cff']} // gold to yellow
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>Enter the 4-digit code sent to your number</Text>

            <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            inputs.current[index] = ref;
                        }}
                        value={digit}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.otpInput}
                        onChangeText={(text) => handleChange(text, index)}
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

            {validationMessage ? (
                <Text style={styles.errorText}>{validationMessage}</Text>
            ) : null}

            <TouchableOpacity style={styles.btn} onPress={handleVerify}>
                <View style={styles.btnContent}>
                    <Image
                        source={require('../../assets/verify.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                    <Text style={styles.btnText}>Verify & Continue</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Resend')}>
                <Text style={styles.linkText}>Didn't get the code? Resend</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.btn} onPress={handleContinue}>
                      <View style={styles.btnContent}>
                        <Text style={styles.btnText}>Continue </Text>
                        <Image
                          source={require('../../assets/login.png')}
                          style={styles.icon}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity> */}
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 24,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.white + 'a0', // You can use transparent white here
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    color: Colors.red,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: Colors.black,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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


export default OtpScreen;
