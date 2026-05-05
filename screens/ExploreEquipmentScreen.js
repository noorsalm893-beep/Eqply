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

const equipment = [
  {
    id: 1,
    title: "Makita Drill",
    price: "380EGP",
    category: "Engineering",
    location: "Alexandria",
    image: require("../assets/Makita-drill.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 2,
    title: "Spray Gun",
    price: "800EGP",
    category: "Fine Arts",
    location: "Cairo",
    image: require("../assets/Spray-Gun.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 3,
    title: "Total Station",
    price: "620EGP",
    category: "Engineering",
    location: "Giza",
    image: require("../assets/total-station.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 4,
    title: "Soldering Iron",
    price: "200EGP",
    category: "Engineering",
    location: "Alexandria",
    image: require("../assets/Soldering-Iron.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 5,
    title: "Film Scanner",
    price: "90EGP",
    category: "Media",
    location: "Cairo",
    image: require("../assets/Film-Scanner.jpg"),
    type: "Rent / Buy",
  },
  {
    id: 6,
    title: "Digital Multimeter",
    price: "499EGP",
    category: "Engineering",
    location: "Alexandria",
    image: require("../assets/Digital-Multimeter.jpg"),
    type: "Rent / Buy",
  },
];

export default function ExploreEquipmentScreen({ navigation }) {
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
            <Text style={styles.title}>Explore Equipment</Text>
            <Text style={styles.subtitle}>Browse tools available for rent</Text>
          </View>
        </View>

        <View style={styles.topActions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => navigation.navigate("Search")}
          >
            <Ionicons name="search-outline" size={18} color={colors.deepPurple} />
            <Text style={styles.actionText}>Search</Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => navigation.navigate("FilterSort")}
          >
            <Ionicons name="filter-outline" size={18} color={colors.deepPurple} />
            <Text style={styles.actionText}>Filter</Text>
          </Pressable>
        </View>

        <View style={styles.productsGrid}>
          {equipment.map((item) => (
            <Pressable
              key={item.id}
              style={styles.productCard}
              onPress={() => handleProductPress(item)}
            >
              <Pressable style={styles.heartButton} onPress={handleFavourite}>
                <Ionicons name="heart-outline" size={16} color="#ff4fa3" />
              </Pressable>

              <Image source={item.image} style={styles.productImage} />

              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.typeBadge}>{item.type}</Text>
              <Text style={styles.productMeta}>{item.category}</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#7b7280" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>

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
    fontSize: 25,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  subtitle: {
    fontSize: 14,
    color: "#6f6d8c",
    marginTop: 3,
  },
  topActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  actionButton: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  actionText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: colors.deepPurple,
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
    marginBottom: 4,
  },
  productMeta: {
    fontSize: 12,
    color: "#7b7280",
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: "#7b7280",
    marginLeft: 3,
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