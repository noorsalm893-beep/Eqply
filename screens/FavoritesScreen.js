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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";

const initialFavorites = [
  {
    id: 1,
    title: "Makita Drill",
    price: "380EGP",
    type: "Rent",
    category: "Engineering",
    image: require("../assets/Makita-drill.jpg"),
  },
  {
    id: 2,
    title: "Film Scanner",
    price: "90EGP",
    type: "Buy",
    category: "Media",
    image: require("../assets/Film-Scanner.jpg"),
  },
  {
    id: 3,
    title: "Spray Gun",
    price: "800EGP",
    type: "Rent / Buy",
    category: "Fine Arts",
    image: require("../assets/Spray-Gun.jpg"),
  },
];

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id) => {
    setFavorites((items) => items.filter((item) => item.id !== id));
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
            <Text style={styles.title}>Favorites</Text>
            <Text style={styles.subtitle}>Your saved equipment</Text>
          </View>
        </View>

        {favorites.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="heart-outline" size={54} color={colors.deepPurple} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>
              Save equipment you like and it will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.productsGrid}>
            {favorites.map((item) => (
              <Pressable
                key={item.id}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetails", { item })
                }
              >
                <Pressable
                  style={styles.heartButton}
                  onPress={() => removeFavorite(item.id)}
                >
                  <Ionicons name="heart" size={17} color="#ff2d98" />
                </Pressable>

                <Image source={item.image} style={styles.productImage} />

                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.typeBadge}>{item.type}</Text>
                <Text style={styles.productMeta}>{item.category}</Text>

                <View style={styles.productBottomRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <MaterialCommunityIcons
                    name="storefront-outline"
                    size={18}
                    color={colors.deepPurple}
                  />
                </View>
              </Pressable>
            ))}
          </View>
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
    paddingHorizontal: 16,
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
  subtitle: {
    fontSize: 14,
    color: "#6f6d8c",
    marginTop: 3,
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
    marginTop: 14,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 6,
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
  productMeta: {
    fontSize: 12,
    color: "#7b7280",
    marginBottom: 8,
  },
  productBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.deepPurple,
  },
});