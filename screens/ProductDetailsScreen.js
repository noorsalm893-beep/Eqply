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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const getProductImage = (item) => {
  if (item?.image) return item.image;

  if (item?.picture?.startsWith("http")) {
    return { uri: item.picture };
  }

  return {
    uri: item?.picture
      ? `https://eqply-backend.onrender.com/uploads/${item.picture}`
      : "https://via.placeholder.com/300",
  };
};
export default function ProductDetailsScreen({ navigation, route }) {
  const item = route?.params?.item;
  const { addToCart, cartCount, darkMode } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const availableTypes =
  item?.rentAvailable && item?.buyAvailable
  ? ["Rent", "Buy"]
  : item?.rentAvailable
  ? ["Rent"]
  : ["Buy"];

const [selectedType, setSelectedType] = useState(availableTypes[0]);
const [rentDays, setRentDays] = useState(1);

const rentPrice = item?.rentOptions?.[0]?.price
  ? `${item.rentOptions[0].price} EGP / day`
  : "Rent price not set";

const buyPrice = item?.buyPrice
  ? `${item.buyPrice} EGP`
  : "Buy price not set";

  const rentUnitPrice = Number(item?.rentOptions?.[0]?.price) || 0;
  const buyUnitPrice = Number(item?.buyPrice) || 0;
  
  const displayedPrice =
    selectedType === "Rent"
      ? `${rentUnitPrice * rentDays} EGP for ${rentDays} day${rentDays > 1 ? "s" : ""}`
      : `${buyUnitPrice} EGP`;
  const handleAddToCart = async () => {
  try {
    const productId = item?._id || item?.id;

    if (!productId) {
      Alert.alert("Error", "Product ID missing.");
      return;
    }

    setIsAddingToCart(true);

    const response = await addToCart({
      productId,
      quantity: 1,
    });

    if (response.ok) {
      navigation.navigate("Cart");
    } else { 
      Alert.alert(
        "Cart Error",
        response.error || "Failed to add item."
      );
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong.");
  } finally {
    setIsAddingToCart(false);
  }
};

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No product data</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={
      darkMode
      ? ["#1A1625","#2A2338"]
      : ["#d9c6e6","#f8f1f3"]
      }>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <View style={styles.headerRight}>
  <Pressable
    style={styles.heartButton}
    onPress={() => Alert.alert("Added to favorites")}
  >
    <Ionicons name="heart-outline" size={22} color="#ff2d98" />
  </Pressable>

  <Pressable
    style={styles.cartIconButton}
    onPress={() => navigation.navigate("Cart")}
  >
    <Ionicons name="cart-outline" size={23} color="#ff2d98" />

    {cartCount > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartCount}</Text>
      </View>
    )}
  </Pressable>
</View>
        </View>

        <Image
  source={getProductImage(item)}
  style={styles.image}
/>
        <View style={styles.card}>
          <Text style={styles.title}>{item.name || item.title}</Text>

          <View style={styles.typeOptionsRow}>
      {availableTypes.map((type) => (
      <Pressable
            key={type}
            style={[
            styles.typeOption,
            selectedType === type && styles.typeOptionSelected,
            ]}
            onPress={() => setSelectedType(type)}>
          <Text
            style={[
            styles.typeOptionText,
            selectedType === type && styles.typeOptionTextSelected,
            ]}>
            {type}
          </Text>
      </Pressable>
      ))}
     </View>
     {selectedType === "Rent" && (
  <View style={styles.daysRow}>
    <Text style={styles.daysLabel}>Rental days</Text>

    <View style={styles.daysControls}>
      <Pressable
        style={styles.dayButton}
        onPress={() => setRentDays((prev) => Math.max(1, prev - 1))}
      >
        <Text style={styles.dayButtonText}>-</Text>
      </Pressable>

      <Text style={styles.daysNumber}>{rentDays}</Text>

      <Pressable
        style={styles.dayButton}
        onPress={() => setRentDays((prev) => prev + 1)}
      >
        <Text style={styles.dayButtonText}>+</Text>
      </Pressable>
    </View>
  </View>
)}

          <Text style={styles.price}>{displayedPrice}</Text>

          <View style={styles.row}>
            <Ionicons name="pricetag-outline" size={16} color="#777" />
            <Text style={styles.meta}>
              {item?.category || "General"}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color="#777" />
            <Text style={styles.meta}>
              {item?.vendor?.location || "Alexandria"}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
           {item?.description || "No description available"}
         </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Owner</Text>
          <View style={styles.ownerRow}>
            <Ionicons name="person-circle-outline" size={40} color="#777" />
            <View>
            <Text style={styles.ownerName}>
              {item?.vendor?.name || "Equipment Owner"}
            </Text>
              <Text style={styles.ownerSub}>Verified User</Text>
            </View>
          </View>
        </View>
        <Pressable
  style={styles.messageButton}
  onPress={() =>
    navigation.navigate("Chat", {
      chat: {
        name: "Ahmed Mohamed",
        product: item?.title || item?.name || "Product",
      },
    })
  }
>
  <Ionicons name="chatbubble-ellipses-outline" size={20} color="#ff2d98" />
  <Text style={styles.messageButtonText}>Message Publisher</Text>
</Pressable>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.cartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.cartText}>
               {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("Checkout", {
                product: item,
                selectedType,
                rentDays,
              })
              }
          >
            <Text style={styles.actionText}>
            {selectedType === "Rent" ? "Rent Now" : "Buy Now"}
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
  typeOptionsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  
  typeOption: {
    backgroundColor: "#f1e7ed",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  
  typeOptionSelected: {
    backgroundColor: "#fff",
    borderColor: "#ff2d98",
  },
  
  typeOptionText: {
    color: colors.deepPurple,
    fontWeight: "700",
  },
  
  typeOptionTextSelected: {
    color: "#ff2d98",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  cartIconButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
    position: "relative",
  },
  
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.deepPurple,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  
  cartBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },
  messageButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff2d98",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: -4,
    marginBottom: 12,
  },
  
  messageButtonText: {
    color: "#ff2d98",
    fontWeight: "700",
    marginLeft: 8,
  },
  daysRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  
  daysLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  
  daysControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  dayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1e7ed",
    alignItems: "center",
    justifyContent: "center",
  },
  
  dayButtonText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ff2d98",
  },
  
  daysNumber: {
    marginHorizontal: 14,
    fontSize: 17,
    fontWeight: "800",
    color: colors.deepPurple,
  },
});