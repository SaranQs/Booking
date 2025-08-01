import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  // Image,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { ScratchCard } from 'rn-scratch-card';
import Colors from '../../constants/colors';

// Define interfaces for data structures
interface RewardHistory {
  id: string;
  description: string;
  points: string;
  date: string;
}

// interface ScratchCardItem {
//   id: string;
//   reward: string;
// }

// Data for reward history
const rewardHistory: RewardHistory[] = [
  {
    id: '1',
    description: 'Referral Bonus',
    points: '+ 50',
    date: 'Jul 25, 2025',
  },
  {
    id: '2',
    description: 'Ride Completed',
    points: '+ 20',
    date: 'Jul 20, 2025',
  },
  {
    id: '3',
    description: 'Redeemed Coupon',
    points: '- 30',
    date: 'Jul 18, 2025',
  },
  {
    id: '4',
    description: 'Scratch Card Win',
    points: '+ 10',
    date: 'Jul 16, 2025',
  },
  {
    id: '5',
    description: 'Ride Completed',
    points: '+ 15',
    date: 'Jul 15, 2025',
  },
  {
    id: '6',
    description: 'Referral Bonus',
    points: '+ 50',
    date: 'Jul 10, 2025',
  },
  {
    id: '7',
    description: 'Redeemed Coupon',
    points: '- 20',
    date: 'Jul 08, 2025',
  },
  {
    id: '8',
    description: 'Scratch Card Win',
    points: '+ 5',
    date: 'Jul 05, 2025',
  },
  {
    id: '9',
    description: 'Ride Completed',
    points: '+ 25',
    date: 'Jul 03, 2025',
  },
  {
    id: '10',
    description: 'Referral Bonus',
    points: '+ 50',
    date: 'Jul 01, 2025',
  },
  {
    id: '11',
    description: 'Redeemed Coupon',
    points: '- 40',
    date: 'Jun 28, 2025',
  },
  {
    id: '12',
    description: 'Scratch Card Win',
    points: '+ 20',
    date: 'Jun 25, 2025',
  },
  {
    id: '13',
    description: 'Ride Completed',
    points: '+ 30',
    date: 'Jun 22, 2025',
  },
];

// Data for scratch cards
// const scratchCards: ScratchCardItem[] = [
//   { id: 'sc1', reward: '₹10' },
//   { id: 'sc2', reward: 'Better luck next time' },
  // { id: 'sc3', reward: 'Better luck next time' },
  // { id: 'sc4', reward: 'Better luck next time' },
  // { id: 'sc5', reward: 'Better luck next time' },
  // { id: 'sc6', reward: 'Better luck next time' },
  // { id: 'sc7', reward: 'Better luck next time' },
  // { id: 'sc8', reward: 'Better luck next time' },
  // { id: 'sc9', reward: 'Better luck next time' },
  // { id: 'sc10', reward: 'Better luck next time' },
  // { id: 'sc11', reward: 'Better luck next time' },
  // { id: 'sc12', reward: 'Better luck next time' },
  // { id: 'sc13', reward: 'Better luck next time' },
  // { id: 'sc14', reward: 'Better luck next time' },
// ];

