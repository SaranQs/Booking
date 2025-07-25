import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Profiles: undefined;
  // Add other screens as needed
};

const settingsData = [
  {
    title: 'General',
    data: ['Profile', 'Favourites', 'Preferences', 'App Shortcuts'],
  },
  {
    title: 'Others',
    data: ['About', 'Logout', 'Delete Account'],
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>>();

  const handleItemPress = (label: string) => {
    if (label === 'Profile') {
      (navigation as any).navigate('Profile');
    }
    if (label === 'Favourites') {
      (navigation as any).navigate('Favourites');
    }
    if (label === 'Preferences') {
      (navigation as any).navigate('Preferences');
    }
    else {
      console.log(`Pressed: ${label}`);
      // Handle other items if needed
    }
  };

  const renderSection = (section: typeof settingsData[0]) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.data.map((label) => (
        <TouchableOpacity
          key={label}
          style={styles.item}
          onPress={() => handleItemPress(label)}
        >
          <Text
            style={[
              styles.itemText,
              label === 'Delete Account' && styles.deleteText,
            ]}
          >
            {label}
          </Text>
          <Icon
            name="chevron-right"
            size={20}
            color={label === 'Delete Account' ? '#d00' : '#888'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {settingsData.map(renderSection)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  item: {
    backgroundColor: '#f9f9f9',
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
    color: '#333',
  },
  deleteText: {
    color: '#d00',
    fontWeight: '600',
  },
});

export default SettingsScreen;
