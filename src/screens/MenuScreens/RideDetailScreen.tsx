import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/colors';
import { Image } from 'react-native-animatable';
const getRideTypeDetails = (type: string) => {
  switch (type) {
    case 'bike':
      return {
        label: 'Bike Ride',
        icon: (
          <Image
            source={require('../../assets/bike.png')}
            style={{ width: 30, height: 20,}}
          />

        ),
        bgColor: Colors.white,
      };
    case 'taxi':
      return {
        label: 'Taxi Ride',
        icon: (
          <Image
            source={require('../../assets/taxi.png')}
            style={{ width: 30, height: 20,}}
          />
        ),
        bgColor : Colors.white,

      };
    case 'auto':
      return {
        label: 'Auto Ride',
        icon: (
          <Image
            source={require('../../assets/auto.png')}
            style={{ width: 30, height: 20,}}
          />
        ),
        bgColor: Colors.white,
      };
    case 'parcel':
      return {
        label: 'Parcel Delivery',
        icon: (
          <MaterialCommunityIcons name="cube-outline" size={22} color={Colors.white} />
        ),
        bgColor: Colors.white,

      };
    default:
      return {
        label: 'Ride',
        icon: <Icon name="box" size={20} color="#fff" />,
        bgColor: '#999',
      };
  }
};

const RideDetailScreen = ({ route }: any) => {
  const { ride } = route.params;
  const navigation = useNavigation();
  const { label, icon, bgColor } = getRideTypeDetails(ride.type);

  return (
    <ScrollView style={styles.container}>
      {/* Ride Header */}
      <View style={[styles.rideHeader, { backgroundColor: bgColor }]}>
        <View style={styles.rideTypeIcon}>{icon}</View>
        <View>
          <Text style={styles.rideTitle}>{label}</Text>
          <Text style={styles.rideDate}>
            {new Date(ride.timestamp)
              .toLocaleString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(',', ' •')}
          </Text>
        </View>
        <Text style={styles.ridePrice}>₹{ride.cost}</Text>
      </View>

      {/* Your Route */}
      <View style={styles.titleRow}>
        <Icon name="map-pin" size={16} color={Colors.blue} />
        <Text style={styles.cardTitle}>Your Route</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.routeSection}>
          <View style={styles.dotWrapper}>
            <View style={styles.outerDotGreen}>
              <View style={styles.innerDotWhite} />
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.outerDotRed}>
              <View style={styles.innerDotWhite} />
            </View>
          </View>
          <View style={styles.addressWrapper}>
            <Text style={styles.addressText}>{ride.start}</Text>
            <Text></Text>
            <Text style={styles.addressText}>{ride.destination}</Text>
          </View>
        </View>
      </View>

      {/* Ride Details */}
      <View style={styles.titleRow}>
        <Icon name="info" size={16} color={Colors.blue} />
        <Text style={styles.cardTitle}>Ride Details</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>25 min</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>12.3 km</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ride ID</Text>
          <Text style={styles.value}>#{ride.id}</Text>
        </View>
      </View>

      {/* Invoice */}
      <View style={styles.titleRow}>
        <Icon name="file-text" size={16} color={Colors.blue} />
        <Text style={styles.cardTitle}>Invoice</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Total Fare</Text>
          <Text style={styles.value}>₹{ride.cost}</Text>
        </View>
        <View style={styles.rowSub}>
          <Text style={styles.subLabel}>Ride Charges</Text>
          <Text style={styles.subValue}>₹{ride.cost - 20}</Text>
        </View>
        <View style={styles.rowSub}>
          <Text style={styles.subLabel}>Booking Fees</Text>
          <Text style={styles.subValue}>₹10</Text>
        </View>
        <View style={styles.rowSub}>
          <Text style={styles.subLabel}>Other Charges</Text>
          <Text style={styles.subValue}>₹10</Text>
        </View>
        <TouchableOpacity style={styles.emailButton}>
          <Text style={styles.emailText}>Send Invoice via Email</Text>
          <Icon name="chevron-right" size={18} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.titleRow}>
        <Icon name="info" size={16} color={Colors.blue} />
        <Text style={styles.cardTitle}>Support</Text>
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          (navigation as any).navigate('Support');
        }}
      >
        <Text style={styles.supportText}>
          Need help with this ride? Tap to contact support.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },

  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    elevation: 4,

  },
  rideTypeIcon: {
    // backgroundColor: Colors.blue,
    borderRadius: 30,
    padding: 10,
    marginRight: 12,
  },
  rideTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.blue,
    textAlign: 'center',
  },
  rideDate: { fontSize: 12, color: Colors.gray, marginTop: 2 },
  ridePrice: { fontSize: 20, fontWeight: 'bold', color: Colors.blue },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue,
  },

  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: '600' },

  rowSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  subLabel: { fontSize: 13, color: '#aaa' },
  subValue: { fontSize: 13, color: Colors.darkGray },

  routeSection: {
    flexDirection: 'row',
  },
  dotWrapper: {
    alignItems: 'center',
    marginRight: 12,
    flexDirection: 'column',
  },
  outerDotGreen: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerDotRed: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDotWhite: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  verticalLine: {
    flex: 1,
    borderStyle: 'dashed',
    borderLeftWidth: 2,
    borderColor: '#ccc',
    marginVertical: 4,
  },
  addressWrapper: {
    justifyContent: 'space-between',
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: Colors.black,
    paddingHorizontal: 5,
    // marginBottom: 14,
  },

  emailButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailText: { color: '#007AFF', fontSize: 15 },

  supportText: {
    fontSize: 14,
    color: '#007AFF',
  },
});

export default RideDetailScreen;
