import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Pressable,
  ScrollView, ActivityIndicator, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();
  const { userToken } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // API: GET /payment/cards - gets saved cards
    const getCards = async () => {
      try {
        const response = await fetch(API.cards, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setCards(data.cards || []);
      } catch (err) {
        console.log("Error fetching cards");
      }
    };
    getCards();
  }, []);

  const handleAddCard = async () => {
    setLoading(true);
    try {
      // API: POST /payment/add-card - adds a new card
      const response = await fetch(API.addCard, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCards(prev => [...prev, data.card]);
      }
    } catch (err) {
      console.log("Error adding card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {/* No API - goes back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Saved Cards</Text>

        {/* API: GET /payment/cards */}
        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.mastercard}>🔴🟡</Text>
              <Pressable><Text style={styles.settingsIcon}>⚙️</Text></Pressable>
            </View>
            <Text style={styles.cardNumber}>
              **** **** **** {card.last4 || "1579"}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardName}>{card.name || "CARD HOLDER"}</Text>
              <Text style={styles.cardExpiry}>{card.expiry || "12/26"}</Text>
            </View>
          </View>
        ))}

        {/* API: POST /payment/add-card */}
        <Pressable
          style={({ pressed }) => [styles.addCard, pressed && { opacity: 0.85 }]}
          onPress={handleAddCard}
          disabled={loading}>
          {loading
            ? <ActivityIndicator color={colors.deepPurple} />
            : <>
                <Text style={styles.addCardPlus}>+</Text>
                <Text style={styles.addCardText}>Add New Card</Text>
              </>}
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.deepPurple,
    padding: 16, paddingTop: 50,
    flexDirection: "row", alignItems: "center", gap: 14,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  backIcon: { fontSize: 20, color: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },
  scroll: { padding: 20 },
  sectionTitle: {
    fontSize: 16, fontWeight: "700",
    color: colors.deepPurple, marginBottom: 16,
  },
  card: {
    backgroundColor: colors.deepPurple,
    borderRadius: 20, padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: colors.deepPurple, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
  cardHeader: {
    flexDirection: "row", justifyContent: "space-between",
    marginBottom: 20,
  },
  mastercard: { fontSize: 28 },
  settingsIcon: { fontSize: 22 },
  cardNumber: {
    fontSize: 16, color: "#fff",
    letterSpacing: 3, marginBottom: 20, fontWeight: "600",
  },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardName: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)", fontWeight: "600",
  },
  cardExpiry: { fontSize: 13, color: "rgba(255,255,255,0.8)" },
  addCard: {
    borderWidth: 2, borderColor: colors.deepPurple,
    borderStyle: "dashed", borderRadius: 20,
    padding: 20, alignItems: "center",
    justifyContent: "center", height: 100,
  },
  addCardPlus: {
    fontSize: 32, color: colors.deepPurple, fontWeight: "300",
  },
  addCardText: {
    fontSize: 14, color: colors.deepPurple,
    fontWeight: "600", marginTop: 4,
  },
});