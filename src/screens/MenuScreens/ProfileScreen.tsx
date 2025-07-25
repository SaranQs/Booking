import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [firstName, setFirstName] = useState('Saran');
  const [lastName, setLastName] = useState('Kathiravan');
  const [email, setEmail] = useState('saran@example.com');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState(new Date('1990-01-01'));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
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
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        );
      case 'email':
        return (
          <>
            <Text style={styles.modalTitle}>Edit Email</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        );
      case 'gender':
        return (
          <>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {genderOptions.map((option) => (
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
            <ProfileItem icon="phone" label="Phone Number" value="+91 98765 43210" />
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
            <ProfileItem
              icon="clock"
              label="Member Since"
              value="Jan 2023"
            />
            <Text style={styles.sectionTitle}>Emergency</Text>
            <View style={[styles.row, styles.emergencyRow]}>
              <Feather name="alert-triangle" size={20} color="red" />
              <Text style={styles.label}>Emergency Contact</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.redText}>+ Add</Text>
            </View>
          </>
        }
        data={[]}
        renderItem={null}
        ListFooterComponent={<View style={{ height: 60 }} />}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>{renderModalContent()}</View>
        </View>
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
    <Feather name={icon} size={20} color="#888" />
    <Text style={styles.label}>{label}</Text>
    <View style={{ flex: 1 }} />
    <Text style={styles.value}>{value}</Text>
    {onPress && <Feather name="chevron-right" size={16} color="#999" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#888', marginBottom: 10, marginTop: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emergencyRow: {
    backgroundColor: '#fef3f3',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  label: { marginLeft: 10, fontSize: 15, color: '#444' },
  value: { fontSize: 15, fontWeight: '500', color: '#000', marginHorizontal: 10 },
  redText: { color: 'red', fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  genderOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default ProfileScreen;
