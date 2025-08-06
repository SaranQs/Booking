import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';
const initialPlaces = [
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
  const [favourites, setFavourites] = useState(initialPlaces);
  const [selected, setSelected] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editLabel, setEditLabel] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newType, setNewType] = useState<'home' | 'gym' | 'other'>('other');

  const handleEdit = (item: any) => {
    setSelected(item);
    setEditLabel(item.label);
    setEditAddress(item.address);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (toDeleteId) {
      setFavourites(prev => prev.filter(place => place.id !== toDeleteId));
    }
    setShowDeleteModal(false);
    setToDeleteId(null);
  };

  const handleAdd = () => {
    if (!newLabel || !newAddress) return;

    const newItem = {
      id: Date.now().toString(),
      label: newLabel,
      address: newAddress,
      type: newType,
    };

    setFavourites(prev => [...prev, newItem]);
    setAddModalVisible(false);
    setNewLabel('');
    setNewAddress('');
  };

  const handleUpdate = () => {
    if (!editLabel || !editAddress) return;

    setFavourites(prev =>
      prev.map(item =>
        item.id === selected.id
          ? { ...item, label: editLabel, address: editAddress }
          : item,
      ),
    );
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: (typeof favourites)[0] }) => (
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
        <TouchableOpacity onPress={() => handleEdit(item)}>
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
        data={favourites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Icon name="plus-circle" size={18} color="#fff" />
        <Text style={styles.addText}>Add More</Text>
      </TouchableOpacity>

      {/* Modal for editing favourite */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: '#888' }}>Map Placeholder</Text>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Favourite</Text>
              <TouchableOpacity>
                <Text style={styles.searchBtn}>Search</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Location Label"
              value={editLabel}
              onChangeText={setEditLabel}
              style={styles.input}
            />
            <TextInput
              placeholder="Address"
              value={editAddress}
              onChangeText={setEditAddress}
              style={styles.input}
              multiline
            />

            <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
              <Text style={styles.updateBtnText}>Update Favourite</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 16 }}
            >
              <Text style={{ textAlign: 'center', color: '#555' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        animationType="fade"
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.modalTitle}>Delete</Text>
            <Text style={{ color: '#555', marginVertical: 10 }}>
              Are you sure you want to delete this favourite?
            </Text>
            <View style={styles.rowBetween}>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text style={{ color: '#555' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={{ color: '#d00', fontWeight: '700' }}>
                  <Icon name="trash-2" size={18} color="#d00" style={styles.icon} />  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: '#888' }}>Map Placeholder</Text>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Favourite</Text>

            <TextInput
              placeholder="Location Label"
              value={newLabel}
              onChangeText={setNewLabel}
              style={styles.input}
            />
            <TextInput
              placeholder="Address"
              value={newAddress}
              onChangeText={setNewAddress}
              style={styles.input}
              multiline
            />

            <TouchableOpacity style={styles.updateBtn} onPress={handleAdd}>
              <Text style={styles.updateBtnText}>Add Favourite</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAddModalVisible(false)}
              style={{ marginTop: 16 }}
            >
              <Text style={{ textAlign: 'center', color: '#555' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    width: '80%',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  container: {
    padding: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  card: {
    backgroundColor: Colors.lightGray,
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
    color: Colors.gray,
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap:10,
  },
  icon: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: Colors.black,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  addText: {
    color: Colors.white,
    marginLeft: 8,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,

  },
  mapPlaceholder: {
    flex: 7,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 3,
    padding: 16,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  searchBtn: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    padding:6,
    borderRadius: 100,
    color: Colors.black,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  updateBtn: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateBtnText: {
    color: Colors.white,
    fontWeight: '700',
  },
});

export default FavouritesScreen;
