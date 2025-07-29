import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import Colors from '../../constants/colors';
const ReferAndEarnScreen = () => {
  const referralCode = 'RAPIDO123';

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    ToastAndroid.show('Referral code copied!', ToastAndroid.SHORT);
  };
  const referNow = async () => {
    const message = `Hey! Use my referral code *${referralCode}* and get rewards on Rapido. Download now: https://yourappdownloadlink.com`;

    try {
      await Share.open({
        message,
      });
    } catch (error) {
      console.log('Share cancelled or failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>Earn up to ₹50</Text>
          <Text style={styles.bannerSubtitle}>per friend you invite</Text>
        </View>
        {/* <View style={styles.codeBox}> */}
        <TouchableOpacity style={styles.codeBox} onPress={copyToClipboard}>
          <Text style={styles.code}>{referralCode}</Text>
          <Feather name="copy" size={20} color="#000" />
        </TouchableOpacity>
        {/* </View> */}
      </View>

      {/* Invite Box */}
      <View style={styles.inviteBox}>
        <View style={styles.inviteLeft}>
          <Feather name="gift" size={22} color="#000" />
          <Text style={styles.inviteText}> Invite Friends to App</Text>
        </View>
        <TouchableOpacity>
        <Text style={styles.inviteBtn}>INVITE</Text>
        </TouchableOpacity>
      </View>

      {/* How it works */}
      <View style={styles.howItWorks}>
        <View style={styles.howHeader}>
          <Text style={styles.howTitle}>How it works?</Text>
          <TouchableOpacity>
            <Text style={styles.termsLink}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepsRow}>
          <View style={styles.step}>
            <Feather name="user-check" size={20} color="#333" />
            <Text style={styles.stepText}>Friend completes 1 ride</Text>
          </View>
          <Feather name="arrow-right" size={16} color="#666" />
          <View style={styles.earnBox}>
            <MaterialIcons name="monetization-on" size={20} color='#000' />
            <Text style={styles.earnText}>50</Text>
          </View>
        </View>
        <Text style={styles.note}>within 7 days of registration</Text>
      </View>
      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.findBtn}>
          <Text style={styles.findBtnText}>Find friends to refer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.referBtn} onPress={referNow}>
          <Text style={styles.referBtnText}>Refer now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, padding: 16, paddingTop: 60 },

  banner: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    elevation: 1,
  },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.black },
  bannerSubtitle: { fontSize: 14, color: Colors.gray },

  codeBox: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  code: {
    fontSize: 14,
    marginRight: 6,
    color: Colors.darkGray,
    fontWeight: 'bold',
  },

  inviteBox: {
    backgroundColor: Colors.paleYellow,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  elevation: 1,
  },
  inviteLeft: { flexDirection: 'row', alignItems: 'center' },
  inviteText: { color: Colors.black, fontSize: 16, marginLeft: 10 },
  inviteBtn: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: Colors.gold,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    elevation:1,
  },

  howItWorks: {
    marginTop: 40,
    backgroundColor: Colors.backgroundWhite,
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  howHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  howTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  termsLink: { fontSize: 12, color: Colors.gray },

  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  step: { flexDirection: 'row', alignItems: 'center' },
  stepText: { fontSize: 14, color: Colors.darkGray, marginLeft: 6 },

  earnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundWhite,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  earnText: { fontSize: 14, fontWeight: 'bold', marginLeft: 6},

  note: { fontSize: 12, color: '#888', marginTop: 6 },
  
  bottomButtons: {
  marginTop: 'auto',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 10,
  // marginTop: 40,
},
findBtn: {
  flex: 1,
  borderWidth: 1,
  borderColor: Colors.black,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
findBtnText: {
  color: Colors.black,
  fontWeight: 'bold',
},

referBtn: {
  flex: 1,
  backgroundColor: Colors.gold,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
referBtnText: {
  color: Colors.black,
  fontWeight: 'bold',
},

});

export default ReferAndEarnScreen;
