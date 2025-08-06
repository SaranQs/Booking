import React, { useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/colors';

const screenHeight = Dimensions.get('window').height;

interface WalletModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const WalletModalWrapper = ({ visible, onClose, children }: WalletModalProps) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [headerHeight, setHeaderHeight] = useState(50); // Default header height

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        // Only capture touches in the header area
        return gestureState.y0 < headerHeight;
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward drags
        return Math.abs(gestureState.dy) > 20 && gestureState.dy >= 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy >= 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: screenHeight,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY }] },
          ]}
        >
          <View
            style={styles.header}
            onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
            {...panResponder.panHandlers}
          >
            <View style={styles.handle} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#444" />
            </TouchableOpacity>
          </View>
          <ScrollView>
          {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default WalletModalWrapper;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Match ConfirmRideScreen
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16, // Match ConfirmRideScreen
    borderTopRightRadius: 16,
    height: screenHeight * 0.8, // Match ConfirmRideScreen
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc', // Match ConfirmRideScreen
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});