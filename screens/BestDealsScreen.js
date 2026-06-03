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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";

const bestDeals = [
  {
    id: 1,
    title: "Automatic Level",
    oldPrice: "900EGP",
    price: "705EGP",
    discount: "22% OFF",
    image: require("../assets/Automatic-Level.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 2,
    title: "Digital Multimeter",
    oldPrice: "650EGP",
    price: "499EGP",
    discount: "23% OFF",
    image: require("../assets/Digital-Multimeter.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 3,
    title: "Film Scanner",
    oldPrice: "130EGP",
    price: "90EGP",
    discount: "31% OFF",
    image: require("../assets/Film-Scanner.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 4,
    title: "Grinder",
    oldPrice: "750EGP",
    price: "600EGP",
    discount: "20% OFF",
    image: require("../assets/Grinder.jpg"),
    type: "Rent / Buy",
  },
];

export default function BestDealsScreen({ navigation }) {
  const handleProductPress = (item) => {
    navigation.navigate("ProductDetails", { item })
  };

  const handleFavourite = () => {
    Alert.alert("Favourites", "Added to favourites.");
  };

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

          <View>
            <Text style={styles.title}>Best Deals</Text>
            <Text style={styles.subtitle}>Special equipment offers for you</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Today’s Deals</Text>
          <Text style={styles.bannerText}>
            Save more while renting the tools you need.
          </Text>
        </View>

        <View style={styles.productsGrid}>
          {bestDeals.map((item) => (
            <Pressable
              key={item.id}
              style={styles.productCard}
              onPress={() => handleProductPress(item)}
            >
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>

              <Pressable style={styles.heartButton} onPress={handleFavourite}>
                <Ionicons name="heart-outline" size={16} color="#ff4fa3" />
              </Pressable>

              <Image
  source={{ uri: item.picture }}
  style={styles.productImage}
/>

              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.typeBadge}>{item.type}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{item.price}</Text>
                <Text style={styles.oldPrice}>{item.oldPrice}</Text>
              </View>

              <View style={styles.productBottomRow}>
                <Text style={styles.availableText}>Available now</Text>
                <MaterialCommunityIcons
                  name="storefront-outline"
                  size={18}
                  color={colors.deepPurple}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    fontSize: 26,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  subtitle: {
    fontSize: 14,
    color: "#6f6d8c",
    marginTop: 3,
  },
  banner: {
    backgroundColor: "#ffffffcc",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  bannerTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 6,
  },
  bannerText: {
    fontSize: 14,
    color: "#6f6d8c",
    lineHeight: 20,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eadbe0",
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff2d98",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 4,
    zIndex: 2,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 3,
  },
  productImage: {
    width: "100%",
    height: 115,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.deepPurple,
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  productBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  availableText: {
    fontSize: 12,
    color: "#7b7280",
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#f1e7ed",
    color: colors.deepPurple,
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
  },
});