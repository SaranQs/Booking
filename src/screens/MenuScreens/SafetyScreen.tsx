import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors';
const safetyItems = [
  {
    icon: <MaterialCommunityIcons name="alert-octagon-outline" size={24} color="#000" />,
    label: 'SOS',
    subtext: 'Emergency help in one tap',
  },
  {
    icon: <Feather name="phone" size={24} color="#000" />,
    label: 'Emergency Contacts',
    subtext: 'Manage trusted people',
  },
  {
    icon: <Feather name="map-pin" size={24} color="#000" />,
    label: 'Live Ride Tracking',
    subtext: 'Share your trip in real-time',
  },
  {
    icon: <MaterialCommunityIcons name="shield-outline" size={24} color="#000" />,
    label: 'Safety Tips',
    subtext: 'Know how we keep you safe',
  },
];

const SafetyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      
      {safetyItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card}>
          <View style={styles.iconWrapper}>{item.icon}</View>
          <View style={styles.textWrapper}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardSub}>{item.subtext}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  cardSub: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 2,
  },
});

export default SafetyScreen;
