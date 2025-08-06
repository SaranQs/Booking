import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ConfirmParcelRideScreen = ({ route, navigation }: any) => { // Added navigation prop
  const { pickup, drop } = route.params || {}; // Safely access route.params
  const [selectedMode, setSelectedMode] = useState<'bike' | 'truck_small' | 'truck_large'>('bike');

  const rideOptions = {
    bike: {
      cost: 45,
      time: 10,
      image: require('../../assets/bike.png'),
    },
    truck_small: {
      cost: 60,
      time: 20,
      image: require('../../assets/truck_s.png'),
    },
    truck_large: {
      cost: 90,
      time: 15,
      image: require('../../assets/truck_l.png'),
    },
  };

  const getDropTime = (minutes: number) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleConfirm = () => {
    // Navigate to a confirmation screen or perform booking logic
    navigation.navigate('BookingConfirmation', { pickup, drop, selectedMode });
  };

  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>[Map View Placeholder]</Text>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Drag Handle */}
        <View style={styles.handle} />

        {/* Scrollable Transport Section */}
        <ScrollView
          style={styles.transportScroll}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(rideOptions).map(([key, option]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.transportCard,
                selectedMode === key && styles.selectedCard,
              ]}
              onPress={() => setSelectedMode(key as 'bike' | 'truck_small' | 'truck_large')}
            >
              <Image source={option.image} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.transportName}>
                  {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                </Text>
                <Text style={styles.estimate}>
                  {option.time} min • Drop by {getDropTime(option.time)}
                </Text>
              </View>
              <Text style={styles.price}>₹{option.cost}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Mode of Payment & Offers */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.optionBlock}
            onPress={() => navigation.navigate('PaymentScreen')}
          >
            <Ionicons name="cash-outline" size={20} color={Colors.black} />
            <Text style={styles.optionTitle}>Mode of Payment</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionBlock}
            onPress={() => navigation.navigate('OffersScreen')}
          >
            <Feather name="gift" size={20} color={Colors.black} />
            <Text style={styles.optionTitle}>Offers</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Book {selectedMode.replace('_', ' ')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmParcelRideScreen;

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: Colors.white,
  },
  mapPlaceholder: {
    height: height * 0.6, // Same map size
    backgroundColor: '#e0e0e0',
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
    elevation: 8, // Increased for Android shadow
    paddingHorizontal: 16,
    paddingTop: 8,
    // paddingBottom: 16,
    height: height * 0.5, // Bottom sheet takes half the screen
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
    maxHeight: height * 0.30, // Adjusted for transport options
    marginBottom: 12,
  },
  transportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: Colors.black,
    backgroundColor: '#f2f2f2',
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
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTitle: {
    fontWeight: '500',
    color: Colors.black,
  },
  optionArrow: {
    fontSize: 18,
    color: '#888',
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