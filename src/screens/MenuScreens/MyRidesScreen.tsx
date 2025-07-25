import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Sample data structured as you'd receive from backend
const rideHistory = [
  {
    id: '1',
    destination: 'No. 45, Anna Nagar, Chennai',
    timestamp: '2025-07-21T10:30:00', // ISO string from backend
    cost: 120,
    status: 'Completed',
  },
  {
    id: '2',
    destination: 'T Nagar, Chennai',
    timestamp: '2025-07-19T18:45:00',
    cost: 95,
    status: 'Cancelled',
  },
  {
    id: '3',
    destination: 'Velachery, Chennai',
    timestamp: '2025-07-17T14:00:00',
    cost: 140,
    status: 'Completed',
  },
  {
    id: '4',
    destination: 'Adyar, Chennai',
    timestamp: '2025-07-15T09:15:00',
    cost: 80,
    status: 'Completed',
  },
  {
    id: '5',
    destination: 'Besant Nagar, Chennai',
    timestamp: '2025-07-13T16:30:00',
    cost: 110,
    status: 'Completed',
  },
  {
    id: '6',
    destination: 'Kodambakkam, Chennai',
    timestamp: '2025-07-11T12:20:00',
    cost: 105,
    status: 'Completed',
  },
  {
    id: '7',
    destination: 'Mylapore, Chennai',
    timestamp: '2025-07-09T19:10:00',
    cost: 130,
    status: 'Cancelled',
  },
  {
    id: '8',
    destination: 'Guindy, Chennai',
    timestamp: '2025-07-07T08:45:00',
    cost: 115,
    status: 'Completed',
  },
  {
    id: '9',
    destination: 'Egmore, Chennai',
    timestamp: '2025-07-05T17:30:00',
    cost: 90,
    status: 'Completed',
  },
  {
    id: '10',
    destination: 'Nungambakkam, Chennai',
    timestamp: '2025-07-03T15:00:00',
    cost: 125,
    status: 'Completed',
  },

];

// Helper function to format date & time
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

const MyRidesScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.rideItem}
      onPress={() => navigation.navigate('RideDetails', { ride: item })}
    >
      <View style={styles.rideDetails}>
        <Text style={styles.destination}>{item.destination}</Text>
        <Text style={styles.subText}>{formatDateTime(item.timestamp)}</Text>
        <Text style={styles.subText}>₹{item.cost} • {item.status}</Text>
      </View>
      <Icon name="chevron-right" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>My Rides</Text> */}
      <FlatList
        data={rideHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  rideItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  rideDetails: {
    flex: 1,
    marginRight: 10,
  },
  destination: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  separator: {
    height: 0, // No default line separator since items have padding and border-radius
  },
});

export default MyRidesScreen;
