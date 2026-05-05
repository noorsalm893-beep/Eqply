import React, { useEffect } from "react";
import {
  View, Text, StyleSheet, Modal, ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function PaymentInProgressScreen() {
  const navigation = useNavigation();
  const { userToken } = useAuth();

  useEffect(() => {
    // API: GET /orders/payment-status - checks payment every 3 seconds
    const checkStatus = async () => {
      try {
        const response = await fetch(API.paymentStatus, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        if (data.status === "success") {
          navigation.replace("PaymentSuccess");
        } else if (data.status === "failed") {
          navigation.replace("PaymentFailed");
        }
      } catch (err) {
        console.log("Error checking payment status");
      }
    };

    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.screen}>
      <Modal transparent visible animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* No API - just showing loading */}
            <ActivityIndicator
              size="large"
              color={colors.deepPurple}
              style={{ marginBottom: 20 }}
            />
            <Text style={styles.title}>Payment in Progress</Text>
            <Text style={styles.subtitle}>
              Please wait while we process your payment...
            </Text>
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
    padding: 40, width: "100%", alignItems: "center",
  },
  title: {
    fontSize: 20, fontWeight: "700",
    color: colors.deepPurple, marginBottom: 8,
  },
  subtitle: {
    fontSize: 14, color: "#6b7280",
    textAlign: "center", lineHeight: 20,
  },
});