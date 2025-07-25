import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const RideDetailScreen = ({ route }: any) => {
  const { ride } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Section 1: Ride Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
         Bike Ride
        </Text>
        <Text style={styles.subText}>{new Date(ride.timestamp).toLocaleString()}</Text>
        <Text style={styles.costText}>₹{ride.cost} • {ride.status}</Text>
      </View>

      {/* Section 2: Ride Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="map-pin" size={16} /> Ride Details
        </Text>
        <View style={styles.route}>
          <View style={styles.pinRow}>
            <View style={styles.greenDot} />
            <Text style={styles.address}>Chennai Central</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.pinRow}>
            <View style={styles.redDot} />
            <Text style={styles.address}>{ride.destination}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>25 min</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>12.3 km</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Ride ID</Text>
          <Text style={styles.detailValue}>#{ride.id}</Text>
        </View>
      </View>

      {/* Section 3: Invoice */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="file-text" size={16} /> Invoice
        </Text>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Total Fare</Text>
          <Text style={styles.invoiceValue}>₹{ride.cost}</Text>
        </View>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceSub}>Ride Charges</Text>
          <Text style={styles.invoiceSubValue}>₹{ride.cost - 20}</Text>
        </View>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceSub}>Booking Fees</Text>
          <Text style={styles.invoiceSubValue}>₹10</Text>
        </View>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceSub}>Other Charges</Text>
          <Text style={styles.invoiceSubValue}>₹10</Text>
        </View>

        <TouchableOpacity style={styles.emailBtn}>
          <Text style={styles.emailText}>
            <Icon name="mail" size={16} color="#007AFF" /> Send via Email
          </Text>
          <Icon name="chevron-right" size={18} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Section 4: Support */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Icon name="help-circle" size={16} /> Support
        </Text>
        <Text style={styles.supportText}>
          Need help with this ride? Tap to contact support.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop:60, backgroundColor: '#fff' },
  section: { marginBottom: 20 },

  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#444' },
  subText: { fontSize: 14, color: '#666' },
  costText: { fontSize: 16, color: '#000', fontWeight: 'bold', marginTop: 4 },

  route: { marginTop: 10, marginBottom: 10 },
  pinRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'green', marginRight: 8 },
  redDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 8 },
  line: { height: 12, borderLeftWidth: 2, borderColor: '#ccc', marginLeft: 4 },
  address: { fontSize: 14, color: '#333' },

  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  detailLabel: { fontSize: 14, color: '#666' },
  detailValue: { fontSize: 14, fontWeight: '600' },

  invoiceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  invoiceLabel: { fontSize: 16, fontWeight: '600' },
  invoiceValue: { fontSize: 16, fontWeight: '600' },
  invoiceSub: { fontSize: 14, color: '#666' },
  invoiceSubValue: { fontSize: 14, color: '#333' },

  emailBtn: {
    marginTop: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  emailText: { fontSize: 15, color: '#007AFF' },

  supportText: { marginTop: 6, fontSize: 14, color: '#007AFF' },
});

export default RideDetailScreen;
