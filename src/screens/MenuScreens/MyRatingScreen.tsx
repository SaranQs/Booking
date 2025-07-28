import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Dummy data: Ratings given by drivers to the user
const ratingsData = [
  {
    id: '1',
    title: 'Trip from Office to Home',
    date: 'July 21, 2025',
    rating: 5,
    comment: 'Polite and punctual customer.',
  },
  {
    id: '2',
    title: 'Morning Ride to Gym',
    date: 'July 18, 2025',
    rating: 4,
    comment: 'Smooth ride. Good communication.',
  },
];

const MyRatingScreen = () => {
  const renderRatingItem = ({ item }: any) => (
    <View style={styles.ratingItem}>
      <View style={styles.ratingHeader}>
        <Text style={styles.rideTitle}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            name="star"
            size={18}
            color={i < item.rating ? '#f5a623' : '#ccc'}
          />
        ))}
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Feedback</Text>

      <View style={styles.overallBox}>
        <Text style={styles.ratingValue}>4.8</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size={24}
              color={i < Math.floor(4.8) ? '#f5a623' : '#ccc'}
            />
          ))}
        </View>
        <Text style={styles.ratingLabel}>Your Overall Rating</Text>
      </View>

      <Text style={styles.subTitle}>What drivers say about you</Text>

      <FlatList
        data={ratingsData}
        renderItem={renderRatingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  overallBox: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f5a623',
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  ratingLabel: {
    fontSize: 16,
    color: '#666',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  ratingItem: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 13,
    color: '#888',
  },
  comment: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
});

export default MyRatingScreen;
