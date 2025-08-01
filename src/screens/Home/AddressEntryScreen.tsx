import React, { useState, useEffect } from 'react';
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
import Colors from '../../constants/colors';
const data = [
  {
    id: '1',
    title: 'Home',
    subtitle: '157, S W Boag Rd, T Nagar, CIT Nagar East',
    icon: 'home',
  },
  {
    id: '2',
    title: 'Work',
    subtitle: 'RMZ Millenia Business Park, Perungudi',
    icon: 'clock',
  },
  { id: '3', title: 'Gym', subtitle: 'Gold’s Gym, Anna Nagar', icon: 'clock' },
  {
    id: '4',
    title: "Friend's Place",
    subtitle: '12, Lake View Rd, West Mambalam',
    icon: 'clock',
  },
  {
    id: '5',
    title: 'Airport',
    subtitle: 'Chennai International Airport, Meenambakkam',
    icon: 'clock',
  },
  {
    id: '6',
    title: 'Hotel',
    subtitle: 'Taj Coromandel, Nungambakkam',
    icon: 'clock',
  },
  {
    id: '7',
    title: 'Mall',
    subtitle: 'Express Avenue, Royapettah',
    icon: 'clock',
  },
  {
    id: '8',
    title: 'Hospital',
    subtitle: 'Apollo Hospital, Greams Road',
    icon: 'clock',
  },
  {
    id: '9',
    title: 'School',
    subtitle: 'DAV Senior Secondary School, Mogappair',
    icon: 'clock',
  },
  {
    id: '10',
    title: 'Park',
    subtitle: 'Semmozhi Poonga, Teynampet',
    icon: 'clock',
  },
  {
    id: '11',
    title: 'Restaurant',
    subtitle: 'Murugan Idli Shop, T Nagar',
    icon: 'clock',
  },
  {
    id: '12',
    title: 'Temple',
    subtitle: 'Kapaleeshwarar Temple, Mylapore',
    icon: 'clock',
  },
  {
    id: '13',
    title: 'Beach',
    subtitle: 'Marina Beach, Triplicane',
    icon: 'clock',
  },
  {
    id: '14',
    title: 'Library',
    subtitle: 'Connemara Public Library, Egmore',
    icon: 'clock',
  },
];

const AddressEntryScreen = ({ navigation }: any) => {
  const [pickup, setPickup] = useState(
    '157, S W Boag Rd, T Nagar, CIT Nagar East',
  );
  const [drop, setDrop] = useState('');
  const [stops, setStops] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(data);

  const [focusedField, setFocusedField] = useState<'pickup' | 'drop' | null>(
    null,
  );
  const addStop = () => {
    if (stops.length >= 3) return;
    setStops([...stops, '']);
  };

  const removeStop = (index: number) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
  };

  const updateStop = (text: string, index: number) => {
    const updatedStops = [...stops];
    updatedStops[index] = text;
    setStops(updatedStops);
  };

  const handlePickupChange = (text: string) => {
    setPickup(text);
    setFilteredData(
      data.filter(item =>
        item.subtitle.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const handleDropChange = (text: string) => {
    setDrop(text);
    setFilteredData(
      data.filter(item =>
        item.subtitle.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        if (focusedField === 'pickup') {
          setPickup(item.subtitle);
          handlePickupChange(item.subtitle); // updates filtered list
        } else if (focusedField === 'drop') {
          setDrop(item.subtitle);
          handleDropChange(item.subtitle); // updates filtered list
        }

        // Delay and navigate only if both fields are filled
        setTimeout(() => {
          const finalPickup =
            focusedField === 'pickup' ? item.subtitle : pickup;
          const finalDrop = focusedField === 'drop' ? item.subtitle : drop;

          if (finalPickup && finalDrop) {
            navigation.navigate('ConfirmRide', {
              pickup: finalPickup,
              drop: finalDrop,
            });
          }
        }, 200);
      }}
    >
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
    </TouchableOpacity>
  );

  useEffect(() => {
    if (!pickup && !drop) {
      setFilteredData(data);
    }
  }, [pickup, drop]);

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
              onChangeText={handlePickupChange}
              placeholder="Pickup location"
              placeholderTextColor="#aaa"
              onFocus={() => setFocusedField('pickup')}
            />

            {pickup.length > 0 && (
              <TouchableOpacity
                onPress={() => setPickup('')}
                style={styles.clearIcon}
              >
                <Feather name="x" size={16} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Stops */}
        {stops.map((stop, index) => (
          <View key={index}>
            <View style={styles.dashedLine} />
            <View style={styles.addressRow}>
              <View style={[styles.dotOuter, { backgroundColor: '#FF9800' }]}>
                <View style={styles.dotInner} />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={stops[index]} // <-- Use the correct stop value
                  onChangeText={text => updateStop(text, index)} // <-- Update only that stop
                  placeholder={`Stop ${index + 1}`}
                  placeholderTextColor="#aaa"
                  // onFocus={() => setFocusedField('stop')} // optional, if you want
                />
                {stop.length > 0 && (
                  <TouchableOpacity
                    onPress={() => updateStop('', index)}
                    style={styles.clearIcon}
                  >
                    <Feather name="x" size={16} color="#888" />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                onPress={() => removeStop(index)}
                style={{ padding: 8 }}
              >
                <Feather name="minus-circle" size={18} color="#f00" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Drop */}
        <View style={styles.dashedLine} />
        <View style={styles.addressRow}>
          <View style={[styles.dotOuter, { backgroundColor: '#F44336' }]}>
            <View style={styles.dotInner} />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={drop}
              onChangeText={handleDropChange}
              placeholder="Drop location"
              placeholderTextColor="#aaa"
              onFocus={() => setFocusedField('drop')}
            />
            {drop.length > 0 && (
              <TouchableOpacity
                onPress={() => setDrop('')}
                style={styles.clearIcon}
              >
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
        <TouchableOpacity style={styles.actionButton} onPress={addStop}>
          <MaterialIcons name="add" size={18} color="#000" />
          <Text style={styles.actionText}>Add stop</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    paddingTop: 60,
  },
  addressCard: {
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 15,
    borderLeftWidth: 1.5,
    borderColor: Colors.gray,
    borderStyle: 'dashed',
    marginLeft: 7,
    marginVertical: 2,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 12,
    // paddingVertical: 4,
  },
  input: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    paddingRight: 24,
  },
  clearIcon: {
    position: 'absolute',
    right: 8,
    top: 13,
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
    borderColor: Colors.borderGray,
  },
  listIcon: {
    width: 28,
    alignItems: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
  },
  itemSubtitle: {
    fontSize: 13,
    color: Colors.gray,
  },
});

export default AddressEntryScreen;
