// ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../constants/colors';
import { useUser } from '../../context/UserContext';
import { TouchableWithoutFeedback } from 'react-native';
const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [firstName, setFirstName] = useState('SSK');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('saran@example.com');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState(new Date('2000-01-01'));

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    visible: false,
    message: '',
  });

  const { setUserName } = useUser(); // Access setUserName from context

  const showAlert = (message: string) => {
    setCustomAlert({ visible: true, message });
    setTimeout(() => {
      setCustomAlert({ visible: false, message: '' });
    }, 2500);
  };

  const handleAddEmergency = () => {
    console.log('Add Emergency Contact Pressed');
  };

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSendOtp = () => {
    if (!newEmail.includes('@')) {
      showAlert('Enter a valid email');
      return;
    }
    setOtpSent(true);
    showAlert(`OTP sent to ${newEmail}`);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      showAlert('Enter a 4-digit OTP');
      return;
    }
    setEmail(newEmail);
    setModalVisible(false);
    setOtp('');
    setOtpSent(false);
    setNewEmail('');
    showAlert('Email updated successfully');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const genderOptions = ['Male', 'Female', 'Other'];

  const renderModalContent = () => {
    switch (modalType) {
      case 'name':
        return (
          <>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                setModalVisible(false);
                setUserName(`${firstName} ${lastName}`); // Update context with new name
              }}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        );
      case 'email':
        return (
          <>
            <Text style={styles.modalTitle}>Change Email</Text>
            {!otpSent ? (
              <>
                <TextInput
                  placeholder="Enter New Email"
                  style={styles.input}
                  value={newEmail}
                  onChangeText={setNewEmail}
                  keyboardType="email-address"
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSendOtp}
                >
                  <Text style={styles.saveText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ marginBottom: 8 }}>OTP sent to: {newEmail}</Text>
                <TextInput
                  placeholder="Enter OTP"
                  style={styles.input}
                  keyboardType="numeric"
                  value={otp}
                  maxLength={4}
                  onChangeText={text => setOtp(text.replace(/[^0-9]/g, ''))}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleVerifyOtp}
                >
                  <Text style={styles.saveText}>Verify & Save</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        );
      case 'gender':
        return (
          <>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {genderOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.genderOption}
                onPress={() => {
                  setGender(option);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: gender === option ? '#000' : '#555',
                    fontWeight: gender === option ? 'bold' : 'normal',
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>Profile</Text>
            <ProfileItem
              icon="user"
              label="Name"
              value={`${firstName} ${lastName}`}
              onPress={() => handleOpenModal('name')}
            />
            <ProfileItem
              icon="phone"
              label="Phone Number"
              value="+91 98765 43210"
            />
            <ProfileItem
              icon="mail"
              label="Email"
              value={email}
              onPress={() => handleOpenModal('email')}
            />
            <ProfileItem
              icon="user-check"
              label="Gender"
              value={gender}
              onPress={() => handleOpenModal('gender')}
            />
            <ProfileItem
              icon="calendar"
              label="Date of Birth"
              value={dob.toDateString()}
              onPress={() => setShowDatePicker(true)}
            />
            <ProfileItem icon="clock" label="Member Since" value="Jan 2023" />
            <Text style={styles.sectionTitle}>Emergency</Text>
            <View style={[styles.row, styles.emergencyRow]}>
              <Feather name="alert-triangle" size={20} color="red" />
              <Text style={styles.label}>Emergency Contact</Text>
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={handleAddEmergency}>
                <Text style={styles.redText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={[]}
        renderItem={null}
        ListFooterComponent={<View style={{ height: 60 }} />}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Android back button support
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            {/* Stop tap propagation for sheet content */}
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>{renderModalContent()}</View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        {customAlert.visible && (
          <View style={styles.absoluteAlert}>
            <View style={styles.customAlert}>
              <Text style={styles.alertText}>{customAlert.message}</Text>
            </View>
          </View>
        )}
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const ProfileItem = ({
  icon,
  label,
  value,
  onPress,
}: {
  icon: string;
  label: string;
  value: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Feather name={icon} size={20} color="#000" />
    <Text style={styles.label}>{label}</Text>
    <View style={{ flex: 1 }} />
    <Text style={styles.value}>{value}</Text>
    {onPress && <Feather name="chevron-right" size={16} color="#999" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  absoluteAlert: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  emergencyRow: {
    backgroundColor: Colors.lightRed,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  label: { marginLeft: 10, fontSize: 15, color: Colors.black },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.black,
    marginHorizontal: 10,
  },
  redText: { color: 'red', fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  genderOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  customAlert: {
    position: 'absolute',
    bottom: 240,
    backgroundColor: Colors.darkGray,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 1000,
  },
  alertText: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default ProfileScreen;
