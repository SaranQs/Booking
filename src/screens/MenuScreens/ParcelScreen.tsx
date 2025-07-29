import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
//   Dimensions,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/colors'
// const screenHeight = Dimensions.get('window').height;

const ParcelScreen = () => {
  const [isSwitched, setIsSwitched] = useState(false);
  const [pickupLocation, setPickupLocation] = useState(
    '123, Anna Nagar, Chennai',
  );
  const [dropLocation, setDropLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSwitch = () => {
    const temp = pickupLocation;
    setPickupLocation(dropLocation);
    setDropLocation(temp);
    setIsSwitched(!isSwitched);
  };

  return (
    <View style={styles.container}>
      {/* Banner */}
      <Image
        source={require('../../assets/parcelbanner.png')}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Pickup Section */}
      <View style={styles.locationBox}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Entypo name="location-pin" size={22} color="green" />
            <Text style={styles.label}>Pickup</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="edit-3" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {!isSwitched ? (
          <Text style={styles.staticText}>{pickupLocation}</Text>
        ) : (
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={18}
              color="#888"
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Pickup Location"
              placeholderTextColor="#999"

              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>
        )}

        <Text style={styles.subInfo}>John Doe: +91 9876543210</Text>
      </View>

      {/* Switch Button */}
      <TouchableOpacity style={styles.switchWrapper} onPress={handleSwitch}>
        <Feather name="repeat" size={22} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 16 }}>Switch</Text>
      </TouchableOpacity>

      {/* Drop Section */}
      <View style={styles.locationBox}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Entypo name="location-pin" size={22} color="red" />
            <Text style={styles.label}>Drop to</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="edit-3" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {isSwitched ? (
          <Text style={styles.staticText}>{dropLocation}</Text>
        ) : (
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={18}
              color="#888"
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Drop Address"
              placeholderTextColor="#999"

              value={dropLocation}
              onChangeText={setDropLocation}
            />
          </View>
        )}
      </View>

      {/* Modal Bottom Sheet */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 10,
            backgroundColor: '#fff',
            padding: 3,
            borderRadius: 50,
          }}
        >
          <MaterialIcons name="close" size={25} color="#444" />
        </TouchableOpacity>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            {/* Drag Handle */}
            {/* <View style={styles.handle} /> */}

            {/* Map Placeholder */}
            <View style={styles.mapPlaceholder}>
              <Text style={{ color: '#999' }}>Map Placeholder</Text>
            </View>

            <ScrollView
              style={{ padding: 16 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Address Field */}
              <View style={styles.inputRow}>
                <Feather
                  name="home"
                  size={20}
                  color="#666"
                  style={styles.iconLeft}
                />
                <TextInput
                  style={styles.input}
                  placeholder="House No. / Building (optional)"
                  placeholderTextColor="#999"

                />
              </View>

              {/* Section Title */}
              <Text style={styles.sectionTitle}>Add Contact Details</Text>

              {/* Contact Name Row */}
              <View style={styles.inputRow}>
                <Feather
                  name="user"
                  size={20}
                  color="#666"
                  style={styles.iconLeft}
                />
                <TextInput style={styles.input} placeholder="Contact Name" placeholderTextColor="#999"
/>
                <TouchableOpacity>
                  <MaterialIcons name="contacts" size={22} color="gray" />
                </TouchableOpacity>
              </View>

              {/* Phone Number */}
              <View style={styles.inputRow}>
                <Feather
                  name="phone"
                  size={20}
                  color="#666"
                  style={styles.iconLeft}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#999"

                  keyboardType="phone-pad"
                />
              </View>

              {/* Confirm Button */}
              <TouchableOpacity style={styles.confirmBtn}>
                <Text style={styles.confirmBtnText}>
                  Confirm Pickup Details
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 20,
  },
  locationBox: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginLeft: 4,
  },
  subInfo: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  switchWrapper: {
    alignSelf: 'center',
    padding: 10,
    width: 120,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 50,
    backgroundColor: Colors.black,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  staticText: {
    fontSize: 15,
    color: Colors.black,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  modalContent: {
    flex: 1,
  },

  handle: {
    width: 50,
    height: 5,
    backgroundColor: Colors.borderGray,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },

  mapPlaceholder: {
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.borderGray,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    color: Colors.black,
    paddingHorizontal: 10,
    backgroundColor: Colors.lightGray,
  },
  iconLeft: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 44,
     color: Colors.black,
    fontSize: 15,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
    color: Colors.black,
  },
  contactsBtn: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },

  confirmBtn: {
    backgroundColor: Colors.black,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  confirmBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ParcelScreen;
