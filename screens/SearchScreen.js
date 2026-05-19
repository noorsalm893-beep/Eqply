import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const getProductImage = (item) => {
  if (item.image) return item.image;

  if (item.picture?.startsWith("http")) {
    return { uri: item.picture };
  }

  return {
    uri: `https://eqply-backend.onrender.com/uploads/${item.picture}`,
  };
};

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { searchProducts, cartCount, darkMode } = useAuth();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);
  
    return () => clearTimeout(delayDebounce);
  }, [search]);
  
  const handleSearch = async () => {
    try {
      if (!search.trim()) {
        setResults([]);
        return;
      }
  
      setIsLoading(true);
  
      const response = await searchProducts(search);
  
      if (response.ok) {
        setResults(response.products || []);
      } else {
        Alert.alert(
          "Search Error",
          response.error || "Failed to search products."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsLoading(false);
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
      <View style={styles.container}>
        
      <View style={styles.headerRow}>

<View style={styles.searchRow}>
  <Ionicons name="search-outline" size={22} color="#777" />

  <TextInput
    placeholder="Search..."
    style={styles.input}
    value={search}
    onChangeText={setSearch}
  />
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

        <Text style={styles.resultsText}>
            Showing {results.length} results
        </Text>
        {isLoading && (
        <ActivityIndicator
            size="large"
            color={colors.deepPurple}
            style={{ marginBottom: 16 }}
        />
        )}

        {!isLoading &&
          search.trim() &&
          results.length === 0 && (
         <Text style={styles.emptyText}>
           No products found.
         </Text>
        )}

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  item,
                })
              }
            >
              <Image source={getProductImage(item)} style={styles.productImage} />
          
              <View style={styles.cardContent}>
                <Text style={styles.title}>
                  {item.name || item.title}
                </Text>
          
                <Text style={styles.typeBadge}>
                {item.rentAvailable && item.buyAvailable
                  ? "Rent / Buy"
                  : item.rentAvailable
                  ? "Rent"
                  : "Buy"}
                </Text>
          
                <Text style={styles.price}>
                {item.buyPrice || item.rentOptions?.[0]?.price || "Price not set"} EGP
                </Text>
              </View>
            </Pressable>
          )}
        />

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  searchRow: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 0,
    flex: 1,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  resultsText: {
    marginBottom: 10,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: colors.deepPurple,
  },
  price: {
    color: "#777",
  },
  cancel: {
    textAlign: "center",
    marginTop: 20,
    color: colors.deepPurple,
    fontWeight: "bold",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  
  cardContent: {
    flex: 1,
  },
  
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#777",
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
    marginTop: 6,
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  
  cartButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    position: "relative",
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