import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Modal } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors';
// Sample data structured as you'd receive from backend
const rideHistory = [
  {
    id: '1',
    destination: 'No. 45, Anna Nagar, Chennai Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint error culpa soluta voluptates totam mollitia nemo et eos modi, rerum tempore voluptatum cupiditate illum temporibus perspiciatis, dolores aperiam accusantium corporis!',
    
    start: 'dskrjgerhgierhgejgnjoiuegujierngiundegiuhbdbiugdfiug',
    
    timestamp: '2025-07-21T10:30:00',
    cost: 120,
    status: 'Completed',
    type: 'auto',
    rating: 0,
  },
  {
    id: '2',
    destination: 'T Nagar, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-19T18:45:00',
    cost: 95,
    status: 'Cancelled',
    type: 'taxi',
    rating: 2,
  },
  {
    id: '3',
    destination: 'Velachery, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-17T14:00:00',
    cost: 140,
    status: 'Completed',
    type: 'parcel',
    rating: 5,
  },
  {
    id: '4',
    destination: 'Adyar, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-15T09:15:00',
    cost: 80,
    status: 'Completed',
    type: 'bike',
    rating: 3,
  },
  {
    id: '5',
    destination: 'Besant Nagar, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-13T16:30:00',
    cost: 110,
    status: 'Completed',
    type: 'taxi',
    rating: 4,
  },
  {
    id: '6',
    destination: 'Kodambakkam, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-11T12:20:00',
    cost: 105,
    status: 'Completed',
    type: 'parcel',
    rating: 5,
  },
  {
    id: '7',
    destination: 'Mylapore, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-09T19:10:00',
    cost: 130,
    status: 'Cancelled',
    type: 'auto',
    rating: 1,
  },
  {
    id: '8',
    destination: 'Guindy, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-07T08:45:00',
    cost: 115,
    status: 'Completed',
    type: 'bike',
    rating: 3,
  },
  {
    id: '9',
    destination: 'Egmore, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-05T17:30:00',
    cost: 90,
    status: 'Completed',
    type: 'bike',
    rating: 4,
  },
  {
    id: '10',
    destination: 'Nungambakkam, Chennai',
    start: 'Chennai',
    timestamp: '2025-07-03T15:00:00',
    cost: 125,
    status: 'Completed',
    type: 'parcel',
    rating: 5,
  },
];

const renderIcon = (type: string) => {
  switch (type) {
    case 'bike':
      return <MaterialCommunityIcons name="motorbike" size={30} />;
    case 'taxi':
      return <MaterialCommunityIcons name="car" size={30} />;
    case 'parcel':
      return <MaterialCommunityIcons name="cube-outline" size={30} />;
    case 'auto':
      return <MaterialCommunityIcons name="rickshaw" size={30} />;
    default:
      return <FeatherIcon name="box" size={30} color="#aaa" />;
  }
};

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
const TABS = [
  { label: 'Rides', icon: 'motorbike' },
  { label: 'Parcels', icon: 'cube-outline' },
];

const MyRidesScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'Rides' | 'Parcels'>('Rides');

const truncate = (text: string, length = 30) =>
  text.length > length ? text.slice(0, length) + '...' : text;


  const [selectedRide, setSelectedRide] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [rides, setRides] = useState(rideHistory); // Use local state
  const filteredData = rides.filter(item =>
    activeTab === 'Rides'
      ? item.type === 'bike' || item.type === 'taxi' || item.type === 'auto'
      : item.type === 'parcel',
  );
  const openRatingModal = (ride: any) => {
    setSelectedRide(ride);
    setSelectedRating(ride.rating || 0);
    setModalVisible(true);
  };

  const submitRating = () => {
    if (!selectedRide) return;

    const updatedRides = rides.map(ride =>
      ride.id === selectedRide.id ? { ...ride, rating: selectedRating } : ride,
    );

    setRides(updatedRides);
    setModalVisible(false);
  };

const renderItem = ({ item }: any) => (
  <View style={styles.rideItem}>
    <TouchableOpacity
      onPress={() => navigation.navigate('RideDetails', { ride: item })}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {renderIcon(item.type)}
        <View style={styles.rideDetails}>
          <Text style={styles.destination}>{truncate(item.destination)}</Text>
          <Text style={styles.subText}>{formatDateTime(item.timestamp)}</Text>
          <Text style={styles.subText}>
            ₹{item.cost} • {item.status}
          </Text>
        </View>
        <FeatherIcon
          name="chevron-right"
          size={20}
          color="#888"
          style={{ marginLeft: 'auto' }}
        />
      </View>
    </TouchableOpacity>

    {/* Star Rating Row - visible and aligned below */}
    <View style={styles.ratingRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => openRatingModal(item)}
          // disabled={item.rating > 0}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={star <= item.rating ? 'star' : 'star-outline'}
            size={20}
            color={item.rating > 0 ? '#FFD700' : '#999'}
            style={{ marginRight: 4 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);



return (
  <View style={styles.container}>
    {/* Top Tabs */}
    <View style={styles.tabContainer}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.label}
          style={[styles.tab, activeTab === tab.label && styles.activeTab]}
          onPress={() => setActiveTab(tab.label as 'Rides' | 'Parcels')}
        >
          <MaterialCommunityIcons
            name={tab.icon}
            size={18}
            color={activeTab === tab.label ? Colors.black : Colors.gray}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.label && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <FlatList
      data={filteredData}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No {activeTab.toLowerCase()} found.
        </Text>
      }
    />

    {/* Rating Modal */}
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
            Rate this ride
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => setSelectedRating(star)}
              >
                <MaterialCommunityIcons
                  name={star <= selectedRating ? 'star' : 'star-outline'}
                  size={30}
                  color="#FFD700"
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);

  
};




const styles = StyleSheet.create({
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
ratingRow: {
  flexDirection: 'row',
  marginTop: 8,
  paddingLeft: 32, // Align with text start
},

modalContent: {
  backgroundColor: Colors.white,
  padding: 20,
  borderRadius: 12,
  alignItems: 'center',
  width: '80%',
},
submitButton: {
  backgroundColor: Colors.black,
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 12,
},

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 60,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: Colors.darkGray,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
rideItem: {
  backgroundColor: Colors.backgroundWhite,
  borderRadius: 10,
  padding: 14,
  marginBottom: 12,
},




  rideDetails: {
    flex: 1,
    marginLeft:10,
    marginRight: 10,
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
  separator: {
    height: 0, // No default line separator since items have padding and border-radius
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.borderGray,
    paddingBottom: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 55,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
  },
  activeTab: {
    backgroundColor: Colors.yellow,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.gray,
  },
  activeTabLabel: {
    color: Colors.black,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.gray,
    marginTop: 30,
    fontSize: 14,
  },
});

export default MyRidesScreen;
