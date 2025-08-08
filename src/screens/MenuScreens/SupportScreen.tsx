import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/colors'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type RootStackParamList = {
  MyRides: undefined;
};
const latestRide = {
  destination: 'Anna Nagar, Chennai',
  timestamp: '2025-07-21T10:30:00',
  cost: 120,
  status: 'Completed',
};

const faqTopics = [
  'How to cancel a ride?',
  'Payment issues',
  'How to report a problem?',
  'Account settings',
  'Promo codes and offers',
];

const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const datePart = date.toLocaleDateString('en-IN', options);
  const timePart = date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${datePart} • ${timePart}`;
};

const SupportScreen = () => {
   const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
  const [search, setSearch] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Last Ride Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Last Ride</Text>
        <View style={styles.rideCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.destination}>{latestRide.destination}</Text>
            <Text style={styles.subText}>
              {formatDateTime(latestRide.timestamp)}
            </Text>
            <Text style={styles.subText}>
              ₹{latestRide.cost} • {latestRide.status}
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color="#888" />
        </View>
        <TouchableOpacity style={styles.viewAllBtn} onPress={() => navigation.navigate('MyRides')}>
          <Text style={styles.viewAllText}>View Full History</Text>
        </TouchableOpacity>
      </View>

      {/* Help Topics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help Topics</Text>
        <TextInput
          placeholder="Search help topics"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />

        {faqTopics
          .filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <TouchableOpacity key={item} style={styles.faqItem}>
              <Text style={styles.faqText}>{item}</Text>
              <Icon name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  rideCard: {
    backgroundColor: Colors.lightGray,
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destination: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 2,
  },
  viewAllBtn: {
    marginTop: 8,
  },
  viewAllText: {
    textAlign: 'center',
    color: '#007BFF',
    fontSize: 14,
    fontWeight: '500',
  },
  searchInput: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 14,
    color: Colors.black,
  },
  faqItem: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqText: {
    fontSize: 15,
    color: Colors.black,
  },
});

export default SupportScreen;
