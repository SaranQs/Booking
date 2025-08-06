import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Colors from '../../constants/colors';

type RootStackParamList = {
  Login: undefined;
  Otp: undefined;
  Signup: undefined;
  Home: undefined;
  MyRides: undefined;
  Wallet: undefined;
  Settings: undefined;
  Support: undefined;
  Profile: undefined;
  Favourites: undefined;
  Preferences: undefined;
  RideDetails: undefined;
  About: undefined;
  Parcel: undefined;
  AddressEntry: undefined;
};

const settingsData = [
  {
    title: 'General',
    data: ['Profile', 'Favourites', 'Preferences'],
  },
  {
    title: 'Others',
    data: ['About', 'Logout', 'Delete Account'],
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('Support')}
        >
          <Icon name="help-circle" size={18} color="gray" />
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleItemPress = (label: string) => {
    if (label === 'Profile') navigation.navigate('Profile');
    else if (label === 'Favourites') navigation.navigate('Favourites');
    else if (label === 'Preferences') navigation.navigate('Preferences');
    else if (label === 'About') navigation.navigate('About');
    else if (label === 'Logout') setShowLogoutModal(true); // Show logout modal
    else if (label === 'Delete Account') setShowDeleteModal(true); // Show delete modal
  };

  const confirmDelete = () => {
    console.log('Account deletion confirmed'); // Replace with actual deletion logic
    setShowDeleteModal(false);
  };

  const confirmLogout = () => {
    navigation.navigate('Login');// Replace with actual logout logic
    setShowLogoutModal(false);
  };

  const renderSection = (section: typeof settingsData[0]) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.data.map((label) => (
        <TouchableOpacity
          key={label}
          style={[
            styles.item,
            label === 'Delete Account' && styles.itemdel,
            label === 'Logout' && styles.itemLogout, // Style for Logout
          ]}
          onPress={() => handleItemPress(label)}
        >
          <Text
            style={[
              styles.itemText,
              label === 'Delete Account' && styles.deleteText,
              label === 'Logout' && styles.logoutText, // Style for Logout text
            ]}
          >
            {label}
          </Text>
          <Icon
            name="chevron-right"
            size={20}
            color={
              label === 'Delete Account'
                ? 'red'
                : label === 'Logout'
                ? '#888'
                : '#888'
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {settingsData.map(renderSection)}

      {/* Delete Confirmation Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowDeleteModal(false)}
        >
          <View style={styles.confirmBox}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={{ color: '#555', marginVertical: 10 }}>
              Are you sure you want to delete your account?
            </Text>
            <View style={styles.rowBetween}>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text style={{ color: '#555' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={{ color: '#d00', fontWeight: '700' }}>
                  <Icon name="trash-2" size={18} color="#d00" style={styles.icon} /> Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowLogoutModal(false)}
        >
          <View style={styles.confirmBox}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={{ color: '#555', marginVertical: 10 }}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.rowBetween}>
              <TouchableOpacity onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmLogout}>
                <Text style={styles.logoutButtonText}>
                  <Icon name="log-out" size={18} color="#888" style={styles.icon} /> Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  item: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemdel: {
    backgroundColor: Colors.lightRed,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLogout: {
    backgroundColor: Colors.lightGray, // Neutral background for Logout
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    color: Colors.black,
  },
  deleteText: {
    color: Colors.red,
    fontWeight: '600',
  },
  logoutText: {
    color: Colors.black, // Neutral color for Logout text
    fontWeight: '600',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  helpText: {
    color: Colors.gray,
    fontSize: 14,
    marginLeft: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    width: '80%',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    marginLeft: 10,
  },
  cancelText: {
    color: '#555',
  },
  logoutButtonText: {
    color: '#888',
    fontWeight: '700',
  },
});

export default SettingsScreen;