const MyRewardsScreen: React.FC = () => {
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);
  // const [scratched, setScratched] = useState<{ [key: string]: boolean }>({});
  // const [selectedCard, setSelectedCard] = useState<ScratchCardItem | null>(
  //   null,
  // );

  // const handleScratch = (id: string, scratchPercentage: number): void => {
  //   if (scratchPercentage >= 50) {
  //     // Reveal when 50% scratched
  //     setScratched(prev => ({ ...prev, [id]: true }));
  //   }
  // };

  // const handleCardPress = (item: ScratchCardItem): void => {
  //   setSelectedCard(item);
  // };

  // const closeScratchModal = (): void => {
  //   setSelectedCard(null);
  // };

  // const cardWidth = (Dimensions.get('window').width - 48) / 2;
  // const modalCardWidth = Dimensions.get('window').width * 0.8; // 80% of screen width for modal card

  return (
    <View style={styles.container}>
      {/* Total Points Section */}
      <View style={styles.pointsCard}>
        <Text style={styles.pointsTitle}>Total Reward Points</Text>
        <Text style={styles.pointsValue}>140</Text>
        <TouchableOpacity
          style={styles.redeemButton}
          accessibilityLabel="Redeem reward points"
        >
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>

      {/* Refer & Earn */}
      <TouchableOpacity
        style={styles.referCard}
        accessibilityLabel="Refer friends to earn rewards"
      >
        <MaterialIcons name="group" size={28} color={Colors.black} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.referTitle}>Refer & Earn</Text>
          <Text style={styles.referSubtitle}>
            Invite friends and earn rewards
          </Text>
        </View>
      </TouchableOpacity>

      {/* Scratch Cards Section */}
      {/* <Text style={styles.sectionTitle}>Scratch & Win</Text>
      <FlatList<ScratchCardItem>
        data={scratchCards}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.scratchContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => {
  const isScratched = scratched[item.id];

  return (
    <TouchableOpacity
  onPress={() => handleCardPress(item)}
  activeOpacity={0.8}
  style={[styles.cardWrapper, { width: cardWidth }]}
>
  <View
    style={[
      styles.rewardBackground,
      { width: cardWidth, height: cardWidth / 1.4 },
    ]}
  >
    <Text style={styles.revealedReward}>
      {isScratched ? item.reward : 'Tap to Scratch'}
    </Text>
  </View>

  {!isScratched && (
    <Image
      source={require('../../assets/scratch_placeholder.png')}
      style={[
        styles.scratchCard,
        { width: cardWidth, height: cardWidth / 1.4 },
      ]}
      resizeMode="cover"
    />
  )}
</TouchableOpacity>

  );
}}

      /> */}
      <TouchableOpacity
        style={styles.showHistoryBtn}
        onPress={() => setHistoryVisible(true)}
        accessibilityLabel="View rewards history"
      >
        <Text style={styles.showHistoryText}>View Rewards History</Text>
      </TouchableOpacity>

      {/* Scratch Card Modal */}
      {/* <Modal
        visible={selectedCard !== null}
        animationType="fade"
        transparent
        onRequestClose={closeScratchModal}
      >
        <View style={styles.scratchModalBackdrop}>
          <View style={styles.scratchModal}>
            {selectedCard && (
              <>
                <View
                  style={{
                    width: modalCardWidth,
                    height: modalCardWidth / 1.4,
                  }}
                >
                  <View style={styles.rewardBackground}>
                    <Text style={styles.revealedReward}>
                      {scratched[selectedCard.id] ? selectedCard.reward : ''}
                    </Text>
                  </View>
                  {!scratched[selectedCard.id] && (
                    <ScratchCard
                      source={require('../../assets/scratch_placeholder.png')}
                      brushWidth={50}
                      onScratch={(scratchPercentage: number) =>
                        handleScratch(selectedCard.id, scratchPercentage)
                      }
                      style={[
                        styles.scratchCard,
                        { width: modalCardWidth, height: modalCardWidth / 1.4 },
                      ]}
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={styles.closeModalBtn}
                  onPress={closeScratchModal}
                  accessibilityLabel="Close scratch card"
                >
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal> */}

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
            <FlatList<RewardHistory>
              data={rewardHistory}
              keyExtractor={item => item.id}
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
                      <Text style={styles.rewardDescription}>
                        {item.description}
                      </Text>
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
              accessibilityLabel="Close rewards history"
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    paddingTop: 60,
  },
  pointsCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsTitle: {
    fontSize: 16,
    color: Colors.black,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
    color: Colors.black,
  },
  redeemButton: {
    backgroundColor: Colors.black,
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
  },
  redeemText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  referCard: {
    backgroundColor: Colors.lightYellow,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  referTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  referSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.black,
  },
  scratchContainer: {
    paddingBottom: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  scratchCard: {
    aspectRatio: 1.4,
    height:130,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3,
  },
  revealedReward: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.black,
    position: 'absolute',
    alignSelf: 'center',
  },
  showHistoryBtn: {
    backgroundColor: Colors.black,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  showHistoryText: {
    color: Colors.white,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  historyModal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get('window').height * 0.6,
    padding: 16,
  },
  scratchModalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scratchModal: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
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
  rewardDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.black,
  },
  rewardDate: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 2,
  },
  rewardPoints: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeModalBtn: {
    marginTop: 10,
    padding: 12,
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeModalText: {
    color: Colors.white,
    fontWeight: '600',
  },
  rewardBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.lightGray,
  borderRadius: 12,
  zIndex: 0,
},

});

export default MyRewardsScreen;