import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const rideTypes = [
  { type: 'Bike', image: require('../../assets/bike.png') },
  { type: 'Auto', image: require('../../assets/auto.png') },
  { type: 'Taxi', image: require('../../assets/taxi.png') },
  { type: 'Parcel', image: require('../../assets/parcel.png') },
];

const RideTypeSwitcher = ({ onSelect }: { onSelect: (type: string) => void }) => {
  const [selected, setSelected] = useState('Bike');

  return (
    <View style={styles.container}>
      {rideTypes.map(({ type, image }) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.optionBox,
            selected === type && styles.activeOptionBox,
          ]}
          onPress={() => {
            setSelected(type);
            onSelect(type); // parent handles navigation
          }}
        >
          <Image source={image} style={styles.image} />
          <Text style={[styles.label, selected === type && styles.activeText]}>
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10,
  },
  optionBox: {
    width: '48%',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  activeOptionBox: {
    backgroundColor: '#f8c32fff',
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  activeText: {
    color: '#000',
  },
});

export default RideTypeSwitcher;
