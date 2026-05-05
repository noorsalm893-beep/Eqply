import React from "react";
import {
  View, Text, StyleSheet, Pressable, Modal, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();

  // No API here - just showing success
  return (
    <View style={styles.screen}>
      <Modal transparent visible animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>✓</Text>
            </View>
            <Text style={styles.title}>Payment Successful!</Text>
            <Text style={styles.subtitle}>
              Your order has been placed successfully.
              You will receive a confirmation shortly.
            </Text>
            {/* No API - goes to Home */}
            <Pressable
              style={({ pressed }) => [styles.btn, pressed && { opacity: 0.9 }]}
              onPress={() => navigation.navigate("Home")}>
              <Text style={styles.btnText}>Track My Order</Text>
            </Pressable>
            {/* No API - goes to Home */}
            <Pressable
              onPress={() => navigation.navigate("Home")}
              style={{ marginTop: 12 }}>
              <Text style={styles.skip}>Back to Home</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  overlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center", justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 32, width: "100%", alignItems: "center",
  },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.deepPurple,
    alignItems: "center", justifyContent: "center",
    marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: colors.deepPurple, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
  icon: { fontSize: 36, color: "#fff", fontWeight: "700" },
  title: {
    fontSize: 22, fontWeight: "700",
    color: colors.deepPurple, marginBottom: 8,
  },
  subtitle: {
    fontSize: 14, color: "#6b7280",
    textAlign: "center", marginBottom: 28, lineHeight: 20,
  },
  btn: {
    backgroundColor: colors.deepPurple,
    padding: 18, borderRadius: 14,
    width: "100%", alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: colors.deepPurple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  skip: {
    fontSize: 14, color: colors.deepPurple,
    opacity: 0.6, fontWeight: "600",
  },
});