import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/colors';
const WalletScreen = () => {
  const handlePress = (label: string) => {
    console.log(`Pressed: ${label}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Section: Wallets */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallets</Text>

        {/* Rapido Wallet */}
        <View style={styles.walletCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="credit-card" size={20} color="#333" />
            <Text style={styles.walletTitle}>  Wallet</Text>
          </View>
          <View style={styles.walletRight}>
            <Text style={styles.balanceText}>₹120.00</Text>
            <TouchableOpacity
              onPress={() => handlePress('Add Money')}
              style={styles.addMoneyBtn}
            >
              <Text style={styles.addMoneyText}>+ Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AmazonPay */}
        <TouchableOpacity
          style={[styles.walletCard, { justifyContent: 'space-between' }]}
          onPress={() => handlePress('AmazonPay')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="zap" size={20} color="#333" />
            <Text style={styles.walletTitle}>  Amazon Pay</Text>
          </View>
          <Text style={styles.linkText}>LINK</Text>
        </TouchableOpacity>
      </View>

      {/* Section: Pay Later */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pay Later</Text>
        <View style={styles.payLaterCard}>
          <MaterialIcons name="qr-code-scanner" size={22} color="#333" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.payLaterTitle}>Pay at drop</Text>
            <Text style={styles.payLaterDesc}>
              Go cashless, after ride pay by scanning QR code
            </Text>
          </View>
        </View>
      </View>

      {/* Section: Others */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Others</Text>
        <TouchableOpacity
          style={styles.faqItem}
          onPress={() => handlePress('Cash')}
        >
          <Text style={styles.faqText}>Cash</Text>
          {/* <Icon name="chevron-right" size={20} color="#888" /> */}
        </TouchableOpacity>
      </View>

      {/* Show Passbook */}
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => handlePress('Cash')}
      >
        <Text style={styles.faqText}>Show Passbook</Text>
        <Icon name="chevron-right" size={20} color="#888" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
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
  walletCard: {
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation:2,
  },
  walletTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.darkGray,
  },
  walletRight: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  addMoneyBtn: {
    backgroundColor: Colors.blue,
    paddingVertical: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  addMoneyText: {
    color: Colors.white,
    fontSize: 12,
  },
  linkText: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 14,
  },
  payLaterCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation:2,
  },
  payLaterTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  payLaterDesc: {
    fontSize: 13,
    color: Colors.gray,
    maxWidth: '90%',
  },
  faqItem: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    elevation:2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqText: {
    fontSize: 15,
    color: '#333',
  },
  passbookBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  passbookText: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default WalletScreen;
