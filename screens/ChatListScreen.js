import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const chats = [
  { id: 1, name: "Ahmed Mohamed", product: "Makita Drill", lastMessage: "Is it available today?" },
  { id: 2, name: "Sara Ali", product: "Film Scanner", lastMessage: "Can I rent it for 2 days?" },
];

export default function ChatListScreen({ navigation }) {
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
        <Text style={styles.title}>Messages</Text>

        {chats.map((chat) => (
          <Pressable
            key={chat.id}
            style={styles.chatCard}
            onPress={() => navigation.navigate("Chat", { chat })}
          >
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>

            <View style={styles.chatInfo}>
              <Text style={styles.name}>{chat.name}</Text>
              <Text style={styles.product}>{chat.product}</Text>
              <Text style={styles.message}>{chat.lastMessage}</Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color={colors.deepPurple} />
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { paddingHorizontal: 18, paddingTop: 55, paddingBottom: 40 },
  title: { fontSize: 30, fontWeight: "800", color: colors.deepPurple, marginBottom: 22 },
  chatCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ff2d98",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  chatInfo: { flex: 1 },
  name: { fontSize: 17, fontWeight: "800", color: colors.deepPurple },
  product: { fontSize: 13, color: "#ff2d98", fontWeight: "700", marginTop: 3 },
  message: { fontSize: 13, color: "#6f6d8c", marginTop: 4 },
});