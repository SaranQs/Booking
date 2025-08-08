import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import Colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const RateRideScreen = ({ route, navigation }: any) => {
  const { driver} = route.params; //pickup, drop
  const [rating, setRating] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleRating = (stars: number) => {
    setRating(stars);
  };

  const handleTipSelect = (amount: number) => {
    setTip(amount);
  };

  const handleSubmit = () => {
    if (rating) {
      setIsSubmitted(true);
      // Simulate submission (in a real app, this would send data to a server)
      console.log('Rating:', rating, 'Tip:', tip, 'Feedback:', feedback);
    }
  };

  const renderRatingStars = () => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <View style={styles.ratingContainer}>
        {stars.map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Ionicons
              name={star <= (rating || 0) ? 'star' : 'star-outline'}
              size={24}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingText}>Very Good</Text>
      </View>
    );
  };

  const renderWhatDidYouLike = () => {
    const options = [
      { icon: 'shield-checkmark', label: 'Safe Driving' },
      { icon: 'car-sport', label: 'Clean Vehicle' },
      { icon: 'time', label: 'On Time' },
      { icon: 'people', label: 'Helpful' },
      { icon: 'briefcase', label: 'Professional' },
      { icon: 'thumbs-up', label: 'Good Service' },

    ];
    return (
      <View style={styles.likeContainer}>
        <Text style={styles.likeTitle}>What did you like?</Text>
        <View style={styles.likeOptions}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.likeOption}>
              <Ionicons name={option.icon} size={20} color={Colors.gray} />
              <Text style={styles.likeText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={60} color="#28A745" />
          <Text style={styles.successText}>Thank You!</Text>
          <Text style={styles.successSubText}>
            Your feedback has been submitted successfully
          </Text>
          {tip && <Text style={styles.successTip}>Tip of ₹{tip} sent to {driver.name}</Text>}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.headerText}>Rate Your Trip</Text>

      <View style={styles.driverContainer}>
        <Feather name="user" size={50} color={Colors.gray} />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverVehicle}>
            {driver.vehicle} - {driver.rating} ({driver.rating} rides)
          </Text>
        </View>
      </View>

      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>How was your trip?</Text>
        {renderRatingStars()}
        <Text style={styles.tapToRate}>Tap to rate</Text>
      </View>

      {renderWhatDidYouLike()}

      <View style={styles.tipContainer}>
        <Text style={styles.sectionTitle}>💖 Show your appreciation</Text>
        <Text style={styles.tipSubText}>
          Your driver went above and beyond. Consider adding a tip!
        </Text>
        <View style={styles.tipOptions}>
          {[10, 20, 30, 50].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[styles.tipButton, tip === amount && styles.selectedTip]}
              onPress={() => handleTipSelect(amount)}
            >
              <Text style={styles.tipText}>₹{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {tip && <Text style={styles.tipAdded}>₹{tip} tip will be added to your fare</Text>}
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.sectionTitle}>📝 Additional Feedback (Optional)</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Share your experience with other riders..."
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !rating && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!rating}
      >
        <Text style={styles.submitText}>
          {tip ? `Submit Rating & Send ₹${tip} Tip` : 'Submit Rating'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton} onPress={handleBack}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  backButtonTop: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '600',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  driverVehicle: {
    fontSize: 14,
    color: '#666666',
  },
  ratingSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 10,
  },
  tapToRate: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
  },
  likeContainer: {
    marginBottom: 20,
  },
  likeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  likeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  likeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '48%',
  },
  likeText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 5,
  },
  tipContainer: {
    backgroundColor: '#FFF0F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  tipSubText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  tipOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tipButton: {
    backgroundColor: '#E6E6FA',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  selectedTip: {
    backgroundColor: '#DDA0DD',
  },
  tipText: {
    fontSize: 16,
    color: '#000000',
  },
  tipAdded: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  feedbackContainer: {
    marginBottom: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#B0C4DE',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    marginBottom:30,
  },
  skipText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginTop: 10,
  },
  successSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
  },
  successTip: {
    fontSize: 14,
    color: '#28A745',
    marginTop: 10,
  },
});

export default RateRideScreen;