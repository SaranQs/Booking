import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import WalletModalWrapper from './WalletModalWrapper';
import WalletScreen from '../MenuScreens/WalletScreen';
import OffersScreen from '../Ride/OffersScreen';

// type RootStackParamList = {
//   Login: undefined;
//   Otp: undefined;
//   Signup: undefined;
//   Home: undefined;
//   MyRides: undefined;
//   Wallet: undefined;
//   Settings: undefined;
//   Support: undefined;
//   Profile: undefined;
//   Favourites: undefined;
//   Preferences: undefined;
//   RideDetails: undefined;
//   About: undefined;
//   AddressEntry: { initialAddress?: string; field?: string; rideType: 'ride' | 'parcel' } | undefined;
//   Safety: undefined;
//   Notification: undefined;
//   MyRewards: undefined;
//   ReferAndEarn: undefined;
//   ConfirmRide: { pickup: string; drop: string; rideType: 'ride' | 'parcel' };
//   ObjectSelection: { pickup: string; drop: string; selectedMode: string };
//   CaptainSearch: { pickup: string; drop: string; selectedMode: string; items?: { name: string; quantity: number }[] };
// };

// type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmRide'>;

const ConfirmRideScreen = ({ route, navigation }: any) => {
  const { pickup, drop, rideType } = route.params;
  const [selectedMode, setSelectedMode] = useState<string>('Bike');
  const [walletVisible, setWalletVisible] = useState(false);
  const [offersVisible, setOffersVisible] = useState(false);

  const rideOptions = useMemo(() => ({
    ride: {
      Bike: {
        cost: 45,
        time: 10,
        image: require('../../assets/bike.png'),
      },
      Auto: {
        cost: 60,
        time: 15,
        image: require('../../assets/auto.png'),
      },
      Taxi: {
        cost: 90,
        time: 20,
        image: require('../../assets/taxi.png'),
      },
    },
    parcel: {
      Bike: {
        cost: 45,
        time: 10,
        image: require('../../assets/bike.png'),
      },
      'Truck Small': {
        cost: 60,
        time: 15,
        image: require('../../assets/truck_s.png'),
      },
      'Truck Large': {
        cost: 90,
        time: 20,
        image: require('../../assets/truck_l.png'),
      },
    },
  }), []);

  const dropTimes = useMemo(() => {
    const date = new Date();
    return Object.fromEntries(
      Object.entries(rideOptions[rideType as 'ride' | 'parcel']).map(([key, option]) => {
        const dropDate = new Date(date.getTime() + option.time * 60 * 1000);
        return [
          key,
          dropDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        ];
      })
    );
  }, [rideType, rideOptions]);

  const handleConfirm = () => {
    const params = { pickup, drop, selectedMode };
    if (rideType === 'ride') {
      navigation.navigate('CaptainSearch', params);
    } else {
      navigation.navigate('ObjectSelection', params);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>[Map View Placeholder]</Text>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <ScrollView
          style={styles.transportScroll}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(rideOptions[rideType as 'ride' | 'parcel']).map(([key, option]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.transportCard,
                selectedMode === key && styles.selectedCard,
              ]}
              onPress={() => setSelectedMode(key)}
            >
              <Image source={option.image} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.transportName}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text style={styles.estimate}>
                  {option.time} min • Drop by {dropTimes[key]}
                </Text>
              </View>
              <Text style={styles.price}>₹{option.cost}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.optionBlock}
            onPress={() => {
              // console.log('Opening Wallet Modal, walletVisible:', walletVisible);
              setWalletVisible(true);
            }}
          >
            <Ionicons name="cash-outline" size={20} color={Colors.black} />
            <Text style={styles.optionTitle}>Mode of Payment</Text>
            <Feather name="chevron-right" size={13} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionBlock}
            onPress={() => {
              // console.log('Opening Offers Modal, offersVisible:', offersVisible);
              setOffersVisible(true);
            }}
          >
            <Feather name="gift" size={20} color={Colors.black} />
            <Text style={styles.optionTitle}>Offers</Text>
            <Feather name="chevron-right" size={13} color={Colors.black} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Book {selectedMode}</Text>
        </TouchableOpacity>
      </View>

      <WalletModalWrapper
        visible={walletVisible}
        onClose={() => {
          // console.log('Closing Wallet Modal');
          setWalletVisible(false);
        }}
      >
        <WalletScreen />
      </WalletModalWrapper>

      <WalletModalWrapper
        visible={offersVisible}
        onClose={() => {
          // console.log('Closing Offers Modal');
          setOffersVisible(false);
        }}
      >
        <OffersScreen />
      </WalletModalWrapper>
    </View>
  );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapPlaceholder: {
    height: height * 0.6,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#777',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    paddingHorizontal: 16,
    padding: 8,
    height: height * 0.5,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  transportScroll: {
    maxHeight: height * 0.30,
    marginBottom: 12,
  },
  transportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: Colors.blue,
    backgroundColor: Colors.blue + '0f',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  transportName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    color: Colors.black,
  },
  estimate: {
    fontSize: 13,
    color: '#555',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.black,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  optionBlock: {
    flex: 0.48,
    backgroundColor: Colors.blue + '0f',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTitle: {
    fontWeight: '500',
    marginLeft:4,
    color: Colors.black,
  },
  confirmButton: {
    backgroundColor: Colors.black,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmRideScreen;