import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PaymentFailedScreen() {
  const navigation = useNavigation();

  // No API here - just showing error and navigation
  return (
    <View style={styles.container}>
      <Modal transparent visible animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>!</Text>
            </View>
            <Text style={styles.title}>We couldn't proceed your payment</Text>
            <Text style={styles.subtitle}>Please, change your payment method or try again</Text>
            <View style={styles.btnRow}>
              
              <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.primaryText}>Try Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('PaymentMethods')}>
                <Text style={styles.secondaryText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f5ff' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  modal: { backgroundColor: 'white', borderRadius: 20, padding: 28, width: '85%', alignItems: 'center' },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fce8f0', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  icon: { fontSize: 28, color: '#f0156f', fontWeight: '700' },
  title: { fontSize: 18, fontWeight: '700', color: '#3b1fa3', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  btnRow: { flexDirection: 'row', gap: 12 },
  primaryBtn: { backgroundColor: '#3b1fa3', padding: 14, borderRadius: 12, flex: 1, alignItems: 'center' },
  primaryText: { color: 'white', fontWeight: '600' },
  secondaryBtn: { backgroundColor: '#888', padding: 14, borderRadius: 12, flex: 1, alignItems: 'center' },
  secondaryText: { color: 'white', fontWeight: '600' },
});

