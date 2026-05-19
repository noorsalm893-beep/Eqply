import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function OrderSuccessScreen({ navigation }) {
  const { darkMode } = useAuth();
  return (
    <LinearGradient
colors={
darkMode
? ["#1A1625","#2A2338"]
: ["#d9c6e6","#f8f1f3"]
}
>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={60} color="#fff" />
        </View>

        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>
          Your order has been confirmed successfully.
        </Text>

        <Pressable
          style={styles.trackButton}
          onPress={() =>
            navigation.reset({
            index:0,
            routes:[{name:"Home"}]
            })
            }
        >
          <Text style={styles.trackText}>Track Order</Text>
        </Pressable>

        <Pressable
          style={styles.homeButton}
          onPress={() => navigation.navigate("Tabs")}
        >
          <Text style={styles.buttonText}>Back To Home</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  iconCircle: {
    width: 115,
    height: 115,
    borderRadius: 58,
    backgroundColor: "#ff2d98",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6f6d8c",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 28,
  },
  trackButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  trackText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  homeButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  homeText: {
    color: colors.deepPurple,
    fontSize: 17,
    fontWeight: "700",
  },
});