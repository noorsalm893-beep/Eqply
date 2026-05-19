import React, { useState } from "react";
import {
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

export default function ChatScreen({ navigation, route }) {
  const chat = route?.params?.chat;
  const [message, setMessage] = useState("");
  const { darkMode } = useAuth();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, is this product available?", sender: "me" },
    { id: 2, text: "Yes, it is available.", sender: "other" },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, sender: "me" },
    ]);

    setMessage("");
  };

  return (
    <LinearGradient
colors={
darkMode
? ["#1A1625","#2A2338"]
: ["#d9c6e6","#f8f1f3"]
}
>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <View>
            <Text style={styles.name}>{chat?.name || "Publisher"}</Text>
            <Text style={styles.product}>{chat?.product || "Product chat"}</Text>
          </View>
        </View>

        <ScrollView style={styles.messagesBox}>
          {messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageBubble,
                item.sender === "me" ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "me" && styles.myMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            placeholderTextColor="#9ca3af"
            value={message}
            onChangeText={setMessage}
          />

          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, paddingBottom: 18 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#ffffffcc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  name: { fontSize: 22, fontWeight: "800", color: colors.deepPurple },
  product: { fontSize: 14, color: "#ff2d98", fontWeight: "700" },
  messagesBox: { flex: 1 },
  messageBubble: {
    maxWidth: "78%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: "#ff2d98",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: { color: colors.deepPurple, fontSize: 15 },
  myMessageText: { color: "#fff" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 8,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  input: { flex: 1, paddingHorizontal: 10, fontSize: 15 },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ff2d98",
    alignItems: "center",
    justifyContent: "center",
  },
});