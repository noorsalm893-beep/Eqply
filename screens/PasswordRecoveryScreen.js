import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API } from '../constants/api';

export default function PasswordRecoveryScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('SMS');

  const handleNext = async () => {
    // API: POST /auth/send-otp
    const response = await fetch(API.sendOtp, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: selected }),
    });
    const data = await response.json();
    if (data) navigation.navigate('CodeEnter');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlob}>
        <View style={styles.purpleWave} />
        <View style={styles.tealDot} />
        <View style={styles.pinkDot} />
      </View>
      <View style={styles.content}>
        <View style={styles.avatar}><Text style={{ fontSize: 40 }}>👤</Text></View>
        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.subtitle}>How you would like to restore your password?</Text>
        <TouchableOpacity style={[styles.option, selected === 'SMS' && styles.optionSelected]} onPress={() => setSelected('SMS')}>
          <Text style={styles.optionText}>SMS</Text>
          {selected === 'SMS' && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option, selected === 'Email' && styles.optionSelected]} onPress={() => setSelected('Email')}>
          <Text style={styles.optionText}>Email</Text>
          {selected === 'Email' && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.btn} onPress={handleNext}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5ede8' },
  headerBlob: { position: 'absolute', top: 0, left: 0, right: 0, height: 230, overflow: 'hidden' },
  purpleWave: { position: 'absolute', top: -50, left: -30, right: -30, height: 240, backgroundColor: '#3b1fa3', borderBottomLeftRadius: 120, borderBottomRightRadius: 120 },
  tealDot: { position: 'absolute', top: -25, left: -25, width: 95, height: 95, borderRadius: 50, backgroundColor: '#00c4c4' },
  pinkDot: { position: 'absolute', top: 55, right: -25, width: 85, height: 85, borderRadius: 43, backgroundColor: '#f0156f' },
  content: { flex: 1, paddingTop: 255, paddingHorizontal: 28, paddingBottom: 44, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f5c0d0', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1a0a6b', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#1a0a6b', opacity: 0.7, textAlign: 'center', marginBottom: 32 },
  option: { width: '100%', padding: 16, borderRadius: 14, backgroundColor: '#ede8e3', marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionSelected: { backgroundColor: '#e0daf5' },
  optionText: { fontSize: 16, color: '#1a0a6b', fontWeight: '600' },
  check: { fontSize: 18, color: '#3b1fa3' },
  btn: { width: '100%', padding: 18, borderRadius: 50, backgroundColor: '#f0156f', alignItems: 'center', marginBottom: 16 },
  btnText: { color: 'white', fontSize: 17, fontWeight: '600' },
  cancel: { fontSize: 15, color: '#1a0a6b', opacity: 0.55, textAlign: 'center' },
});
