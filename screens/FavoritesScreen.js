import React, { useEffect, useState } from "react";
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
import { useAuth } from "../context/AuthContext";

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
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    darkMode,
    getFavorites,
    toggleFavorite,
    cartCount,
  } = useAuth();

  useEffect(() => {
    loadFavorites();
  }, []);
  
  const loadFavorites = async () => {
    try {
      setIsLoading(true);
  
      const response = await getFavorites();
  
      if (response.ok) {
        setFavorites(response.favorites || []);
      } else {
        Alert.alert(
          "Error",
          response.error || "Failed to load favorites."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  const removeFavorite = async (id) => {
    const previousFavorites = favorites;
  
    setFavorites((items) =>
      items.filter((item) => (item._id || item.id) !== id)
    );
  
    const response = await toggleFavorite(id);
  
    if (!response.ok) {
      Alert.alert(
        "Error",
        response.error || "Failed to remove favorite."
      );
  
      setFavorites(previousFavorites);
    }
  };

  return (
    <LinearGradient
colors={
darkMode
? ["#1A1625","#2A2338"]
: ["#d9c6e6","#f8f1f3"]
}
>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
  <View style={styles.leftHeader}>
    <Pressable
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons
        name="chevron-back"
        size={22}
        color={colors.deepPurple}
      />
    </Pressable>

    <View>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>
        Your saved equipment
      </Text>
    </View>
  </View>

  <Pressable
    style={styles.cartButton}
    onPress={() => navigation.navigate("Cart")}
  >
    <Ionicons
      name="cart-outline"
      size={24}
      color="#ff4fa3"
    />

    {cartCount > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>
          {cartCount}
        </Text>
      </View>
    )}
  </Pressable>
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
                key={item._id || item.id}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate("ProductDetails", { item })
                }
              >
                <Pressable
                  style={styles.heartButton}
                  onPress={() => removeFavorite(item._id || item.id)}
                >
                  <Ionicons name="heart" size={17} color="#ff2d98" />
                </Pressable>

                <Image
  source={{
    uri:
      item.picture ||
      "https://via.placeholder.com/150",
  }}
  style={styles.productImage}
/>

<Text style={styles.productTitle}>
  {item.name || item.title}
</Text>

<Text style={styles.typeBadge}>
  {item.rentAvailable && item.buyAvailable
    ? "Rent / Buy"
    : item.rentAvailable
    ? "Rent"
    : "Buy"}
</Text>

<Text style={styles.productMeta}>
  {item.category || "General"}
</Text>

                <View style={styles.productBottomRow}>
                <Text style={styles.productPrice}>
  {item.buyPrice || item.rentOptions?.[0]?.price || "Price unavailable"} EGP
</Text>
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
    justifyContent: "space-between",
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
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.deepPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  
  cartBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});