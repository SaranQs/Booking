import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';
const aboutItems = [
  { label: 'Privacy Policy', onPress: () => console.log('Privacy Policy') },
  { label: 'Terms and Conditions', onPress: () => console.log('Terms and Conditions') },
  { label: 'Join the Team', onPress: () => console.log('Join the Team') },
  { label: 'Blog', onPress: () => console.log('Blog') },
  { label: 'Software Licenses', onPress: () => console.log('Software Licenses') },
];

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About</Text>
      {aboutItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={item.onPress}
        >
          <Text style={styles.itemText}>{item.label}</Text>
          <Icon name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: Colors.black,
  },
  item: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    color: Colors.black,
  },
});

export default AboutScreen;
