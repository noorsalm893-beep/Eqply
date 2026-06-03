import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function CheckoutScreen({
  navigation,
  route,
 }) {
  const product = route?.params?.product;
  const cartItems = route?.params?.cartItems || [];
  const cartSubtotal = route?.params?.subtotal;
  const cartDelivery = route?.params?.delivery;
  const cartTotal = route?.params?.total;
  const selectedType = route?.params?.selectedType;
  const rentDays = route?.params?.rentDays || 1;
  const { darkMode } = useAuth();

  const unitPrice = Number(
    selectedType === "Rent"
      ? product?.rentOptions?.[0]?.price
      : product?.buyPrice
  ) || 0;
  
  const productSubtotal =
    selectedType === "Rent"
      ? unitPrice * rentDays
      : unitPrice;
  
  const subtotal =
    typeof cartSubtotal === "number"
      ? cartSubtotal
      : productSubtotal;
  
  const delivery =
    typeof cartDelivery === "number"
      ? cartDelivery
      : subtotal > 0
      ? 40
      : 0;
  
  const total =
    typeof cartTotal === "number"
      ? cartTotal
      : subtotal + delivery;

const getProductImage = () => {
if (product?.picture?.startsWith("http")) {
return { uri: product.picture };
}

return {
uri: product?.picture
? `https://eqply-backend.onrender.com/uploads/${product.picture}`
: "https://via.placeholder.com/150",
};
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
          <Text style={styles.title}>Checkout</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Selected Product
          </Text>

          <Image
  source={{
    uri: product?.picture || "https://via.placeholder.com/150",
  }}
  style={styles.productImage}
/>

          <Text style={styles.productName}>
            {product?.name || "Product"}
          </Text>

          {selectedType === "Rent" && (
            <Text style={styles.productType}>
              {rentDays} day{rentDays > 1 ? "s" : ""}
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Address</Text>
          <Text style={styles.text}>No address selected yet.</Text>

          <Pressable
            style={styles.smallButton}
            onPress={() => navigation.navigate("Address")}
          >
            <Text style={styles.smallButtonText}>Add / Edit Address</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>

          <View style={styles.row}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.value}>{subtotal} EGP</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Delivery</Text>
            <Text style={styles.value}>40 EGP</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalValue}>{total} EGP</Text>
          </View>
        </View>

        <Pressable
          style={styles.payButton}
          onPress={() =>
            navigation.navigate("Payment", {
              product,
              selectedType,
              rentDays,
              total,
            })
            }>
          <Text style={styles.payButtonText}>Continue to Payment</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: "#6f6d8c",
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#eadbe0",
    marginVertical: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.deepPurple,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ff2d98",
  },
  smallButton: {
    alignSelf: "flex-start",
    backgroundColor: "#f1e7ed",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 14,
  },
  smallButtonText: {
    color: colors.deepPurple,
    fontWeight: "700",
  },
  payButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  productImage:{
    width:"100%",
    height:140,
    resizeMode:"contain",
    marginBottom:12,
    },
    
    productName:{
    fontSize:18,
    fontWeight:"700",
    color:colors.deepPurple,
    },
    
    productType:{
    marginTop:6,
    color:"#ff2d98",
    fontWeight:"700",
    },
});