import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, StyleSheet, Pressable, TextInput,
  FlatList, KeyboardAvoidingView, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function ChatScreen() {
  const navigation = useNavigation();

  // API: GET /auth/profile - gets current user
  const { user, userToken } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    // API: GET /messages - gets all messages
    const getMessages = async () => {
      try {
        const response = await fetch(API.messages, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.log("Error fetching messages");
      }
    };
    getMessages();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      text: message,
      sender: "me",
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage("");
    try {
      // API: POST /messages - sends a new message
      await fetch(API.messages, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ text: message }),
      });
    } catch (err) {
      console.log("Error sending message");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>

      {/* Header - API: GET /auth/profile */}
      <View style={styles.header}>
        {/* No API - goes back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 20 }}>👤</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Ali.</Text>
          <Text style={styles.online}>● Online</Text>
        </View>
        <Pressable style={styles.arrowBtn}>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      </View>

      {/* No API - just showing messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View style={[
            styles.bubble,
            item.sender === "me" ? styles.myBubble : styles.otherBubble,
          ]}>
            <Text style={[
              styles.bubbleText,
              item.sender === "me" && styles.myText,
            ]}>
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* API: POST /messages */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#a09ab0"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
        />
        <Pressable
          onPress={sendMessage}
          style={({ pressed }) => [styles.sendBtn, pressed && { opacity: 0.8 }]}>
          <Text style={styles.sendIcon}>➤</Text>
        </Pressable>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.deepPurple,
    padding: 16, paddingTop: 50,
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  backIcon: { fontSize: 20, color: "#fff" },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.lightLavender,
    alignItems: "center", justifyContent: "center",
  },
  name: { fontSize: 16, fontWeight: "700", color: "#fff" },
  online: { fontSize: 11, color: colors.teal },
  arrowBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  arrow: { color: "#fff", fontSize: 16 },
  messagesList: { padding: 16, gap: 8 },
  bubble: {
    maxWidth: "75%", padding: 12,
    borderRadius: 18, marginBottom: 4,
  },
  myBubble: {
    backgroundColor: colors.deepPurple,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  bubbleText: { fontSize: 15, color: colors.deepPurple },
  myText: { color: "#fff" },
  inputRow: {
    flexDirection: "row", padding: 12,
    backgroundColor: "#fff",
    alignItems: "center", gap: 10,
    borderTopWidth: 1, borderTopColor: colors.lightLavender,
  },
  input: {
    flex: 1, backgroundColor: colors.lightLavender,
    borderRadius: 24, paddingHorizontal: 16,
    paddingVertical: 10, fontSize: 15,
    color: colors.deepPurple,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primaryPink,
    alignItems: "center", justifyContent: "center",
  },
  sendIcon: { fontSize: 18, color: "#fff" },
});