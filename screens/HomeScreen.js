import React from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const bestDeals = [
  {
    id: 1,
    title: "automatic level",
    price: "705EGP",
    image: require("../assets/Automatic-Level.jpg"),
  },
  {
    id: 2,
    title: "digital multimeter",
    price: "499EGP",
    image: require("../assets/Digital-Multimeter.jpg"),
  },
  {
    id: 3,
    title: "film scanner",
    price: "90EGP",
    image: require("../assets/Film-Scanner.jpg"),
  },
  {
    id: 4,
    title: "grinder",
    price: "600EGP",
    image: require("../assets/Grinder.jpg"),
  },
];

const exploreEquipment = [
  {
    id: 5,
    title: "makita drill",
    price: "380EGP",
    image: require("../assets/Makita-drill.jpg"),
  },
  {
    id: 6,
    title: "spray gun",
    price: "800EGP",
    image: require("../assets/Spray-Gun.jpg"),
  },
  {
    id: 7,
    title: "total station",
    price: "620EGP",
    image: require("../assets/total-station.jpg"),
  },
  {
    id: 8,
    title: "soldering iron",
    price: "200EGP",
    image: require("../assets/Soldering-Iron.jpg"),
  },
];

const categories = [
  {
    id: 1,
    title: "Media",
    icon: "camera-outline",
    type: "ion",
  },
  {
    id: 2,
    title: "Engineering",
    icon: "hard-hat",
    type: "material",
  },
  {
    id: 3,
    title: "Fine Arts",
    icon: "palette",
    type: "ion",
  },
];

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const displayName =
    user?.name || user?.fullName || user?.username || "mariam";

  const goTo = (screen, params = {}) => {
    if (navigation?.navigate) {
      navigation.navigate(screen, params);
    } else {
      Alert.alert("Navigation", `${screen} screen is not added yet.`);
    }
  };

  const handleFavourite = () => {
    Alert.alert("Favourites", "Added to favourites.");
  };

  const renderCategoryIcon = (item) => {
    if (item.type === "material") {
      return (
        <MaterialCommunityIcons
          name={item.icon}
          size={34}
          color={colors.deepPurple}
        />
      );
    }

    return <Ionicons name={item.icon} size={34} color={colors.deepPurple} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require("../assets/ava4.jpeg")}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.helloText}>Hello,</Text>
                <Text style={styles.nameText}>{displayName}</Text>
              </View>
            </View>

            <View style={styles.headerIcons}>
              <Pressable
                style={styles.iconButton}
                onPress={() => goTo("Cart")}
              >
                <Feather name="shopping-cart" size={18} color="#ff4fa3" />
              </Pressable>

              <Pressable
                style={styles.iconButton}
                onPress={() => goTo("Menu")}
              >
                <Feather name="menu" size={18} color="#ff4fa3" />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={styles.searchBar}
            onPress={() => goTo("Search")}
          >
            <Ionicons name="search-outline" size={18} color={colors.deepPurple} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#7b7280"
              style={styles.searchInput}
              editable={false}
              pointerEvents="none"
            />
          </Pressable>

          <Text style={styles.sectionTitle}>User Reviews</Text>

          <Pressable style={styles.reviewCard} onPress={() => goTo("Reviews")}>
            <View style={styles.reviewLeft}>
              <Image
                source={require("../assets/ava4.jpeg")}
                style={styles.reviewAvatar}
              />
              <View>
                <Text style={styles.reviewName}>Title</Text>
                <Text style={styles.reviewDesc}>Description</Text>
              </View>
            </View>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={16}
                  color="#E2A93B"
                  style={{ marginLeft: 2 }}
                />
              ))}
            </View>
          </Pressable>

          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <Text style={styles.sectionTitle}>My Orders</Text>

          <View style={styles.orderRow}>
            <Pressable
              style={styles.orderChip}
              onPress={() => goTo("ToPay")}
            >
              <Text style={styles.orderChipText}>To Pay</Text>
            </Pressable>

            <Pressable
              style={styles.orderChip}
              onPress={() => goTo("Tracking")}
            >
              <Text style={styles.orderChipText}>Tracking</Text>
              <View style={styles.greenDot} />
            </Pressable>

            <Pressable
              style={styles.orderChip}
              onPress={() => goTo("Review")}
            >
              <Text style={styles.orderChipText}>Review</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Best Deals</Text>

          <View style={styles.productsGrid}>
            {bestDeals.map((item) => (
              <Pressable
                key={item.id}
                style={styles.productCard}
                onPress={() => goTo("ProductDetails", { item })}
              >
                <Pressable
                  style={styles.heartButton}
                  onPress={handleFavourite}
                >
                  <Ionicons name="heart-outline" size={15} color="#ff4fa3" />
                </Pressable>

                <Image source={item.image} style={styles.productImage} />

                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.productBottomRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Pressable onPress={() => goTo("ProductDetails", { item })}>
                    <MaterialCommunityIcons
                      name="storefront-outline"
                      size={18}
                      color={colors.deepPurple}
                    />
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() => goTo("BestDeals")}
          >
            <Text style={styles.seeMoreText}>See More</Text>
          </Pressable>

          <Text style={styles.sectionTitle}>Categories</Text>

          <View style={styles.categoriesRow}>
            {categories.map((item) => (
              <Pressable
                key={item.id}
                style={styles.categoryItem}
                onPress={() => goTo("Category", { category: item.title })}
              >
                <View style={styles.categoryIconCircle}>
                  {renderCategoryIcon(item)}
                </View>
                <Text style={styles.categoryLabel}>{item.title}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Explore Equipment</Text>

          <View style={styles.productsGrid}>
            {exploreEquipment.map((item) => (
              <Pressable
                key={item.id}
                style={styles.productCard}
                onPress={() => goTo("ProductDetails", { item })}
              >
                <Pressable
                  style={styles.heartButton}
                  onPress={handleFavourite}
                >
                  <Ionicons name="heart-outline" size={15} color="#ff4fa3" />
                </Pressable>

                <Image source={item.image} style={styles.productImage} />

                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.productBottomRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Pressable onPress={() => goTo("ProductDetails", { item })}>
                    <MaterialCommunityIcons
                      name="storefront-outline"
                      size={18}
                      color={colors.deepPurple}
                    />
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() => goTo("ExploreEquipment")}
          >
            <Text style={styles.seeMoreText}>See More</Text>
          </Pressable>
        </ScrollView>

        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem} onPress={() => goTo("Cart")}>
            <Feather name="shopping-cart" size={20} color="#ff4fa3" />
          </Pressable>

          <Pressable style={styles.navItem} onPress={() => goTo("Favourites")}>
            <Ionicons name="heart-outline" size={21} color="#ff4fa3" />
          </Pressable>

          <Pressable style={styles.navItem} onPress={() => goTo("Home")}>
            <Ionicons name="home-outline" size={21} color={colors.deepPurple} />
          </Pressable>

          <Pressable style={styles.navItem} onPress={() => goTo("Menu")}>
            <Feather name="menu" size={21} color="#ff4fa3" />
          </Pressable>

          <Pressable style={styles.navItem} onPress={() => goTo("Profile")}>
            <Ionicons name="person-outline" size={21} color="#ff4fa3" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f1f3",
  },
  page: {
    flex: 1,
    backgroundColor: "#f8f1f3",
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 110,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  helloText: {
    fontSize: 12,
    color: colors.deepPurple,
    fontWeight: "500",
  },
  nameText: {
    fontSize: 14,
    color: colors.deepPurple,
    fontWeight: "700",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: colors.deepPurple,
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 42,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: colors.deepPurple,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 10,
    marginTop: 6,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  reviewLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  reviewName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7b7280",
  },
  reviewDesc: {
    fontSize: 12,
    color: "#a09aa5",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d1c7d8",
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: colors.deepPurple,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  orderChip: {
    flex: 1,
    backgroundColor: "#e8dff0",
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 4,
    position: "relative",
  },
  orderChipText: {
    color: colors.deepPurple,
    fontSize: 12,
    fontWeight: "600",
  },
  greenDot: {
    position: "absolute",
    right: 10,
    top: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#7cd957",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eadbe0",
    position: "relative",
  },
  heartButton: {
    position: "absolute",
    top: 7,
    right: 7,
    zIndex: 2,
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginTop: 12,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 13,
    color: colors.deepPurple,
    marginBottom: 6,
  },
  productBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    color: colors.deepPurple,
    fontWeight: "700",
  },
  seeMoreButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 7,
    marginTop: 2,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  seeMoreText: {
    color: colors.deepPurple,
    fontSize: 13,
    fontWeight: "700",
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 18,
    marginTop: 2,
  },
  categoryItem: {
    alignItems: "center",
    width: 90,
  },
  categoryIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#f1e7ed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.deepPurple,
    textAlign: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 62,
    backgroundColor: "#fff7f9",
    borderTopWidth: 1,
    borderTopColor: "#eedce3",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 4,
  },
  navItem: {
    padding: 8,
  },
});
