import React, { useEffect, useRef, useState } from "react";
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
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const categories = [
  {
    id: 1,
    title: "Media",
    icon: "camera-outline",
    iconType: "ion",
    category: "Media",
  },
  {
    id: 2,
    title: "Engineering",
    icon: "hammer-wrench",
    iconType: "material",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Fine Arts",
    icon: "color-palette-outline",
    iconType: "ion",
    category: "Fine Arts",
  },
];

const reviews = [
  {
    id: 1,
    name: "Mohamed",
    text: "Very useful app and easy to use.",
    rating: 5,
    image: require("../assets/ava1.jpeg"),
  },
  {
    id: 2,
    name: "Basmala",
    text: "The equipment options are great and organized.",
    rating: 4,
    image: require("../assets/ava2.jpeg"),
  },
  {
    id: 3,
    name: "Adel",
    text: "I found what I needed quickly and smoothly.",
    rating: 5,
    image: require("../assets/ava3.jpeg"),
  },
];

export default function HomeScreen({ navigation }) {
  const [activeReview, setActiveReview] = useState(0);
  const reviewScrollRef = useRef(null);  
  const {
    user,
    toggleFavorite,
    addToCart,
    appMode,
    cartCount,
    refreshCartCount,
    getBestDeals,
    getProducts,
    darkMode,
  } = useAuth();
    const displayName =
    user?.name || user?.fullName || user?.username || "mariam";
    const handleReviewScroll = (event) => {
      const slideWidth = width - 28;
      const index = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
      setActiveReview(index);
    };
    
  const goTo = (screen, params = {}) => {
    if (navigation?.navigate) {
      navigation.navigate(screen, params);
    } else {
      Alert.alert("Navigation", `${screen} screen is not added yet.`);
    }
  };
  const [likedProducts, setLikedProducts] = useState([]);
  const [bestDealsData, setBestDealsData] = useState([]);
  const [exploreData, setExploreData] = useState([]);
  useEffect(() => {
    refreshCartCount();
  }, []);
  useEffect(() => {
    const loadProducts = async () => {
      const dealsResponse = await getBestDeals();
      const productsResponse = await getProducts();
      console.log("PRODUCTS RESPONSE:", productsResponse);
      console.log("DEALS RESPONSE:", dealsResponse);
  
      if (productsResponse.ok) {
        const allProducts = productsResponse.products || [];
  
        setExploreData(allProducts);
  
        const deals =
          allProducts.filter((item) => item.bestDeal) || [];
  
        setBestDealsData(
          deals.length > 0 ? deals : allProducts.slice(0, 2)
        );
      }
  
      if (dealsResponse.ok && dealsResponse.products?.length > 0) {
        setBestDealsData(dealsResponse.products);
      }
    };
  
    loadProducts();
  }, []);

    const handleFavourite = async (id) => {
    const isLiked = likedProducts.includes(id);
  
    setLikedProducts((prev) =>
      isLiked
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  
    const response = await toggleFavorite(id);
  
    if (!response.ok) {
      Alert.alert("Error", response.error || "Failed to update favorite.");
  
      setLikedProducts((prev) =>
        isLiked
          ? [...prev, id]
          : prev.filter((item) => item !== id)
      );
    }
  };
  const handleAddToCart = async (item) => {
    try {
      const productId = item._id || item.id;
  
      if (!productId) {
        Alert.alert("Error", "Product ID missing.");
        return;
      }
  
      const response = await addToCart({
        productId,
        quantity: 1,
      });
  
      if (!response.ok) {
        Alert.alert(
          "Cart Error",
          response.error || "Failed to add item."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };
  const renderCategoryIcon = (item) => {
    if (item.iconType === "material") {
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
  const [showMoreDeals, setShowMoreDeals] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={
          darkMode
          ? ["#1A1625","#2A2338"]
          : ["#d9c6e6","#f8f1f3"]
          }>
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
<Text
numberOfLines={1}
style={{
fontSize:16,
fontWeight:"700",
color:"#C86A9E",
maxWidth:160,
}}
>
Hello, {displayName}
</Text>
</View>
            </View>

            <View style={styles.headerIcons}>
            {appMode === "buy" && (
<Pressable
  style={styles.iconButton}
  onPress={() => goTo("Cart")}
>
  <Feather name="shopping-cart" size={25} color="#ff4fa3" />

  {cartCount > 0 && (
    <View style={styles.cartBadge}>
      <Text style={styles.cartBadgeText}>
        {cartCount}
      </Text>
    </View>
  )}
</Pressable>
)}

              <Pressable
                style={styles.iconButton}
                onPress={() => goTo("Settings")}
              >
                <Feather name="menu" size={25} color="#ff4fa3" />
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


        {appMode === "buy" && (
        <>
          <Text style={[ styles.sectionTitle, { color: "#C86A9E" }]}>Best Deals</Text>

          <View style={styles.productsGrid}>
          {(showMoreDeals
             ? bestDealsData
             : bestDealsData.slice(0, 2)
             ).map((item) => (
              <Pressable
              key={item._id || item.id}
              style={styles.productCard}
                onPress={() => goTo("ProductDetails", { item })}
              >
                  <Pressable
                    style={styles.heartButton}
                    onPress={() => handleFavourite(item._id)}
                  >
                  <Ionicons
                    name={likedProducts.includes(item._id) ? "heart" : "heart-outline"}
                    size={25}
                    color="#ff4fa3"
                 />
                </Pressable>

                <Image
  source={
    item.image
      ? item.image
      : {
          uri: item.picture
            ? item.picture.startsWith("http")
              ? item.picture
              : `https://eqply-backend.onrender.com/uploads/${item.picture}`
            : "https://via.placeholder.com/150",
        }
  }
  style={styles.productImage}
/>

                <Text style={styles.nameText}>{item.name || item.title}</Text>
                <Text style={styles.typeBadge}>{item.rentAvailable && item.buyAvailable
                  ? "Rent / Buy"
                  : item.rentAvailable
                  ? "Rent"
                  : "Buy"}</Text>
                <View style={styles.productBottomRow}>
                  <Text style={styles.productPrice}>{item.buyPrice ||
                    item.rentOptions?.[0]?.price ||
                    "Price unavailable"} EGP</Text>
                  <Pressable
  style={styles.addCartButton}
  onPress={() => handleAddToCart(item)}
>
  <Ionicons
    name="add"
    size={18}
    color="#fff"
  />

  <Text style={styles.addCartText}>
    Cart
  </Text>      
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() => setShowMoreDeals(!showMoreDeals)}
          >
            <Text style={styles.seeMoreText}>{showMoreDeals ? "Show Less" : "See More"}</Text>
          </Pressable>

          <Text style={[ styles.sectionTitle, { color: "#C86A9E" }]}>Categories</Text>

          <View style={styles.categoriesRow}>
            {categories.map((item) => (
              <Pressable
                key={item.id}
                style={styles.categoryItem}
                onPress={() =>
                  goTo("ExploreEquipment", {
                    category: item.title,
                  })
                }
              >
                <View style={styles.categoryIconCircle}>
                  {renderCategoryIcon(item)}
                </View>
                <Text style={[ styles.sectioncategory, { color: "#C86A9E" }]}>{item.name || item.title}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={[ styles.sectionTitle, { color: "#C86A9E" }]}>Explore Equipment</Text>

          <View style={styles.productsGrid}>
            {exploreData.map((item) => (
              <Pressable
              key={item._id || item.id}
              style={styles.productCard}
                onPress={() => goTo("ProductDetails", { item })}
              >
                  <Pressable
                    style={styles.heartButton}
                    onPress={() => handleFavourite(item.id)}
                  >
                  <Ionicons
                    name={likedProducts.includes(item.id) ? "heart" : "heart-outline"}
                    size={25}
                    color="#ff4fa3"
                 />
                </Pressable>

                <Image
  source={
    item.image
      ? item.image
      : {
          uri: item.picture
            ? item.picture.startsWith("http")
              ? item.picture
              : `https://eqply-backend.onrender.com/uploads/${item.picture}`
            : "https://via.placeholder.com/150",
        }
  }
  style={styles.productImage}
/>

                <Text style={styles.nameText}>{item.name || item.title}</Text>
                <Text style={styles.typeBadge}>{item.rentAvailable && item.buyAvailable
                  ? "Rent / Buy"
                  : item.rentAvailable
                  ? "Rent"
                  : "Buy"}</Text>
                <View style={styles.productBottomRow}>
                  <Text style={styles.productPrice}>{item.buyPrice ||
                    item.rentOptions?.[0]?.price ||
                    "Price unavailable"} EGP</Text>
                  <Pressable
  style={styles.addCartButton}
  onPress={() => handleAddToCart(item)}
>
  <Ionicons
    name="add"
    size={18}
    color="#fff"
  />

  <Text style={styles.addCartText}>
    Cart
  </Text>      
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.seeMoreButton}
            onPress={() => goTo("ExploreEquipment")}>
            <Text style={styles.seeMoreText}>See More</Text>
          </Pressable>
          </>
        )}
        {appMode === "buy" && (<>
          <Text style={[ styles.sectionTitle, { color: "#C86A9E" }]}>User Reviews</Text>
  <ScrollView
  ref={reviewScrollRef}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  onMomentumScrollEnd={handleReviewScroll}
  contentContainerStyle={styles.reviewsScrollContent}
>
{reviews.map((review) => (
<Pressable
key={review.id}
style={styles.reviewCard}
onPress={() => goTo("Reviews")}
>
<Image source={review.image} style={styles.reviewAvatar} />

<View style={styles.reviewTextBox}>
  <Text style={styles.reviewName}>{review.name}</Text>

  <Text style={styles.reviewDesc}>{review.text}</Text>

  <View style={styles.starsRow}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name="star"
        size={16}
        color={star <= review.rating ? "#E2A93B" : "#ddd"}
      />
    ))}
  </View>
</View>
</Pressable>
))}
</ScrollView>
</>)}

<View style={styles.dotsRow}>
{reviews.map((_, index) => (
<View
key={index}
style={[styles.dot, activeReview === index && styles.activeDot]}
/>
))}
</View>
  {appMode === "sell" && (
  <>
    <Text style={styles.nameText}>Seller Dashboard</Text>

    <View style={styles.sellerButtonsContainer}>
      <Pressable
        style={styles.sellerButton}
        onPress={() => goTo("AddProduct")}
      >
        <Ionicons
          name="add-circle-outline"
          size={26}
          color="#fff"
        />

        <Text style={styles.sellerButtonText}>
          Add Product
        </Text>
      </Pressable>

      <Pressable
        style={styles.sellerButton}
        onPress={() => goTo("PublishedAds")}
      >
        <Ionicons
          name="albums-outline"
          size={26}
          color="#fff"
        />

        <Text style={styles.sellerButtonText}>
          Published Ads
        </Text>
      </Pressable>
    </View>

    <View style={styles.sellerInfoCard}>
    <Text style={styles.nameText}>
        Sell your equipment easily
      </Text>

      <Text style={styles.sellerInfoText}>
        Upload products, manage ads, and reach students
        looking to rent or buy equipment.
      </Text>
    </View>
  </>
 )}
          
        </ScrollView>
        </LinearGradient>
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
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  helloText: {
    fontSize: 14,
    color: colors.deepPurple,
    fontWeight: "500",
  },
  nameText: {
    fontSize: 18,
    color: colors.deepPurple,
    fontWeight: "700",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
    width: "85%",
    alignSelf: "center",
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
  reviewsScrollContent: {
    paddingRight: 4,
  },
  
  reviewTextBox: {
    flex: 1,
    justifyContent: "center",
  },
  
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    width: width - 28,
    marginRight: 0,
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
    marginTop: 8,
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
    backgroundColor: "#fffbfb",
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
  sellerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  
  sellerButton: {
    width: "48%",
    backgroundColor: "#ff2d98",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
  },
  
  sellerButtonText: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 8,
    fontSize: 15,
  },
  
  sellerInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  
  sellerInfoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 8,
  },
  
  sellerInfoText: {
    color: "#777",
    lineHeight: 21,
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
  sectioncategory: {
    fontSize: 13,
    fontWeight: "650",
    color: colors.deepPurple,
    marginBottom: 10,
    marginTop: 6,
  },
  addCartButton:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#20B15A",
    paddingHorizontal:10,
    paddingVertical:6,
    borderRadius:12,
    },
    
    addCartText:{
    color:"#fff",
    fontSize:12,
    fontWeight:"700",
    marginLeft:3,
    },
});
