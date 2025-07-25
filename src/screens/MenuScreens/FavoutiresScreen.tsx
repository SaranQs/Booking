import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const favouritePlaces = [
  {
    id: '1',
    type: 'home',
    label: 'Home',
    address: '123 Main Street, Chennai',
  },
  {
    id: '2',
    type: 'gym',
    label: 'Gym',
    address: '45 Fitness Blvd, Chennai',
  },
  {
    id: '3',
    type: 'other',
    label: 'Work',
    address: 'Tech Park, Taramani, Chennai',
  },
];

const FavouritesScreen = () => {
  const handleEdit = (id: string) => {
    console.log('Edit', id);
    // Future: navigate to edit form
  };

  const handleDelete = (id: string) => {
    console.log('Delete', id);
    // Future: remove from backend/local state
  };

  const renderItem = ({ item }: { item: typeof favouritePlaces[0] }) => (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Icon
          name={
            item.type === 'home'
              ? 'home'
              : item.type === 'gym'
              ? 'activity'
              : 'map-pin'
          }
          size={20}
          color="#000"
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Icon name="edit-3" size={18} color="#444" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="trash-2" size={18} color="#d00" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favouritePlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus-circle" size={18} color="#fff" />
        <Text style={styles.addText}>Add More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    color: '#666',
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  addText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default FavouritesScreen;
