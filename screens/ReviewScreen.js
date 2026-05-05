import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Pressable, TextInput,
  ScrollView, ActivityIndicator, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function ReviewScreen() {
  const navigation = useNavigation();

  // API: GET /auth/profile - gets user name and image
  const { user, userToken } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // API: GET /cart - gets order items
    const getOrderItems = async () => {
      try {
        const response = await fetch(API.cart, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setItems(data.items || []);
      } catch (err) {
        console.log("Error fetching items");
      }
    };

    // API: GET /get-review - gets existing review if any
    const getReview = async () => {
      try {
        const response = await fetch(API.getReview, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        if (data) {
          setRating(data.rating || 0);
          setComment(data.comment || "");
        }
      } catch (err) {
        console.log("Error fetching review");
      }
    };

    getOrderItems();
    getReview();
  }, []);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    try {
      // API: POST /review - submits the review
      const response = await fetch(API.review, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          rating,
          comment,
          orderId: "92287157",
        }),
      });
      if (response.ok) {
        // No API - goes back after submitting
        navigation.goBack();
      }
    } catch (err) {
      console.log("Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView>

        {/* Header - API: GET /auth/profile */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 22 }}>👤</Text>
            </View>
            <View>
              <Text style={styles.helloText}>Hello!</Text>
              <Text style={styles.userName}>{user?.name || "Basmala"}</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>🛒</Text>
            <Text style={styles.icon}>☰</Text>
          </View>
        </View>

        {/* Shipping Address - No API */}
        <Pressable
          style={styles.addressCard}
          onPress={() => navigation.navigate("ShippingAddress")}>
          <View style={{ flex: 1 }}>
            <Text style={styles.addressTitle}>Shipping Address</Text>
            <Text style={styles.addressText}>Tap to view or edit your address</Text>
          </View>
          <Text style={styles.editIcon}>✏️</Text>
        </Pressable>

        {/* Items - API: GET /cart */}
        <Text style={styles.sectionHeader}>Items</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemImg}>
              <Text style={{ fontSize: 28 }}>🔧</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} EGP</Text>
            </View>
          </View>
        ))}

        {/* Review - API: GET /get-review + POST /review */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewSectionTitle}>Review</Text>
        </View>

        <View style={styles.reviewCard}>
          <View style={styles.reviewerRow}>
            <View style={styles.reviewerAvatar}>
              <Text style={{ fontSize: 20 }}>👤</Text>
            </View>
            <View>
              <Text style={styles.reviewerDesc}>Share your experience</Text>
              <Text style={styles.orderId}>Order #92287157</Text>
            </View>
          </View>

          {/* No API - just selecting stars */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <Text style={[styles.star, star <= rating && styles.starFilled]}>
                  ★
                </Text>
              </Pressable>
            ))}
          </View>

          {/* No API - just typing */}
          <TextInput
            style={styles.commentInput}
            placeholder="Your comment"
            placeholderTextColor="#9ca3af"
            multiline
            value={comment}
            onChangeText={setComment}
          />

          {/* API: POST /review */}
          <Pressable
            style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.9 }, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.submitText}>Say it!</Text>}
          </Pressable>
        </View>

      </ScrollView>

      {/* Bottom Nav - No API */}
      <View style={styles.bottomNav}>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.navIcon}>🛒</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Favorites")}>
          <Text style={styles.navIcon}>🤍</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navIcon}>🏠</Text>
        </Pressable>
        <Pressable><Text style={styles.navIcon}>☰</Text></Pressable>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.navIcon}>👤</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.lightLavender,
    padding: 16, paddingTop: 50,
    flexDirection: "row", alignItems: "center",
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.deepPurple,
    alignItems: "center", justifyContent: "center",
    marginRight: 10,
  },
  backIcon: { color: "#fff", fontSize: 18 },
  userInfo: {
    flex: 1, flexDirection: "row",
    alignItems: "center", gap: 10,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primaryPink,
    alignItems: "center", justifyContent: "center",
  },
  helloText: { fontSize: 12, color: colors.deepPurple, opacity: 0.7 },
  userName: { fontSize: 15, fontWeight: "700", color: colors.deepPurple },
  headerIcons: { flexDirection: "row", gap: 16 },
  icon: { fontSize: 22 },
  addressCard: {
    margin: 16, backgroundColor: "#fff",
    borderRadius: 14, padding: 14,
    flexDirection: "row", alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  addressTitle: {
    fontSize: 13, fontWeight: "700",
    color: colors.deepPurple, marginBottom: 4,
  },
  addressText: { fontSize: 12, color: "#6b7280" },
  editIcon: { fontSize: 18 },
  sectionHeader: {
    backgroundColor: colors.lightLavender,
    padding: 12, fontSize: 15,
    fontWeight: "700", color: colors.deepPurple,
  },
  itemRow: {
    flexDirection: "row", padding: 16,
    gap: 12, borderBottomWidth: 1,
    borderBottomColor: colors.lightLavender,
  },
  itemImg: {
    width: 80, height: 80,
    backgroundColor: colors.lightLavender,
    borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, color: "#6b7280", marginBottom: 4 },
  itemPrice: {
    fontSize: 15, fontWeight: "700",
    color: colors.deepPurple,
  },
  reviewSection: {
    backgroundColor: colors.deepPurple, padding: 14,
  },
  reviewSectionTitle: {
    fontSize: 18, fontWeight: "700", color: "#fff",
  },
  reviewCard: {
    margin: 16, backgroundColor: "#fff",
    borderRadius: 16, padding: 16,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  reviewerRow: {
    flexDirection: "row", gap: 12,
    marginBottom: 16, alignItems: "center",
  },
  reviewerAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.lightLavender,
    alignItems: "center", justifyContent: "center",
  },
  reviewerDesc: { fontSize: 13, color: "#6b7280" },
  orderId: {
    fontSize: 13, fontWeight: "700",
    color: colors.deepPurple, marginTop: 2,
  },
  starsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  star: { fontSize: 34, color: "#d1d5db" },
  starFilled: { color: "#FBBF24" },
  commentInput: {
    backgroundColor: colors.lightLavender,
    borderRadius: 12, padding: 14,
    fontSize: 14, color: "#111",
    minHeight: 100, textAlignVertical: "top",
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: colors.deepPurple,
    padding: 16, borderRadius: 12,
    alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: colors.deepPurple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  bottomNav: {
    flexDirection: "row", justifyContent: "space-around",
    padding: 14, backgroundColor: "#fff",
    borderTopWidth: 1, borderTopColor: colors.lightLavender,
  },
  navIcon: { fontSize: 22 },
});