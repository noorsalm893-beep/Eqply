import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Pressable, FlatList,
  Image, Modal, ActivityIndicator, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function FavoritesScreen() {
  const navigation = useNavigation();

  // API: GET /auth/profile - gets user name and subscription status
  const { user, userToken } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  useEffect(() => {
    // Check subscription from user profile
    const subscribed = user?.isSubscribed || false;
    setIsSubscribed(subscribed);
    if (!subscribed) {
      setShowSubscribeModal(true);
      setLoading(false);
      return;
    }

    // API: GET /favorites - gets user's favorite items
    const getFavorites = async () => {
      try {
        const response = await fetch(API.favorites, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        console.log("Error fetching favorites");
      } finally {
        setLoading(false);
      }
    };
    getFavorites();
  }, [user]);

  const handleRemoveFavorite = async (itemId) => {
    // API: DELETE /favorites/:itemId - removes item from favorites
    try {
      await fetch(`${API.favorites}/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setFavorites(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.log("Error removing favorite");
    }
  };

  const handleAddToCart = async (itemId) => {
    // API: POST /cart - adds item to cart
    try {
      await fetch(API.cart, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ itemId, quantity: 1 }),
      });
      navigation.navigate("Cart");
    } catch (err) {
      console.log("Error adding to cart");
    }
  };

  const handleSubscribe = async () => {
    // API: POST /subscribe - subscribes the user
    try {
      const response = await fetch(API.subscribe, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.ok) {
        setIsSubscribed(true);
        setShowSubscribeModal(false);
      }
    } catch (err) {
      console.log("Error subscribing");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* API: DELETE /favorites/:itemId */}
      <Pressable
        style={styles.heartBtn}
        onPress={() => handleRemoveFavorite(item.id)}>
        <Text style={styles.heart}>❤️</Text>
      </Pressable>

      {/* No API - just showing image */}
      <View style={styles.imageContainer}>
        {item.image
          ? <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
          : <Text style={{ fontSize: 40 }}>🔧</Text>
        }
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.cardInfo}>
          <Text style={styles.itemName}>{item.name || "Item"}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice} EGP</Text>
          )}
          <Text style={[styles.itemPrice, item.originalPrice && styles.discountPrice]}>
            {item.price} EGP
          </Text>
          {item.duration && (
            <Text style={styles.duration}>{item.duration}</Text>
          )}
        </View>
        {/* API: POST /cart */}
        <Pressable
          style={({ pressed }) => [styles.cartBtn, pressed && { opacity: 0.8 }]}
          onPress={() => handleAddToCart(item.id)}>
          <Text style={styles.cartIcon}>🛒</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>

      {/* Header - API: GET /auth/profile */}
      <View style={styles.header}>
        {/* No API - goes back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Favorites</Text>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitial}>
            {user?.name?.charAt(0)?.toUpperCase() || "M"}
          </Text>
        </View>
      </View>

      {/* Subscription Gate Modal */}
      <Modal
        transparent
        visible={showSubscribeModal}
        animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalIcon}>⭐</Text>
            <Text style={styles.modalTitle}>
              Subscribe to Access Favorites
            </Text>
            <Text style={styles.modalText}>
              Save your favorite equipment and access them anytime.
              Subscribe to unlock this feature!
            </Text>
            <View style={styles.planBox}>
              <Text style={styles.planTitle}>Premium Plan</Text>
              <Text style={styles.planPrice}>99 EGP / month</Text>
              {["Save unlimited favorites", "Priority listings", "Exclusive deals"].map((f, i) => (
                <Text key={i} style={styles.planFeature}>✓  {f}</Text>
              ))}
            </View>
            {/* API: POST /subscribe */}
            <Pressable
              style={({ pressed }) => [styles.subscribeBtn, pressed && { opacity: 0.9 }]}
              onPress={handleSubscribe}>
              <Text style={styles.subscribeBtnText}>Subscribe Now</Text>
            </Pressable>
            {/* No API - goes back */}
            <Pressable
              style={styles.cancelModalBtn}
              onPress={() => navigation.goBack()}>
              <Text style={styles.cancelModalText}>Maybe Later</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Favorites Grid - API: GET /favorites */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.deepPurple}
          style={{ marginTop: 40 }}
        />
      ) : isSubscribed ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🤍</Text>
              <Text style={styles.emptyText}>No favorites yet!</Text>
              <Text style={styles.emptySubText}>
                Start adding items you love
              </Text>
            </View>
          }
        />
      ) : null}

      {/* Bottom Nav - No API */}
      <View style={styles.bottomNav}>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.navIcon}>🛒</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.navIcon, styles.navActive]}>🤍</Text>
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
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.deepPurple,
    alignItems: "center", justifyContent: "center",
  },
  backIcon: { fontSize: 18, color: "#fff" },
  title: {
    flex: 1, fontSize: 22,
    fontWeight: "700", color: colors.deepPurple,
  },
  userAvatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: colors.primaryPink,
    alignItems: "center", justifyContent: "center",
  },
  userInitial: { color: "#fff", fontWeight: "700", fontSize: 16 },
  list: { padding: 12, paddingBottom: 100 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: {
    width: "48%", backgroundColor: "#fff",
    borderRadius: 16, padding: 12,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  heartBtn: {
    position: "absolute", top: 10, right: 10, zIndex: 1,
  },
  heart: { fontSize: 18 },
  imageContainer: {
    height: 130, alignItems: "center",
    justifyContent: "center", marginBottom: 8,
  },
  itemImage: { width: "100%", height: "100%" },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardInfo: { flex: 1 },
  itemName: { fontSize: 13, color: "#6b7280", marginBottom: 2 },
  originalPrice: {
    fontSize: 12, color: "#9ca3af",
    textDecorationLine: "line-through",
  },
  itemPrice: {
    fontSize: 15, fontWeight: "700", color: colors.deepPurple,
  },
  discountPrice: { color: colors.primaryPink },
  duration: { fontSize: 11, color: "#6b7280", marginTop: 2 },
  cartBtn: {
    width: 36, height: 36,
    backgroundColor: colors.lightLavender,
    borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  cartIcon: { fontSize: 16 },
  emptyContainer: { alignItems: "center", marginTop: 60 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyText: {
    fontSize: 18, fontWeight: "700",
    color: colors.deepPurple, marginBottom: 8,
  },
  emptySubText: { fontSize: 14, color: "#9ca3af" },
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 28, alignItems: "center",
  },
  modalIcon: { fontSize: 48, marginBottom: 12 },
  modalTitle: {
    fontSize: 20, fontWeight: "700",
    color: colors.deepPurple, textAlign: "center", marginBottom: 8,
  },
  modalText: {
    fontSize: 14, color: "#6b7280",
    textAlign: "center", lineHeight: 20, marginBottom: 20,
  },
  planBox: {
    width: "100%", backgroundColor: colors.lightLavender,
    borderRadius: 16, padding: 16, marginBottom: 20,
  },
  planTitle: {
    fontSize: 16, fontWeight: "700",
    color: colors.deepPurple, marginBottom: 4,
  },
  planPrice: {
    fontSize: 22, fontWeight: "800",
    color: colors.primaryPink, marginBottom: 12,
  },
  planFeature: { fontSize: 14, color: "#4b5563", marginBottom: 4 },
  subscribeBtn: {
    width: "100%", backgroundColor: colors.deepPurple,
    padding: 18, borderRadius: 14,
    alignItems: "center", marginBottom: 12,
    ...Platform.select({
      ios: { shadowColor: colors.deepPurple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  subscribeBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cancelModalBtn: { padding: 8 },
  cancelModalText: { fontSize: 14, color: "#9ca3af", fontWeight: "600" },
  bottomNav: {
    flexDirection: "row", justifyContent: "space-around",
    padding: 14, backgroundColor: "#fff",
    borderTopWidth: 1, borderTopColor: colors.lightLavender,
  },
  navIcon: { fontSize: 22 },
  navActive: { color: colors.primaryPink },
});