import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Pressable,
  ScrollView, ActivityIndicator, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function CartScreen() {
  const navigation = useNavigation();

  // API: GET /auth/profile - gets user name
  const { user, userToken } = useAuth();
  const [items, setItems] = useState([]);
  const [shippingType, setShippingType] = useState("standard");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // API: GET /cart - gets cart items
    const getCart = async () => {
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
        console.log("Error fetching cart");
      }
    };
    getCart();
  }, []);

  const updateQty = async (id, delta) => {
    // API: PUT /cart/:itemId - updates item quantity
    const item = items.find(i => i.id === id);
    const newQty = Math.max(1, item.qty + delta);
    setItems(items.map(i => i.id === id ? { ...i, qty: newQty } : i));
    try {
      await fetch(`${API.cart}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      });
    } catch (err) {
      console.log("Error updating cart");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // API: POST /orders/checkout - places the order
      const response = await fetch(API.checkout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ items, shippingType }),
      });
      if (response.ok) {
        navigation.navigate("PaymentInProgress");
      }
    } catch (err) {
      console.log("Error during checkout");
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = shippingType === "express" ? 600 : 0;

  return (
    <View style={styles.screen}>

      {/* Header - API: GET /auth/profile */}
      <View style={styles.header}>
        {/* No API - goes back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 22 }}>👤</Text>
          </View>
          <View>
            <Text style={styles.helloText}>Hello!</Text>
            <Text style={styles.userName}>
              {user?.name || "Basmala"}
            </Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Pressable onPress={() => navigation.navigate("Cart")}>
            <Text style={styles.icon}>🛒</Text>
          </Pressable>
          <Pressable><Text style={styles.icon}>☰</Text></Pressable>
        </View>
      </View>

      <ScrollView>

        {/* Shipping Address - No API - shows saved address */}
        <Pressable
          style={styles.addressCard}
          onPress={() => navigation.navigate("ShippingAddress")}>
          <View style={{ flex: 1 }}>
            <Text style={styles.addressTitle}>Shipping Address</Text>
            <Text style={styles.addressText}>
              Tap to add or edit your address
            </Text>
          </View>
          <Text style={styles.editIcon}>✏️</Text>
        </Pressable>

        {/* Items - API: GET /cart */}
        <Text style={styles.sectionHeader}>Items</Text>
        {items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemImg}>
              <Text style={{ fontSize: 28 }}>🔧</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} EGP</Text>
              <View style={styles.qtyRow}>
                {/* API: PUT /cart/:itemId */}
                <Pressable
                  onPress={() => updateQty(item.id, -1)}
                  style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </Pressable>
                <Text style={styles.qty}>{item.qty}</Text>
                {/* API: PUT /cart/:itemId */}
                <Pressable
                  onPress={() => updateQty(item.id, 1)}
                  style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        {/* Shipping Options - No API */}
        <Text style={styles.sectionHeader}>Shipping Options</Text>
        <Pressable
          style={[styles.shippingOption, shippingType === "standard" && styles.shippingSelected]}
          onPress={() => setShippingType("standard")}>
          <Text style={styles.shippingText}>Standard  5-7 days</Text>
          <Text style={styles.shippingPrice}>FREE</Text>
        </Pressable>
        <Pressable
          style={[styles.shippingOption, shippingType === "express" && styles.shippingSelected]}
          onPress={() => setShippingType("express")}>
          <Text style={styles.shippingText}>Express  1-2 days</Text>
          <Text style={styles.shippingPrice}>600 EGP</Text>
        </Pressable>

        {/* Payment Method - No API */}
        <Text style={styles.sectionHeader}>Payment Method</Text>
        <Pressable
          style={styles.paymentRow}
          onPress={() => navigation.navigate("PaymentMethods")}>
          <Text style={styles.paymentText}>💳 Card</Text>
          <Text style={styles.editIcon}>✏️</Text>
        </Pressable>

        {/* Total & Checkout - API: POST /orders/checkout */}
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>{total + shipping} EGP</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.checkoutBtn, pressed && { opacity: 0.9 }]}
            onPress={handleCheckout}
            disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.checkoutText}>Checkout</Text>}
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
  backIcon: { fontSize: 18, color: "#fff" },
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
    color: colors.deepPurple, marginBottom: 8,
  },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 15,
    borderWidth: 1, borderColor: colors.deepPurple,
    alignItems: "center", justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 16, color: colors.deepPurple, fontWeight: "700",
  },
  qty: {
    fontSize: 16, fontWeight: "600",
    color: colors.deepPurple,
  },
  shippingOption: {
    flexDirection: "row", justifyContent: "space-between",
    padding: 14, marginHorizontal: 16,
    marginTop: 8, borderRadius: 12,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  shippingSelected: {
    backgroundColor: colors.lightLavender,
    borderWidth: 1, borderColor: colors.deepPurple,
  },
  shippingText: { fontSize: 14, color: colors.deepPurple },
  shippingPrice: {
    fontSize: 14, fontWeight: "700",
    color: colors.deepPurple,
  },
  paymentRow: {
    flexDirection: "row", justifyContent: "space-between",
    padding: 14, margin: 16, borderRadius: 12,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  paymentText: {
    fontSize: 15, color: colors.deepPurple, fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", padding: 16, margin: 16,
    backgroundColor: "#fff", borderRadius: 14,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  totalLabel: { fontSize: 12, color: "#9ca3af" },
  totalAmount: {
    fontSize: 20, fontWeight: "700",
    color: colors.deepPurple,
  },
  checkoutBtn: {
    backgroundColor: colors.deepPurple,
    padding: 16, borderRadius: 12,
    paddingHorizontal: 28,
  },
  checkoutText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  bottomNav: {
    flexDirection: "row", justifyContent: "space-around",
    padding: 14, backgroundColor: "#fff",
    borderTopWidth: 1, borderTopColor: colors.lightLavender,
  },
  navIcon: { fontSize: 22 },
});