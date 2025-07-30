
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';

// Define interface for notification data
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isUrgent: boolean;
  isRead: boolean;
}

// Sample notification data
const notifications: Notification[] = [
  {
    id: '1',
    title: 'Ride Completed',
    message: 'Your ride from Downtown to Airport has been completed successfully.',
    date: 'Jul 30, 2025, 10:00 AM',
    isUrgent: false,
    isRead: false,
  },
  {
    id: '2',
    title: 'New Promotion',
    message: 'Get 20% off your next ride with code SUMMER25!',
    date: 'Jul 29, 2025, 2:30 PM',
    isUrgent: false,
    isRead: false,
  },
  {
    id: '3',
    title: 'Payment Issue',
    message: 'There was an issue processing your recent payment. Please update your payment method.',
    date: 'Jul 28, 2025, 9:15 AM',
    isUrgent: true,
    isRead: false,
  },
  {
    id: '4',
    title: 'App Update Available',
    message: 'A new version of the app is available. Update now for the latest features.',
    date: 'Jul 27, 2025, 4:20 PM',
    isUrgent: false,
    isRead: true,
  },
  {
    id: '5',
    title: 'Ride Scheduled',
    message: 'Your ride to Central Park is scheduled for tomorrow at 8:00 AM.',
    date: 'Jul 26, 2025, 11:00 AM',
    isUrgent: false,
    isRead: true,
  },
];

const NotificationsScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [notificationData, setNotificationData] = useState<Notification[]>(notifications);



  const handleOpenModal = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
    // Mark as read when opening the modal
    if (!notification.isRead) {
      setNotificationData(prev =>
        prev.map(item =>
          item.id === notification.id ? { ...item, isRead: true } : item,
        ),
      );
    }
  };

  const handleMarkAsRead = () => {
    if (selectedNotification && !selectedNotification.isRead) {
      setNotificationData(prev =>
        prev.map(item =>
          item.id === selectedNotification.id ? { ...item, isRead: true } : item,
        ),
      );
    //   showAlert('Notification marked as read');
    }
    setModalVisible(false);
  };

  const renderModalContent = () => {
    if (!selectedNotification) return null;
    return (
      <>
        <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
        <Text style={styles.modalMessage}>{selectedNotification.message}</Text>
        <Text style={styles.modalDate}>{selectedNotification.date}</Text>
        <TouchableOpacity
          style={styles.markAsReadButton}
          onPress={handleMarkAsRead}
          disabled={selectedNotification.isRead}
          accessibilityLabel={
            selectedNotification.isRead
              ? 'Notification already read'
              : 'Mark notification as read'
          }
          accessibilityHint={
            selectedNotification.isRead
              ? 'This notification has already been marked as read'
              : 'Tap to mark this notification as read'
          }
        >
          <Text
            style={[
              styles.saveText,
              selectedNotification.isRead && { opacity: 0.5 },
            ]}
          >
            {selectedNotification.isRead ? 'Already Read' : 'Mark as Read'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
          accessibilityLabel="Close notification modal"
          accessibilityHint="Tap to close the notification details"
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>Notifications</Text>
          </>
        }
        data={notificationData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            icon={item.isUrgent ? 'alert-triangle' : 'bell'}
            title={item.title}
            date={item.date}
            isRead={item.isRead}
            isUrgent={item.isUrgent}
            onPress={() => handleOpenModal(item)}
          />
        )}
        ListFooterComponent={<View style={{ height: 60 }} />}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
          accessibilityLabel="Close notification modal"
          accessibilityHint="Tap outside the modal to close it"
        >
          <View style={styles.modalContainer}>{renderModalContent()}</View>
        </TouchableOpacity>
        {/* Custom Alert ABOVE modal layer */}
       
      </Modal>
    </View>
  );
};

const NotificationItem = ({
  icon,
  title,
  date,
  isRead,
  isUrgent,
  onPress,
}: {
  icon: string;
  title: string;
  date: string;
  isRead: boolean;
  isUrgent: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.row, isUrgent && styles.urgentRow, !isRead && styles.unreadRow]}
    onPress={onPress}
    accessibilityLabel={`Notification: ${title}`}
    accessibilityHint="Tap to view notification details"
  >
    <Feather
      name={icon}
      size={20}
      color={isUrgent ? 'red' : Colors.black}
    />
    <View style={styles.notificationContent}>
      <Text style={[styles.title, !isRead && styles.unreadTitle]}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
    <View style={{ flex: 1 }} />
    <Feather name="chevron-right" size={16} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:5,
    paddingHorizontal:10,
    borderRadius:16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  urgentRow: {
    backgroundColor: Colors.lightRed,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  unreadRow: {
    backgroundColor: Colors.lightGray,
  },
  notificationContent: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.black,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  date: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 15,
    color: Colors.black,
    marginBottom: 12,
  },
  modalDate: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 16,
  },
  markAsReadButton: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  closeText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  absoluteAlert: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  customAlert: {
    backgroundColor: Colors.darkGray,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  alertText: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default NotificationsScreen;
