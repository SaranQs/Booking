import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Colors from '../../constants/colors'; // Adjust the path as necessary
const rideTypes = [
  { type: 'Bike', image: require('../../assets/bike.png') },
  { type: 'Auto', image: require('../../assets/auto.png') },
  { type: 'Taxi', image: require('../../assets/taxi.png') },
  { type: 'Parcel', image: require('../../assets/parcel.png') },
];


const RideTypeSwitcher = ({ onSelect }: { onSelect: (type: string) => void }) => {
  const [selected, setSelected] = useState('');

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
    backgroundColor: '#fff8cc',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.black,
    marginBottom: 10,
    shadowColor: Colors.darkGray,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  activeOptionBox: {
    backgroundColor: Colors.gold,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '600',
  },
  activeText: {
    color: Colors.black,
  },
});

export default RideTypeSwitcher;
