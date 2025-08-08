import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';

const TripCompleted = ({ route, navigation }: any) => {
  const { pickup, drop, distance, duration, completedTime, driver, fare, paymentMethod } = route.params;

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleDownloadReceipt = () => {
    console.log('Download Receipt');
  };

  const handleHelpAndSupport = () => {
    navigation.navigate('Support');
  };

  const handleRateAndTip = () => {
    navigation.navigate('RateRide', {
      driver,
      pickup,
      drop,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Trip Completed Banner */}
      <View style={styles.completedBanner}>
        <Ionicons name="checkmark-circle" size={40} color="#FFFFFF" />
        <Text style={styles.completedText}>Trip Completed!</Text>
        <Text style={styles.completedSubText}>You've reached your destination safely</Text>
      </View>

      {/* Trip Summary */}
      <View style={styles.tripSummary}>
        <Text style={styles.summaryTitle}>Trip Summary</Text>
        <View style={styles.routeInfo}>
          <View style={styles.routeRow}>
            <Ionicons name="location-outline" size={16} color={Colors.gray} />
            <Text style={styles.routeLabel}>From: {pickup}</Text>
          </View>
          <View style={styles.routeRow}>
            <Ionicons name="flag-outline" size={16} color={Colors.gray} />
            <Text style={styles.routeLabel}>To: {drop}</Text>
          </View>
          <View style={styles.routeRow}>
            <Text style={styles.routeDetail}>Distance</Text>
            <Text style={styles.routeDetail}>{distance}</Text>
          </View>
          <View style={styles.routeRow}>
            <Text style={styles.routeDetail}>Duration</Text>
            <Text style={styles.routeDetail}>{duration}</Text>
          </View>
          <View style={styles.routeRow}>
            <Text style={styles.routeDetail}>Completed</Text>
            <Text style={styles.routeDetail}>{completedTime}</Text>
          </View>
        </View>
      </View>

      {/* Driver Info */}
      <View style={styles.driverContainer}>
        <Feather name="user" size={40} color={Colors.gray} style={styles.driverImage} />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverRating}>{driver.rating} ({driver.vehicle})</Text>
        </View>
      </View>

      {/* Fare Breakdown */}
      <View style={styles.fareContainer}>
        <Text style={styles.fareTitle}>Fare Breakdown</Text>
        <View style={styles.fareDetails}>
          <Text style={styles.fareItem}>Base Fare</Text>
          <Text style={styles.fareAmount}>₹{fare.baseFare}</Text>
        </View>
        <View style={styles.fareDetails}>
          <Text style={styles.fareItem}>Distance Charge ({distance})</Text>
          <Text style={styles.fareAmount}>₹{fare.distanceCharge}</Text>
        </View>
        <View style={styles.fareDetails}>
          <Text style={styles.fareItem}>Time Charge ({duration})</Text>
          <Text style={styles.fareAmount}>₹{fare.timeCharge}</Text>
        </View>
        <View style={styles.fareDetails}>
          <Text style={styles.fareItem}>Platform Fee</Text>
          <Text style={styles.fareAmount}>₹{fare.platformFee}</Text>
        </View>
        <View style={styles.fareDetails}>
          <Text style={styles.fareItem}>GST (18%)</Text>
          <Text style={styles.fareAmount}>₹{fare.gst}</Text>
        </View>
        <View style={styles.fareTotal}>
          <Text style={styles.fareItem}>Total Paid</Text>
          <Text style={styles.fareAmount}>₹{fare.total}</Text>
        </View>
        <Text style={styles.paymentMethod}>Paid via UPI ({paymentMethod} ****1234)</Text>
      </View>

      {/* Rate Your Experience */}
      <View style={styles.rateContainer}>
        <Text style={styles.rateText}>Rate Your Experience</Text>
        <Text style={styles.rateSubText}>How was your trip with {driver.name}?</Text>
        <View style={styles.ratingStars}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star" size={24} color="#FFD700" />
          <Ionicons name="star" size={24} color="#FFD700" />
        </View>
        <TouchableOpacity style={styles.rateButton} onPress={handleRateAndTip}>
          <Text style={styles.rateButtonText}>Rate & Give Tip</Text>
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownloadReceipt}>
          <Ionicons name="download-outline" size={20} color={Colors.black} />
          <Text style={styles.actionButtonText}>Download Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleHelpAndSupport}>
          <Ionicons name="help-circle-outline" size={20} color={Colors.black} />
          <Text style={styles.actionButtonText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  completedBanner: {
    backgroundColor: '#28A745',
    borderRadius: 8,
    padding: 16,
    paddingVertical: 50,
    alignItems: 'center',
    marginBottom: 16,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  completedSubText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  tripSummary: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    margin: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  routeInfo: {
    paddingHorizontal: 5,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeDetail: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  routeLabel: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    margin: 16,
  },
  driverImage: {
    marginRight: 20,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  driverRating: {
    fontSize: 14,
    color: '#666666',
  },
  fareContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    margin: 16,
  },
  fareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  fareDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  fareItem: {
    fontSize: 14,
    color: '#666666',
  },
  fareAmount: {
    fontSize: 14,
    color: '#000000',
  },
  fareTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
  },
  paymentMethod: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
    marginTop: 4,
  },
  rateContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    margin: 16,
    alignItems: 'center',
  },
  rateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  rateSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  rateButton: {
    backgroundColor: '#FFC107',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rateButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    marginBottom: 0,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  driverDetails: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 8,
  },
  backButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 16,
    marginBottom: 25,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TripCompleted;