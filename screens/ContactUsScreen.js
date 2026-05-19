import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function ContactUsScreen({ navigation }) {
  const [message, setMessage] = useState("");
  const { darkMode } = useAuth();

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert("Missing message", "Please write your message first.");
      return;
    }

    setMessage("");
    navigation.goBack();
  };

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
          <Text style={styles.title}>Contact Us</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Need help?</Text>
          <Text style={styles.text}>Send us your issue and Eqply support will help you.</Text>

          <TextInput
            style={styles.input}
            placeholder="Write your message..."
            placeholderTextColor="#9ca3af"
            multiline
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>Send Message</Text>
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Email: support@eqply.com</Text>
          <Text style={styles.infoText}>Phone: +20 100 000 0000</Text>
        </View>
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
    backgroundColor: "#fff", borderRadius: 20, padding: 18,
    borderWidth: 1, borderColor: "#eadbe0", marginBottom: 16,
  },
  cardTitle: { fontSize: 21, fontWeight: "800", color: colors.deepPurple, marginBottom: 8 },
  text: { fontSize: 15, color: "#6f6d8c", lineHeight: 21, marginBottom: 14 },
  input: {
    backgroundColor: "#f7eff2", borderRadius: 14, padding: 14,
    height: 130, fontSize: 15, color: "#111", marginBottom: 16,
  },
  sendButton: {
    backgroundColor: "#ff2d98", borderRadius: 16, paddingVertical: 15,
    alignItems: "center",
  },
  sendText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  infoCard: {
    backgroundColor: "#fff", borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: "#eadbe0",
  },
  infoText: { color: colors.deepPurple, fontSize: 15, fontWeight: "700", marginBottom: 8 },
});