import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const faqs = [
  ["How renting works?", "Choose equipment, add it to cart, checkout, then track your order."],
  ["Can I sell my own tools?", "Yes. Switch to Sell Mode from Profile, then add your product."],
  ["How many products can students upload?", "Students can upload up to 5 products for free."],
  ["How do I contact support?", "Go to Contact Us and send your message."],
];

export default function HelpCenterScreen({ navigation }) {
  const { darkMode } = useAuth();
  return (
    <LinearGradient
colors={
darkMode
? ["#1A1625","#2A2338"]
: ["#d9c6e6","#f8f1f3"]
}
>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>
          <Text style={styles.title}>Help Center</Text>
        </View>

        {faqs.map(([q, a]) => (
          <View key={q} style={styles.card}>
            <Text style={styles.question}>{q}</Text>
            <Text style={styles.answer}>{a}</Text>
          </View>
        ))}

        <Pressable
          style={styles.contactButton}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <Text style={styles.contactText}>Contact Support</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { paddingHorizontal: 18, paddingTop: 50, paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 22 },
  backButton: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: "#ffffffcc",
    alignItems: "center", justifyContent: "center", marginRight: 12,
    borderWidth: 1, borderColor: "#eadbe0",
  },
  title: { fontSize: 28, fontWeight: "700", color: colors.deepPurple },
  card: {
    backgroundColor: "#fff", borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: "#eadbe0", marginBottom: 14,
  },
  question: { fontSize: 17, fontWeight: "800", color: colors.deepPurple, marginBottom: 8 },
  answer: { fontSize: 15, color: "#6f6d8c", lineHeight: 21 },
  contactButton: {
    backgroundColor: "#ff2d98", borderRadius: 16, paddingVertical: 16,
    alignItems: "center", marginTop: 10,
  },
  contactText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});