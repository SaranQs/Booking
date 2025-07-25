import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PreferencesScreen = () => {
  const [prefs, setPrefs] = useState({
    emailPromos: false,
    emailInvoice: true,
    smsInvoice: true,
    smsOffers: false,
    whatsappUpdates: true,
    pushNotifications: true,
    pipAccess: false,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItem = (label: string, key: keyof typeof prefs) => (
    <TouchableOpacity key={key} style={styles.item} onPress={() => toggle(key)}>
      <Text style={styles.itemText}>{label}</Text>
      <View style={[styles.checkbox, prefs[key] && styles.checkboxChecked]}>
        {prefs[key] && <Icon name="check" size={16} color="#fff" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Section 1: Email */}
      <Text style={styles.sectionTitle}>Email</Text>
      {renderItem('Allow Emails for promotions and offers', 'emailPromos')}
      {renderItem('Allow Emails for invoice', 'emailInvoice')}

      {/* Section 2: SMS & Whatsapp */}
      <Text style={styles.sectionTitle}>SMS & Whatsapp</Text>
      {renderItem('Allow SMS for invoice', 'smsInvoice')}
      {renderItem('Allow promotional SMS offers', 'smsOffers')}
      {renderItem('Allow updates to be sent on Whatsapp', 'whatsappUpdates')}

      {/* Section 3: Push Notifications */}
      <Text style={styles.sectionTitle}>Push Notifications</Text>
      {renderItem('Allow mobile push notifications', 'pushNotifications')}

      {/* Section 4: Picture in Picture */}
      <Text style={styles.sectionTitle}>Picture in Picture (PIP)</Text>
      {renderItem('Allow picture in picture access', 'pipAccess')}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginTop: 24,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
});

export default PreferencesScreen;
