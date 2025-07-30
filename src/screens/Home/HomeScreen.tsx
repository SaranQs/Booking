import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Colors from '../../constants/colors';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import RideTypeSwitcher from './RideTypeSwitcher';

const HomeScreen = () => {
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
    Safety: undefined;
    Notification: undefined;
    MyRewards: undefined;
  };
  const [selectedRide, setSelectedRide] = useState('Bike');
  const [showDrawer, setShowDrawer] = useState(false);
  const drawerRef = useRef<any>(null);
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
  const handleRideTypeSelect = (type: string) => {
    if (type === 'Parcel') {
      navigation.navigate('Parcel');
    } else {
      navigation.navigate('AddressEntry');
    }
  };

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.slideOutLeft(200).then(() => setShowDrawer(false));
    }
  };

  const recentRides = [
    {
      id: 1,
      place: 'Office',
      address: '123 Business Park, Tech Road, City Center',
      liked: true,
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
  ];

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
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setShowDrawer(true)}
              style={styles.iconWrapper}
            >
              <Feather name="menu" size={24} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchContainer}
              onPress={() => navigation.navigate('AddressEntry')}
            >
              <Feather
                name="search"
                size={18}
                color="#888"
                style={styles.searchIcon}
              />
              <Text style={styles.fakeInput}>Where are you going?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentContainer}>
            <Text style={styles.recentTitle}>Recent Rides</Text>
            {recentRides.map(ride => (
              <View key={ride.id} style={styles.rideRow}>
                <Feather
                  name="map-pin"
                  size={18}
                  color="#555"
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
                <TouchableOpacity>
                  <Feather
                    name={ride.liked ? 'heart' : 'heart'}
                    size={18}
                    color={ride.liked ? '#E53935' : '#aaa'}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Pickup Location"
              placeholderTextColor="#777"
            />
            <TextInput
              style={styles.input}
              placeholder="Drop Location"
              placeholderTextColor="#777"
            />
          </View> */}

          {/* <View style={styles.mapPlaceholderContainer}>
            <Image
              source={require('../../assets/map-placeholder.png')}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={styles.mapOverlay}>
              <Text style={styles.mapOverlayText}>Map View (Coming Soon)</Text>
            </View>
          </View>

          <RideTypeSwitcher onSelect={setSelectedRide} />

          <View style={styles.imageContainer}>
            <Image source={getImageSource()} style={styles.vehicleImage} resizeMode="contain" />
          </View>

          <View style={styles.fareCard}>
            <Text style={styles.fareTitle}>Estimated Fare</Text>
            <Text style={styles.fare}>{getFareEstimate()}</Text>
          </View>

          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Ride</Text>
          </TouchableOpacity> */}

          <View style={styles.exploreSection}>
            <Text style={styles.exploreTitle}>Explore</Text>
            <RideTypeSwitcher onSelect={handleRideTypeSelect} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Drawer */}
      {/* Drawer */}
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
                onPress={() => {
                  (navigation as any).navigate('Profile');
                }}
                style={styles.profileRow}
              >
                <Feather
                  name="user"
                  size={40}
                  color="#555"
                  style={styles.drawerProfileIcon}
                />
                <View style={styles.profileText}>
                  <Text style={styles.drawerName}>Saran Kathiravan</Text>
                  <Text style={styles.drawerPhone}>+91 98765 43210</Text>
                </View>
                <Feather name="chevron-right" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              style={styles.ratingRow}
              onPress={() => {
                // closeDrawer();
                (navigation as any).navigate('MyRating');
              }}
            >
              <Feather
                name="star"
                size={20}
                color="#FFD700"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.drawerLabel}>My Rating</Text>
              <Feather
                name="chevron-right"
                size={20}
                color="#888"
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                // closeDrawer();
                (navigation as any).navigate('MyRides');
              }}
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
              onPress={() => {
                (navigation as any).navigate('Parcel');
              }}
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
              onPress={() => {
                // closeDrawer();
                (navigation as any).navigate('Wallet');
              }}
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
              onPress={() => {
                (navigation as any).navigate('Safety');
              }}
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
              onPress={() => {
                (navigation as any).navigate('ReferAndEarn');
              }}
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
              onPress={() => {
                (navigation as any).navigate('MyRewards');
              }}
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
              onPress={() => {
                // closeDrawer();
                (navigation as any).navigate('Notification');
              }}
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
              onPress={() => {
                // closeDrawer();
                (navigation as any).navigate('Settings');
              }}
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
              onPress={() => {
                // closeDrawer();
                (navigation as any).navigate('Support');
              }}
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
          </Animatable.View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  recentContainer: {
    marginBottom: 20,
  },
  drawerProfileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    textAlignVertical: 'center',
    // padding: 12,
    marginRight: 12,
  },
  fakeInput: {
    color: Colors.gray,
    fontSize: 14,
    paddingLeft: 8,
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
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
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
  exploreSection: {
    marginBottom: 30,
  },
  exploreTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 12,
  },

  gradient: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  iconWrapper: { padding: 6 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 120,
    flex: 1,
    marginLeft: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
    fontSize: 14,
    color: Colors.black,
  },
  searchIcon: { marginLeft: 8 },
  inputContainer: { marginBottom: 25 },
  imageContainer: { alignItems: 'center' },
  vehicleImage: { width: 150, height: 100 },
  // fareCard: {
  //   backgroundColor: '#fff',
  //   borderRadius: 16,
  //   paddingVertical: 18,
  //   paddingHorizontal: 24,
  //   alignItems: 'center',
  //   elevation: 6,
  //   marginBottom: 25,
  // },
  // fareTitle: { fontSize: 14, color: '#999' },
  // fare: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 4 },
  // bookButton: {
  //   backgroundColor: '#000',
  //   paddingVertical: 16,
  //   borderRadius: 14,
  //   alignItems: 'center',
  //   elevation: 6,
  // },
  // bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Drawer styles
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
  // closeDrawerBtn: {
  //   position: 'absolute',
  //   top: 20,
  //   right: 15,
  // },
  // closeText: {
  //   fontSize: 28,
  //   color: '#888',
  // },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  // drawerProfilePic: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 35,
  //   marginRight: 12,
  // },
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
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
  drawerHeader: {
    alignItems: 'center',
    marginBottom: 30,
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
});

export default HomeScreen;
