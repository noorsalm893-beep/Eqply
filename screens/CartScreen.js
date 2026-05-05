import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";

const initialCartItems = [
  {
    id: 1,
    title: "Makita Drill",
    price: 380,
    quantity: 1,
    image: require("../assets/Makita-drill.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 2,
    title: "Film Scanner",
    price: 90,
    quantity: 1,
    image: require("../assets/Film-Scanner.jpg"),
    type: "Rent / Buy",
  },
];

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + delivery;

  return (
    <LinearGradient colors={["#d9c6e6", "#f8f1f3"]} style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <Text style={styles.title}>My Cart</Text>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="cart-outline" size={54} color={colors.deepPurple} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>
              Add equipment to your cart and it will appear here.
            </Text>
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <Image source={item.image} style={styles.itemImage} />

                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemType}>{item.type}</Text>
                  <Text style={styles.itemPrice}>{item.price} EGP</Text>

                  <View style={styles.quantityRow}>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => decreaseQty(item.id)}
                    >
                      <Ionicons name="remove" size={18} color={colors.deepPurple} />
                    </Pressable>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => increaseQty(item.id)}
                    >
                      <Ionicons name="add" size={18} color={colors.deepPurple} />
                    </Pressable>
                  </View>
                </View>

                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#ff2d98" />
                </Pressable>
              </View>
            ))}

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{subtotal} EGP</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>{delivery} EGP</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{total} EGP</Text>
              </View>
            </View>

            <Pressable
              style={styles.checkoutButton}
              onPress={() => Alert.alert("Checkout", "Address page will be added next.")}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eadbe0",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.deepPurple,
    marginTop: 12,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#6f6d8c",
    textAlign: "center",
    lineHeight: 21,
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eadbe0",
    position: "relative",
  },
  itemImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 15,
    color: "#6f6d8c",
    marginBottom: 10,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f1e7ed",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  removeButton: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#6f6d8c",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  divider: {
    height: 1,
    backgroundColor: "#eadbe0",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.deepPurple,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ff2d98",
  },
  checkoutButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  itemType: {
    fontSize: 13,
    color: "#ff2d98",
    fontWeight: "700",
    marginBottom: 6,
  },
});