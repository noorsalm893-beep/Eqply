import React from "react";
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

export default function ProductDetailsScreen({ navigation, route }) {
  const item = route?.params?.item;

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product data</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#d9c6e6", "#f8f1f3"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <Pressable
            style={styles.heartButton}
            onPress={() => Alert.alert("Added to favorites")}
          >
            <Ionicons name="heart-outline" size={22} color="#ff2d98" />
          </Pressable>
        </View>

        {/* Image */}
        <Image source={item.image} style={styles.image} />

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.type}>{item.type}</Text>

          <Text style={styles.price}>{item.price}</Text>

          <View style={styles.row}>
            <Ionicons name="pricetag-outline" size={16} color="#777" />
            <Text style={styles.meta}>{item.category}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color="#777" />
            <Text style={styles.meta}>{item.location || "Alexandria"}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This equipment is in excellent condition and ready for use. Perfect
            for students and professionals. Easy to use and reliable.
          </Text>
        </View>

        {/* Owner */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Owner</Text>
          <View style={styles.ownerRow}>
            <Ionicons name="person-circle-outline" size={40} color="#777" />
            <View>
              <Text style={styles.ownerName}>Ahmed Mohamed</Text>
              <Text style={styles.ownerSub}>Verified User</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.cartButton}
            onPress={() => Alert.alert("Added to cart")}
          >
            <Text style={styles.cartText}>Add to Cart</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => Alert.alert("Proceed to checkout")}
          >
            <Text style={styles.actionText}>
              {item.type === "Rent" ? "Rent Now" : "Buy Now"}
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
  },

  backButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },

  heartButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },

  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 6,
  },

  type: {
    backgroundColor: "#f1e7ed",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
    color: colors.deepPurple,
    fontWeight: "700",
  },

  price: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ff2d98",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  meta: {
    marginLeft: 6,
    color: "#777",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 8,
  },

  description: {
    color: "#555",
    lineHeight: 20,
  },

  ownerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  ownerName: {
    fontWeight: "700",
    color: colors.deepPurple,
  },

  ownerSub: {
    color: "#777",
    fontSize: 12,
  },

  buttonsContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  cartButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff2d98",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  cartText: {
    color: "#ff2d98",
    fontWeight: "700",
  },

  actionButton: {
    backgroundColor: "#ff2d98",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
});