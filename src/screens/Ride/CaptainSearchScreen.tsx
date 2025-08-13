import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
const { height } = Dimensions.get('window');
const MIN_HEIGHT = height * 0.35; // Minimized state
const MID_HEIGHT = height * 0.5; // Default state
const MAX_HEIGHT = height * 0.8; // Maximized state

const CaptainSearchScreen = ({ navigation, route }: any) => {
  const { pickup, drop, selectedMode } = route.params;
  const [isSearching, setIsSearching] = useState(true);
  const [captainDetails, setCaptainDetails] = useState<any>(null);

  // Bottom sheet animation
  const translateY = useSharedValue(0);
  const bottomSheetHeight = useSharedValue(MID_HEIGHT);

  const animatedStyle = useAnimatedStyle(() => ({
    height: bottomSheetHeight.value,
    transform: [{ translateY: translateY.value }],
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newHeight = bottomSheetHeight.value - event.translationY;
      if (newHeight >= MIN_HEIGHT && newHeight <= MAX_HEIGHT) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(() => {
      let snapHeight = MID_HEIGHT;
      if (bottomSheetHeight.value - translateY.value < (MIN_HEIGHT + MID_HEIGHT) / 2) {
        snapHeight = MIN_HEIGHT;
      } else if (bottomSheetHeight.value - translateY.value > (MID_HEIGHT + MAX_HEIGHT) / 2) {
        snapHeight = MAX_HEIGHT;
      }
      bottomSheetHeight.value = withSpring(snapHeight);
      translateY.value = withSpring(0);
    });

  // Simulate captain search with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
      setCaptainDetails({
        name: 'Captain Name',
        vehicleType: selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1),
        vehicleNumber: 'TN 22 AB 1234',
        eta: '5 min',
        rating: '4.8',
        otp: '1234',
        distance: '3.5 km',
        estimatedCost: selectedMode === 'bike' ? 45 : selectedMode === 'auto' ? 60 : 90,
        phoneNumber: '+919876543210',
      });
    }, 3000); // 3-second delay to simulate search

    return () => clearTimeout(timer);
  }, [selectedMode]);

  const handleCallCaptain = () => {
    if (captainDetails?.phoneNumber) {
      Linking.openURL(`tel:${captainDetails.phoneNumber}`).catch((err) =>
        console.error('Failed to open dialpad:', err)
      );
    }
  };

  const handleShareRide = async () => {
    if (!captainDetails) return;

    const shareMessage = `
Ride Details:
Captain: ${captainDetails.name} (${captainDetails.rating} ⭐)
Vehicle: ${captainDetails.vehicleType} (${captainDetails.vehicleNumber})
From: ${pickup}
To: ${drop}
Distance: ${captainDetails.distance}
Estimated Cost: ₹${captainDetails.estimatedCost}
OTP: ${captainDetails.otp}
ETA: ${captainDetails.eta}
    `.trim();

    try {
      await Share.open({
        message: shareMessage,
        title: 'My Ride Details',
      });
    } catch (error) {
      console.error('Failed to share ride details:', error);
    }
  };

  const handleNext = () => {
    // Navigate to Trip Completed page
    navigation.navigate('TripCompleted', {
      pickup: pickup,
      drop: drop,
      distance: '4.2 km',
      duration: '18 minutes',
      completedTime: '11:01:01 AM',
      driver: {
        name: 'Rajesh Kumar',
        rating: '4.8',
        vehicle: 'Honda Activa - KA 01 AB 1234',
      },
      fare: {
        baseFare: 27,
        distanceCharge: 14,
        timeCharge: 5,
        platformFee: 5,
        gst: 8,
        total: 58,
      },
      paymentMethod: 'Google Pay',
    });
  };

  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>[Map View]</Text>
        {isSearching && (
          <View style={styles.searchOverlay}>
            <ActivityIndicator size={50} color={Colors.black} />
            <Text style={styles.searchText}>Finding nearby captains...</Text>
          </View>
        )}
      </View>

      {/* Bottom Sheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
          <View style={styles.handle} />
          {isSearching ? (
            <View style={styles.searchContainer}>
              <Text style={styles.searchTitle}>Searching for Your Captain</Text>
              <Text style={styles.searchSubtitle}>
                Connecting you with the nearest available captain.
              </Text>
            </View>
          ) : (
            <View style={styles.captainContainer}>
              <Text style={styles.captainTitle}>Your Captain is Here!</Text>
              <View style={styles.captainCard}>
                <Feather name="user" size={40} color={Colors.black} style={styles.user} />
                <View style={styles.captainDetails}>
                  <View style={styles.captainInfoRow}>
                    <Text style={styles.captainName}>{captainDetails.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color={Colors.gold} />
                      <Text style={styles.ratingText}>{captainDetails.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.vehicleRow}>
                    <Image
                      source={
                        captainDetails.vehicleType.toLowerCase() === 'bike'
                          ? require('../../assets/bike.png')
                          : captainDetails.vehicleType.toLowerCase() === 'auto'
                          ? require('../../assets/auto.png')
                          : captainDetails.vehicleType.toLowerCase() === 'taxi'
                          ? require('../../assets/taxi.png')
                          :captainDetails.vehicleType.toLowerCase() === 'truck small'
                          ? require('../../assets/truck_s.png')
                          :captainDetails.vehicleType.toLowerCase() === 'truck large'
                          ? require('../../assets/truck_l.png')
                          : require('../../assets/taxi.png')
                      }
                      style={styles.vehicleIcon}
                    />
                    <Text style={styles.vehicleInfo}>
                      {captainDetails.vehicleType} • {captainDetails.vehicleNumber}
                    </Text>
                  </View>
                  <Text style={styles.eta}>Arriving in {captainDetails.eta}</Text>
                  <Text style={styles.otp}>OTP: {captainDetails.otp}</Text>
                </View>
              </View>

              <View style={styles.actionButtons} >
                <TouchableOpacity style={styles.actionButton} onPress={handleCallCaptain}>
                  <Feather name="phone" size={20} color={Colors.black} />
                  <Text style={styles.actionButtonText}>Call Captain</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleShareRide}>
                  <MaterialIcons name="share" size={20} color={Colors.black} />
                  <Text style={styles.actionButtonText}>Share Ride</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

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
                  {/* <View style={styles.routeRow}>
                    <Feather name="map" size={16} color={Colors.gray} />
                    <Text style={styles.routeLabel}>Distance: {captainDetails?.distance}</Text>
                  </View> */}
                  <View style={styles.routeRow}>
                    <Feather name="dollar-sign" size={16} color={Colors.gray} />
                    <Text style={styles.routeLabel}>Est. Cost: ₹{captainDetails?.estimatedCost}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
          
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: Colors.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '500',
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    marginTop: 16,
    fontSize: 18,
    color: Colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#d1d1d1',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  searchSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  captainContainer: {
    paddingVertical: 12,
  },
  captainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  captainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  user: {
    marginRight: 15,
  },
  captainDetails: {
    flex: 1,
  },
  captainInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  captainName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    marginLeft: 4,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  vehicleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
  vehicleInfo: {
    fontSize: 13,
    color: Colors.gray,
  },
  eta: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '500',
    marginTop: 6,
  },
  otp: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.black,
    marginTop: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
  tripSummary: {
    paddingHorizontal: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  routeInfo: {
    marginBottom: 12,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  routeLabel: {
    fontSize: 13,
    color: Colors.gray,
    marginLeft: 8,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: Colors.red,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#FFD700', // Matching the yellow from the design
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  nextText: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CaptainSearchScreen;