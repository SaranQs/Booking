import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Animated,
  Easing,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/colors';

const rewardHistory = [
    { id: '1', description: 'Referral Bonus', points: '+ 50', date: 'Jul 25, 2025' },
    { id: '2', description: 'Ride Completed', points: '+ 20', date: 'Jul 20, 2025' },
    { id: '3', description: 'Redeemed Coupon', points: '- 30', date: 'Jul 18, 2025' },
    { id: '4', description: 'Scratch Card Win', points: '+ 10', date: 'Jul 16, 2025' },
    { id: '5', description: 'Ride Completed', points: '+ 15', date: 'Jul 15, 2025' },
    { id: '6', description: 'Referral Bonus', points: '+ 50', date: 'Jul 10, 2025' },
    { id: '7', description: 'Redeemed Coupon', points: '- 20', date: 'Jul 08, 2025' },
    { id: '8', description: 'Scratch Card Win', points: '+ 5', date: 'Jul 05, 2025' },
    { id: '9', description: 'Ride Completed', points: '+ 25', date: 'Jul 03, 2025' },
    { id: '10', description: 'Referral Bonus', points: '+ 50', date: 'Jul 01, 2025' },
    { id: '11', description: 'Redeemed Coupon', points: '- 40', date: 'Jun 28, 2025' },
    { id: '12', description: 'Scratch Card Win', points: '+ 20', date: 'Jun 25, 2025' },
    { id: '13', description: 'Ride Completed', points: '+ 30', date: 'Jun 22, 2025' },
];

const scratchCards = [
    { id: 'sc1', reward: '₹10' },
    { id: 'sc2', reward: 'Better luck next time' },
    { id: 'sc3', reward: 'Better luck next time' },
    { id: 'sc4', reward: 'Better luck next time' },
    { id: 'sc5', reward: 'Better luck next time' },
    { id: 'sc6', reward: 'Better luck next time' },
    { id: 'sc7', reward: 'Better luck next time' },
    { id: 'sc8', reward: 'Better luck next time' },
    { id: 'sc9', reward: 'Better luck next time' },
    { id: 'sc10', reward: 'Better luck next time' },
    { id: 'sc11', reward: 'Better luck next time' },
    { id: 'sc12', reward: 'Better luck next time' },
    { id: 'sc13', reward: 'Better luck next time' },
    { id: 'sc14', reward: 'Better luck next time' },
];

const MyRewardsScreen = () => {
  const [historyVisible, setHistoryVisible] = useState(false);
  const [scratched, setScratched] = useState<{ [id: string]: boolean }>({});
  const [animations] = useState(
    scratchCards.reduce((acc, card) => {
      acc[card.id] = new Animated.Value(1);
      return acc;
    }, {} as { [id: string]: Animated.Value })
  );

  const handleScratch = (id: string) => {
    Animated.timing(animations[id], {
      toValue: 0,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setScratched((prev) => ({ ...prev, [id]: true }));
    });
  };

//   const renderScratchCard = ({ item }: any) => (
//     <TouchableOpacity
//       onPress={() => handleScratch(item.id)}
//       style={styles.scratchCard}
//       activeOpacity={0.9}
//     >
//       <Animated.View style={[styles.scratchOverlay, { opacity: animations[item.id] }]}>
//         <Image
//           source={require('../../assets/scratch_placeholder.png')}
//           style={styles.scratchImage}
//         />
//       </Animated.View>
//       {scratched[item.id] && (
//         <Text style={styles.revealedReward}>{item.reward}</Text>
//       )}
//     </TouchableOpacity>
//   );

  return (
    <View style={styles.container}>
      {/* Total Points Section */}
      <View style={styles.pointsCard}>
        <Text style={styles.pointsTitle}>Total Reward Points</Text>
        <Text style={styles.pointsValue}>140</Text>
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>

      {/* Refer & Earn */}
      <TouchableOpacity style={styles.referCard}>
        <MaterialIcons name="group" size={28} color={Colors.black} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.referTitle}>Refer & Earn</Text>
          <Text style={styles.referSubtitle}>Invite friends and earn rewards</Text>
        </View>
      </TouchableOpacity>

      {/* Scratch Cards Title */}
{/* Scratch Cards Section */}
<Text style={styles.sectionTitle}>Scratch & Win</Text>
<FlatList
  data={scratchCards}
  keyExtractor={(item) => item.id}
  numColumns={2}
  contentContainerStyle={styles.scratchContainer}
  columnWrapperStyle={{ justifyContent: 'space-between' }}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => handleScratch(item.id)}
      style={styles.scratchCard}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.scratchOverlay, { opacity: animations[item.id] }]}>
        <Image
          source={require('../../assets/scratch_placeholder.png')}
          style={styles.scratchImage}
        />
      </Animated.View>
      {scratched[item.id] && (
        <Text style={styles.revealedReward}>{item.reward}</Text>
      )}
    </TouchableOpacity>
  )}
/>
<TouchableOpacity style={styles.showHistoryBtn} onPress={() => setHistoryVisible(true)}>
  <Text style={styles.showHistoryText}>View Rewards History</Text>
</TouchableOpacity>

      {/* History Modal */}
      <Modal
        visible={historyVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setHistoryVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.historyModal}>
            <Text style={styles.modalTitle}>Recent Activity</Text>
            <FlatList
              data={rewardHistory}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isPositive = item.points.trim().startsWith('+');
                return (
                  <View
                    style={[
                      styles.rewardItem,
                      { backgroundColor: isPositive ? '#e6ffed' : '#ffe6e6' },
                    ]}
                  >
                    <View>
                      <Text style={styles.rewardDescription}>{item.description}</Text>
                      <Text style={styles.rewardDate}>{item.date}</Text>
                    </View>
                    <Text
                      style={[
                        styles.rewardPoints,
                        { color: isPositive ? 'green' : 'red' },
                      ]}
                    >
                      {item.points}
                    </Text>
                  </View>
                );
              }}
            />
            <TouchableOpacity
              onPress={() => setHistoryVisible(false)}
              style={styles.closeModalBtn}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// const cardWidth = (Dimensions.get('window').width - 48) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, padding: 16, paddingTop: 60 },
  pointsCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsTitle: { fontSize: 16, color: Colors.black },
  pointsValue: { fontSize: 36, fontWeight: 'bold', marginVertical: 8, color: Colors.black },
  redeemButton: {
    backgroundColor: Colors.black,
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
  },
  redeemText: { color: Colors.white, fontWeight: 'bold', fontSize: 14 },
  referCard: {
    backgroundColor: Colors.lightYellow,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  referTitle: { fontSize: 16, fontWeight: '600', color: Colors.black },
  referSubtitle: { fontSize: 14, color: Colors.gray, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: Colors.black },
scratchContainer: {
  paddingBottom: 16,
},
scratchCard: {
  width: '48%',
  aspectRatio: 1.4,
  backgroundColor: Colors.gold,
  borderRadius: 12,
  marginBottom: 12,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  elevation: 3,
},

  scratchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scratchImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  revealedReward: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.black,
  },

  showHistoryBtn: {
    backgroundColor: Colors.black,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:10,
  },
  showHistoryText: { color: Colors.white, fontWeight: '600' },

  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  historyModal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 10,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  rewardDescription: { fontSize: 15, fontWeight: '500', color: Colors.black },
  rewardDate: { fontSize: 13, color: Colors.gray, marginTop: 2 },
  rewardPoints: { fontSize: 16, fontWeight: '600' },

  closeModalBtn: {
    marginTop: 10,
    padding: 12,
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeModalText: { color: Colors.white, fontWeight: '600' },
});

export default MyRewardsScreen;
