import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import MyRidesScreen from '../screens/MenuScreens/MyRidesScreen';
import WalletScreen from '../screens/MenuScreens/WalletScreen';
import SettingsScreen from '../screens/MenuScreens/SettingsScreen';
import SupportScreen from '../screens/MenuScreens/SupportScreen';
import Profile from '../screens/MenuScreens/ProfileScreen';
import Favoutires from '../screens/MenuScreens/FavoutiresScreen';
import Preferences from '../screens/MenuScreens/PreferencesScreen';
import RideDetails from '../screens/MenuScreens/RideDetailScreen';
import AboutScreen from '../screens/MenuScreens/AboutScreen';
import Parcel from '../screens/MenuScreens/ParcelScreen';
import AddressEntry from '../screens/Home/AddressEntryScreen';
import Safety from '../screens/MenuScreens/SafetyScreen';
import ReferAndEarn from '../screens/MenuScreens/ReferAndEarnScreen'; // Importing the new screen
import MyRewards from '../screens/MenuScreens/MyRewardsScreen';
import Notification from '../screens/MenuScreens/NotificationScreen';
import ConfirmRide from '../screens/Ride/ConfirmRideScreen';
import ParcelEntry from '../screens/Home/ParcelAddressEntryScreen';
import ParcelRide from '../screens/Ride/ConfirmParcelRideScreen';
export type RootStackParamList = {
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
  AddressEntry:  { initialAddress: string; field: string } | undefined;
  Safety: undefined;
  ReferAndEarn: undefined;
  MyRewards: undefined;
  Notification: undefined;
  ConfirmRide: undefined,
  ParcelEntry: undefined;
  ParcelRide: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="MyRides"
          component={MyRidesScreen}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            title: 'My Rides',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            presentation: 'modal', 
            headerTitleStyle: { color: '#000' },
            title: 'Payments',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            title: 'Settings',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Support',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Profile',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Favourites"
          component={Favoutires}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Favoutires',

          }}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
          }}
        />
        {/* <Stack.Screen
          name="MyRating"
          component={MyRating}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'My Rating',
          }}
        /> */}
        <Stack.Screen
          name="RideDetails"
          component={RideDetails}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Ride Details',
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'About',
          }}
        />
        <Stack.Screen
          name="Parcel"
          component={Parcel}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Parcel - Send Items',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Safety"
          component={Safety}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Safety',
            animation: 'slide_from_right',

          }}
        />
        <Stack.Screen
          name="ReferAndEarn"
          component={ReferAndEarn}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Refer and Earn',
            animation: 'slide_from_right',

          }}
        />
        <Stack.Screen
          name="MyRewards"
          component={MyRewards}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'My Rewards',
            animation: 'slide_from_right',

          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Notifications',
            animation: 'slide_from_right',

          }}
        />
        <Stack.Screen
          name="ConfirmRide"
          component={ConfirmRide}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Confirm Your Ride',
          }}
        />
        <Stack.Screen
          name="ParcelEntry"
          component={ParcelEntry}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Pickup & Drop',
          }}
        />
        <Stack.Screen
          name="ParcelRide"
          component={ParcelRide}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Pick your Vehicle',
          }}
        />

        <Stack.Screen
          name="AddressEntry"
          component={AddressEntry}
          options={{
            headerShown: true,
            // headerTransparent: true,
            headerShadowVisible:false,
            headerTitleStyle: { color: '#000' },
            headerTitle: 'Enter Address',
            presentation: 'modal', // Makes it slide from bottom
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
