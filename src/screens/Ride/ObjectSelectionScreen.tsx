import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  // Dimensions,
} from 'react-native';
import Colors from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';

const ObjectSelectionScreen = ({ route, navigation }: any) => {
  const { pickup, drop, selectedMode } = route.params;

  const [items, setItems] = useState([
    { id: '1', name: 'Documents', quantity: 0 },
    { id: '2', name: 'Electronics', quantity: 0 },
    { id: '3', name: 'Clothing', quantity: 0 },
    { id: '4', name: 'Furniture', quantity: 0 },
    { id: '5', name: 'Fragile Items', quantity: 0 },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const handleConfirm = () => {
    const selectedItems = items.filter(item => item.quantity > 0);
    if (selectedItems.length === 0) {
      Alert.alert('Please select at least one item.');
      return;
    }
    navigation.navigate('CaptainSearch', {
      pickup,
      drop,
      selectedMode,
      items: selectedItems,
    });
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, -1)}
          disabled={item.quantity === 0}
        >
          <Feather
            name="minus"
            size={20}
            color={item.quantity === 0 ? '#ccc' : Colors.black}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Feather name="plus" size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Items to Send</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  listContainer: {
    paddingBottom: 80,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginHorizontal: 12,
  },
  confirmButton: {
    backgroundColor: Colors.blue,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  confirmText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ObjectSelectionScreen;
