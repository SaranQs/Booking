//fix navigation issue

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
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WalletScreen from '../MenuScreens/WalletScreen';
import BottomModal from './BottomModal';

type RootStackParamList = {
  Wallet: undefined;
};
const WalletScreenWrapper = () => {
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
  const route = { params: {} };
  return <WalletScreen navigation={navigation} route={route} />;
};

const ConfirmRideScreen = ({ route }: any) => {
  const [walletVisible, setWalletVisible] = useState(false);

  const { pickup, drop } = route.params; //will beused for esdtimating fare
  const [selectedMode, setSelectedMode] = useState<'bike' | 'auto' | 'taxi'>(
    'bike',
  );

  const rideOptions = {
    bike: {
      cost: 45,
      time: 10,
      image: require('../../assets/bike.png'),
    },
    auto: {
      cost: 60,
      time: 15,
      image: require('../../assets/auto.png'),
    },
    taxi: {
      cost: 90,
      time: 20,
      image: require('../../assets/taxi.png'),
    },
  };

const getDropTime = (minutes: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });
};
  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>[Map View Placeholder]</Text>
      </View>

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
            onPress={() => setSelectedMode(key as 'bike' | 'auto' | 'taxi')}
          >
            <Image source={option.image} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.transportName}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
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
          onPress={() => setWalletVisible(true)}
        >
          <Ionicons name="cash-outline" size={20} />
          <Text style={styles.optionTitle}>Mode of Payment</Text>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock}>
          <Text style={styles.optionTitle}>Offers</Text>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Book {selectedMode}</Text>
      </TouchableOpacity>
      <BottomModal
        visible={walletVisible}
        onClose={() => setWalletVisible(false)}
      >
        <WalletScreenWrapper />
      </BottomModal>
    </View>
  );
};

export default ConfirmRideScreen;
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: Colors.white,
  },
  mapPlaceholder: {
    height: height * 0.5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#777',
  },
  transportScroll: {
    maxHeight: height * 0.25,
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
