import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";


export default function PublishedAdsScreen({ navigation }) {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getMyProducts, darkMode } = useAuth();
  useEffect(() => {
    loadMyProducts();
  }, []);
  
  const loadMyProducts = async () => {
    try {
      setIsLoading(true);
  
      const response = await getMyProducts();
  
      if (response.ok) {
        setAds(response.products || []);
      } else {
        Alert.alert(
          "Error",
          response.error || "Failed to load products."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Ad", "Are you sure you want to delete this ad?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setAds((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const getPriceText = (item) => {
    if (item.type === "Rent") return item.rentPrice;
    if (item.type === "Buy") return item.buyPrice;
    return `${item.rentPrice} / ${item.buyPrice}`;
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
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <View>
            <Text style={styles.title}>Published Ads</Text>
            <Text style={styles.subtitle}>Manage your uploaded products</Text>
          </View>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("AddProduct")}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Product</Text>
        </Pressable>

        {isLoading && (
         <ActivityIndicator
          size="large"
          color={colors.deepPurple}
          style={{ marginTop: 50 }}
         />
        )}
        {!isLoading && ads.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="albums-outline" size={52} color={colors.deepPurple} />
            <Text style={styles.emptyTitle}>No published ads yet</Text>
            <Text style={styles.emptyText}>
              Add your first product and it will appear here.
            </Text>
          </View>
        ) : (
          ads.map((item) => (
            <View key={item._id || item.id} style={styles.adCard}>
              <Image source={item.image? item.image: {uri: item.imageUrl || "https://via.placeholder.com/150",}}
              style={styles.adImage}
            />
              <View style={styles.adInfo}>
                <Text style={styles.adTitle}>{item.name || item.title}</Text>
                <Text style={styles.typeBadge}>{item.type}</Text>
                <Text style={styles.adCategory}>{item.category?.name || item.category}</Text>
                <Text style={styles.adPrice}>{getPriceText(item)}</Text>

                <View style={styles.actionsRow}>
                  <Pressable
                    style={styles.editButton}
                    onPress={() =>
                      navigation.navigate("AddProduct", {
                        productToEdit: {
                          ...item,
                          id: item._id || item.id,
                        },
                      })
                    }
                  >
                    <Ionicons name="create-outline" size={16} color="#fff" />
                    <Text style={styles.actionText}>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item._id || item.id)}
                  >
                    <Ionicons name="trash-outline" size={16} color="#fff" />
                    <Text style={styles.actionText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
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
    fontSize: 27,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  subtitle: {
    fontSize: 14,
    color: "#6f6d8c",
    marginTop: 3,
  },
  addButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 18,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 8,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eadbe0",
    marginTop: 30,
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
  adCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  adImage: {
    width: 100,
    height: 115,
    resizeMode: "contain",
    marginRight: 12,
  },
  adInfo: {
    flex: 1,
  },
  adTitle: {
    fontSize: 17,
    fontWeight: "800",
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
  adCategory: {
    fontSize: 13,
    color: "#7b7280",
    marginBottom: 6,
  },
  adPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ff2d98",
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.deepPurple,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff2d98",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 5,
  },
});