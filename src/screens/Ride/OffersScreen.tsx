import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';

const OffersScreen = () => {
  const [promoCode, setPromoCode] = useState('');
  const handlePress = (label: string) => {
    console.log(`Pressed: ${label}`);
    if (label === 'Apply Offer' && promoCode) {
      console.log(`Applying promo code: ${promoCode}`);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      pointerEvents="auto"
    >
      {/* Promo Code Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.promoInput}
          placeholder="Enter Promo Code"
          placeholderTextColor={Colors.gray}
          value={promoCode}
          onChangeText={setPromoCode}
          autoCapitalize="characters"
        />
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => handlePress('Apply Offer')}
          disabled={!promoCode}
        >
          <Text style={styles.applyButtonText}>Apply Offer</Text>
        </TouchableOpacity>
      </View>

      {/* Section: Available Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Offers</Text>

        {/* Offer 1 */}
        <TouchableOpacity
          style={styles.offerCard}
          onPress={() => handlePress('SAVE10')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="tag" size={20} color="#333" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.offerTitle}>SAVE10</Text>
              <Text style={styles.offerDesc}>Get 10% off up to ₹50 on your next ride</Text>
            </View>
          </View>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>

        {/* Offer 2 */}
        <TouchableOpacity
          style={styles.offerCard}
          onPress={() => handlePress('RIDE20')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="tag" size={20} color="#333" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.offerTitle}>RIDE20</Text>
              <Text style={styles.offerDesc}>₹20 off on rides above ₹100</Text>
            </View>
          </View>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Section: Expired Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expired Offers</Text>
        <View style={styles.offerCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="tag" size={20} color="#888" />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.offerTitle, { color: '#888' }]}>FIRST50</Text>
              <Text style={[styles.offerDesc, { color: '#888' }]}>
                50% off on your first ride (Expired)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    paddingBottom: 20, // Match WalletScreen
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  promoInput: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 10,
    fontSize: 14,
    color: Colors.black,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    opacity: 1, // Adjusted dynamically in disabled state
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  offerCard: {
    backgroundColor: Colors.lightGray,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
  },
  offerDesc: {
    fontSize: 13,
    color: Colors.gray,
    maxWidth: '80%',
  },
  applyText: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default OffersScreen;