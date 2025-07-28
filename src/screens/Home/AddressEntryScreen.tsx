import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const data = [
  { id: '1', title: 'Home', subtitle: '157, S W Boag Rd, T Nagar, CIT Nagar East', icon: 'home' },
  { id: '2', title: 'Work', subtitle: 'RMZ Millenia Business Park, Perungudi', icon: 'briefcase' },
  { id: '3', title: 'Gym', subtitle: 'Gold’s Gym, Anna Nagar', icon: 'activity' },
  { id: '4', title: "Friend's Place", subtitle: '12, Lake View Rd, West Mambalam', icon: 'user' },
  { id: '5', title: 'Airport', subtitle: 'Chennai International Airport, Meenambakkam', icon: 'send' },
  { id: '6', title: 'Hotel', subtitle: 'Taj Coromandel, Nungambakkam', icon: 'coffee' },
  { id: '7', title: 'Mall', subtitle: 'Express Avenue, Royapettah', icon: 'shopping-bag' },
  { id: '8', title: 'Hospital', subtitle: 'Apollo Hospital, Greams Road', icon: 'plus-square' },
  { id: '9', title: 'School', subtitle: 'DAV Senior Secondary School, Mogappair', icon: 'book' },
  { id: '10', title: 'Park', subtitle: 'Semmozhi Poonga, Teynampet', icon: 'tree' },
  { id: '11', title: 'Restaurant', subtitle: 'Murugan Idli Shop, T Nagar', icon: 'star' },
  { id: '12', title: 'Temple', subtitle: 'Kapaleeshwarar Temple, Mylapore', icon: 'feather' },
  { id: '13', title: 'Beach', subtitle: 'Marina Beach, Triplicane', icon: 'sun' },
  { id: '14', title: 'Library', subtitle: 'Connemara Public Library, Egmore', icon: 'book-open' },
];

const AddressEntryScreen = () => {
  const [pickup, setPickup] = useState('157, S W Boag Rd, T Nagar, CIT Nagar East');
  const [drop, setDrop] = useState('');

  const renderItem = ({ item }: any) => (
    <View style={styles.listItem}>
      <View style={styles.listIcon}>
        <Feather name={item.icon} size={16} color="#555" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
      <TouchableOpacity>
        <Feather name="heart" size={18} color="#888" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Pickup/Drop Input Card */}
      <View style={styles.addressCard}>
        {/* Pickup */}
        <View style={styles.addressRow}>
          <View style={[styles.dotOuter, { backgroundColor: '#4CAF50' }]}>
            <View style={styles.dotInner} />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={pickup}
              onChangeText={setPickup}
              placeholder="Pickup location"
              placeholderTextColor="#aaa"
            />
            {pickup.length > 0 && (
              <TouchableOpacity onPress={() => setPickup('')} style={styles.clearIcon}>
                <Feather name="x" size={16} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.dashedLine} />

        {/* Drop */}
        <View style={styles.addressRow}>
          <View style={[styles.dotOuter, { backgroundColor: '#F44336' }]}>
            <View style={styles.dotInner} />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={drop}
              onChangeText={setDrop}
              placeholder="Drop location"
              placeholderTextColor="#aaa"
            />
            {drop.length > 0 && (
              <TouchableOpacity onPress={() => setDrop('')} style={styles.clearIcon}>
                <Feather name="x" size={16} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="location-outline" size={18} color="#000" />
          <Text style={styles.actionText}>Select on map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="add" size={18} color="#000" />
          <Text style={styles.actionText}>Add stops</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 60 },
  addressCard: {
    backgroundColor: '#F6F7FB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dotOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  dashedLine: {
    height: 12,
    borderLeftWidth: 1.5,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    marginLeft: 7,
    marginVertical: 8,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f6f7fb',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 12,
    // paddingVertical: 4,
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    paddingRight: 24,
  },
  clearIcon: {
    position: 'absolute',
    right: 8,
    top: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '48%',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listIcon: {
    width: 28,
    alignItems: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666',
  },
});

export default AddressEntryScreen;
