import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Colors from '../../constants/colors';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useFavorites } from '../../context/FavouritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../context/UserContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchQuickBookAddresses } from '../../services/address_type.service';
import { getAllUserAddresses, saveUserAddress } from '../../services/quick_book.service';

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
  AddressEntry:
    | { initialAddress?: string; field?: string; rideType: 'ride' | 'parcel' }
    | undefined;
  Safety: undefined;
  Notification: undefined;
  MyRewards: undefined;
  ReferAndEarn: undefined;
  ConfirmRide: { pickup: string; drop: string; rideType: 'ride' | 'parcel' };
  ObjectSelection: { pickup: string; drop: string; selectedMode: string };
  CaptainSearch: {
    pickup: string;
    drop: string;
    selectedMode: string;
    items?: { name: string; quantity: number }[];
  };
};

const HomeScreen = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const drawerRef = useRef<any>(null);
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
  const { addFavorite, favorites } = useFavorites();
  const { userName } = useUser(); // userId not available; using hardcoded value

  const [recentRides, setRecentRides] = useState([
    {
      id: 1,
      place: 'Office',
      address: '123 Business Park, Tech Road, City Center',
      liked: false,
    },
    {
      id: 2,
      place: 'Home',
      address: '456 Serenity Lane, Suburbia, New Delhi',
      liked: false,
    },
    {
      id: 3,
      place: 'Gym',
      address: '789 Fitness Avenue, Wellness Block, Bangalore',
      liked: false,
    },
  ]);

  const [quickBookAddresses, setQuickBookAddresses] = useState<
    { id: string; address: string; place: string }[]
  >([]);
  const [userAddresses, setUserAddresses] = useState<
    { id: string; add_type_id: string; address_line1: string; address_line2: string; city_id: string; is_active: string; pincode: string; status: boolean; user_id: string }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<{ id: string; place: string } | null>(null);
  const [addressInput, setAddressInput] = useState('');

  const userId = '1234fdg5fg678gj9s'; // Hardcoded user ID; replace with dynamic value

  useEffect(() => {
    const loadQuickBookAddresses = async () => {
      const addresses = await fetchQuickBookAddresses();
      setQuickBookAddresses(addresses);
    };
    const loadUserAddresses = async () => {
      const addresses = await getAllUserAddresses();
      setUserAddresses(addresses);
    };
    loadQuickBookAddresses();
    loadUserAddresses();
  }, [userId]);

  const handleRideTypeSelect = (type: 'ride' | 'parcel') => {
    navigation.navigate('AddressEntry', { rideType: type });
  };

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.slideOutLeft(200).then(() => setShowDrawer(false));
    }
  };

  const handleLike = (ride: {
    id: number;
    place: string;
    address: string;
    liked: boolean;
  }) => {
    setRecentRides(prev =>
      prev.map(item =>
        item.id === ride.id ? { ...item, liked: !item.liked } : item,
      ),
    );

    if (!ride.liked) {
      const isAlreadyFavorite = favorites.some(
        fav => fav.address === ride.address,
      );
      if (!isAlreadyFavorite) {
        addFavorite({
          id: Date.now().toString(),
          type: 'other',
          label: ride.place,
          address: ride.address,
        });
      }
    }
  };

  const handleQuickBookPress = async (address: { id: string; place: string }) => {
    setSelectedPlace(address);
    const existingAddress = userAddresses.find(a => a.add_type_id === address.id && a.user_id === userId);
    if (existingAddress && existingAddress.address_line1) {
      // Navigate to AddressEntryScreen with the existing address
      navigation.navigate('AddressEntry', {
        initialAddress: `${existingAddress.address_line1}${existingAddress.address_line2 ? `, ${existingAddress.address_line2}` : ''}`,
        field: 'drop',
        rideType: 'ride',
      });
    } else {
      // Open modal for new address input
      setAddressInput('');
      setModalVisible(true);
    }
  };

  const handleSaveAddress = async () => {
    if (!selectedPlace || !addressInput.trim()) {
      Alert.alert('Error', 'Please enter an address.');
      return;
    }

    const addressData = {
      add_type_id: selectedPlace.id,
      address_line1: addressInput.split(',')[0] || addressInput,
      address_line2: (addressInput.split(',').slice(1).join(',') || '').trim(),
      city_id: '', // Placeholder; replace with actual city ID logic
      id: Date.now().toString(), // Temporary unique ID
      is_active: 'true',
      pincode: '123456', // Placeholder; replace with actual pincode logic
      status: true,
      user_id: userId,
    };

    try {
      const response = await saveUserAddress(addressData);
      if (response.success) {
        Alert.alert('Success', 'Address saved successfully.');
        setModalVisible(false);
        // Update userAddresses and quickBookAddresses
        setUserAddresses(prev => [...prev, addressData]);
        setQuickBookAddresses(prev =>
          prev.map(item =>
            item.id === selectedPlace.id ? { ...item, address: addressInput } : item
          )
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to save address.');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'An error occurred while saving the address.');
    }
  };

  return (
    <LinearGradient
      colors={['#FFD700', '#fde77cff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.scroll}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setShowDrawer(true)}
              style={styles.iconWrapper}
            >
              <Feather name="menu" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>Welcome back</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <TouchableOpacity
              style={styles.notificationIcon}
              onPress={() => navigation.navigate('Notification')}
            >
              <Feather name="bell" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.locationContainer}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={20}
              color="#fff"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>
              Current Location<Text>{'\n'}</Text>Koramangala, Bangalore
              <Text>{'\n'}</Text>Accurate to 20 meters
            </Text>
          </View>

          <Text style={styles.helpText}>How can we help you today?</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollableContent}
          >
            <View style={styles.rideOptions}>
              <TouchableOpacity
                style={[
                  styles.rideOptionCard,
                  { borderColor: Colors.lightBlue },
                ]}
                onPress={() => handleRideTypeSelect('ride')}
              >
                <View
                  style={[styles.iconCircle, { backgroundColor: '#e6f0ff' }]}
                >
                  <Ionicons name="bicycle-outline" size={22} color="#1A73E8" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>Book a Ride</Text>
                  <Text style={styles.optionSubtitle}>Bike, Auto, Cab</Text>
                </View>
                <View style={styles.timePill}>
                  <Feather name="chevron-right" size={22} color={Colors.blue} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.rideOptionCard, { borderColor: '#ffe3ccff' }]}
                onPress={() => handleRideTypeSelect('parcel')}
              >
                <View
                  style={[styles.iconCircle, { backgroundColor: '#fff0e6ff' }]}
                >
                  <Ionicons name="cube-outline" size={22} color={Colors.red} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>Send Package</Text>
                  <Text style={styles.optionSubtitle}>Documents, Goods</Text>
                </View>
                <View style={styles.timePill}>
                  <Feather name="chevron-right" size={22} color={Colors.blue} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.quickBookContainer}>
              <Text style={styles.quickBookText}>Quick Book</Text>
              <Text style={styles.quickBookSubText}>
                Book your most frequent rides instantly
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickBookButtons}
              >
                {quickBookAddresses.map(address => (
                  <TouchableOpacity
                    key={address.id}
                    style={styles.quickBookButton}
                    onPress={() => handleQuickBookPress(address)}
                  >
                    <Ionicons
                      name={
                        address.place.toLowerCase() === 'home'
                          ? 'home-outline'
                          : address.place.toLowerCase() === 'office'
                          ? 'business-outline'
                          : 'location-outline'
                      }
                      size={15}
                      color={Colors.blue}
                    />
                    <Text style={styles.quickBookButtonText}>
                      {address.place}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.recentContainer}>
              <Text style={styles.recentTitle}>Recent Rides</Text>
              {recentRides.map(ride => (
                <TouchableOpacity
                  key={ride.id}
                  style={styles.rideRow}
                  onPress={() => {
                    navigation.navigate('AddressEntry', {
                      initialAddress: ride.address,
                      field: 'drop',
                      rideType: 'ride',
                    });
                  }}
                >
                  <Feather
                    name="map-pin"
                    size={18}
                    color={Colors.blue}
                    style={{ marginRight: 12 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.ridePlace}>{ride.place}</Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.rideAddress}
                    >
                      {ride.address}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleLike(ride)}>
                    <Feather
                      name="heart"
                      size={18}
                      color={ride.liked ? '#E53935' : '#aaa'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      {showDrawer && (
        <View style={styles.drawerOverlay}>
          <Animatable.View
            ref={drawerRef}
            animation="slideInLeft"
            duration={300}
            easing="ease-out"
            style={styles.drawer}
          >
            <View style={styles.drawerTopBar}>
              <TouchableOpacity onPress={closeDrawer} style={styles.backArrow}>
                <Feather name="arrow-left" size={24} color="#000" />
                <Text style={styles.menuTitle}>Menu</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.profileRow}
              >
                <Feather
                  name="user"
                  size={40}
                  color={Colors.darkGray}
                  style={styles.drawerProfileIcon}
                />
                <View style={styles.profileText}>
                  <Text style={styles.drawerName}>{userName}</Text>
                  <Text style={styles.drawerPhone}>+91 98765 43210</Text>
                </View>
                <Feather name="chevron-right" size={22} color="#888" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('MyRides')}
              >
                <Feather
                  name="clock"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>My Rides</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() =>
                  navigation.navigate('AddressEntry', { rideType: 'parcel' })
                }
              >
                <Feather
                  name="package"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Send Parcel</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('Wallet')}
              >
                <Feather
                  name="credit-card"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Payments</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('Safety')}
              >
                <Feather
                  name="shield"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Safety</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('ReferAndEarn')}
              >
                <Feather
                  name="gift"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Refer and Earn</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('MyRewards')}
              >
                <Feather
                  name="award"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>My Rewards</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('Notification')}
              >
                <Feather
                  name="bell"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Notifications</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('Settings')}
              >
                <Feather
                  name="settings"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Settings</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => navigation.navigate('Support')}
              >
                <Feather
                  name="help-circle"
                  size={18}
                  color="#666"
                  style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Support</Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color="#888"
                  style={{ marginLeft: 'auto' }}
                />
              </TouchableOpacity>
            </ScrollView>
          </Animatable.View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>Map Placeholder (Tap to select location)</Text>
            </View>
            {selectedPlace && (
              <Text style={styles.placeText}>{selectedPlace.place}</Text>
            )}
            <TextInput
              style={styles.addressInput}
              value={addressInput}
              onChangeText={setAddressInput}
              placeholder="Enter address"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollableContent: {
    paddingBottom: 40,
  },
  gradient: { flex: 1 },
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconWrapper: { padding: 6 },
  headerTextContainer: { flex: 1, marginLeft: 10 },
  greeting: { fontSize: 16, color: Colors.gray },
  userName: { fontSize: 18, fontWeight: 'bold', color: Colors.black },
  notificationIcon: { padding: 6 },
  locationContainer: {
    backgroundColor: Colors.blue + 'c0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: { marginRight: 10 },
  locationText: { color: Colors.white, fontSize: 14 },
  helpText: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  rideOptions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  rideOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    width: '100%',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  optionSubtitle: {
    fontSize: 13,
    color: Colors.gray,
  },
  timePill: {},
  quickBookContainer: {
    backgroundColor: Colors.blue + 'c0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  quickBookText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
  quickBookSubText: { color: Colors.white, fontSize: 12, marginTop: 5 },
  quickBookButtons: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  quickBookButton: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quickBookButtonText: { color: Colors.blue, fontWeight: '600' },
  recentContainer: {
    marginBottom: 20,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 10,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue + '0f',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  ridePlace: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
  },
  rideAddress: {
    fontSize: 13,
    color: Colors.gray,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
  },
  drawer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  drawerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000',
  },
  drawerHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileRow: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.borderGray,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  profileText: {
    flex: 1,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  drawerPhone: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  drawerProfileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.borderGray,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
  drawerLabel: {
    fontSize: 16,
    color: Colors.black,
  },
  drawerIcon: {
    marginRight: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapText: {
    color: '#666',
    fontSize: 14,
  },
  placeText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  addressInput: {
    height: 40,
    borderColor: Colors.blue + '70',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: Colors.blue,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;