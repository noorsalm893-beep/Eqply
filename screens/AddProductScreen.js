import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const categories = ["Media", "Engineering", "Fine Arts"];
const listingTypes = ["Rent", "Buy", "Rent / Buy"];

export default function AddProductScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [buyPrice, setBuyPrice] = useState("");   
  const [category, setCategory] = useState("Engineering");
  const [listingType, setListingType] = useState("Rent");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useAuth();
  const [productImage, setProductImage] = useState(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
  
    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
    }
  };
  const {
    uploadProduct,
    subscription,
    getMyProducts,
    darkMode,
  } = useAuth();
  const [uploadedCount, setUploadedCount] = useState(0);
  useEffect(() => {
    loadUploadedCount();
  }, []);
  
  const loadUploadedCount = async () => {
    const response = await getMyProducts();
  
    if (response.ok) {
      setUploadedCount(
        response.products?.length || 0
      );
    }
  };

  const [isUploading, setIsUploading] = useState(false);
  const handleAddProduct = async () => {
    try {
      if (!title.trim() || !location.trim()) {
        Alert.alert(
          "Missing info",
          "Please enter product name and location."
        );
        return;
      }
  
      if (listingType === "Rent" && !rentPrice.trim()) {
        Alert.alert("Missing info", "Please enter rent price.");
        return;
      }
  
      if (listingType === "Buy" && !buyPrice.trim()) {
        Alert.alert("Missing info", "Please enter buy price.");
        return;
      }
  
      if (
        listingType === "Rent / Buy" &&
        (!rentPrice.trim() || !buyPrice.trim())
      ) {
        Alert.alert(
          "Missing info",
          "Please enter both prices."
        );
        return;
      }
  
      if (
        user?.role === "student" &&
        !subscription.isSubscribed &&
        uploadedCount >= 5
      ) {
        Alert.alert(
          "Subscription Required",
          "Free students can upload only 5 products."
        );
  
        navigation.navigate("SubscriptionPlans");
        return;
      }
  
      setIsUploading(true);
  
      const payload = {
        name: title,
        category,
        location,
        description,
        type: listingType,
        rentPrice:
          listingType === "Rent" ||
          listingType === "Rent / Buy"
            ? rentPrice
            : undefined,
        buyPrice:
          listingType === "Buy" ||
          listingType === "Rent / Buy"
            ? buyPrice
            : undefined,
        imageUrl: "https://via.placeholder.com/300",
      };
  
      const response = await uploadProduct(payload);
  
      if (response.ok) {
        Alert.alert(
          "Success",
          "Product uploaded successfully."
        );
  
        navigation.goBack();
      } else {
        Alert.alert(
          "Upload Error",
          response.error || "Failed to upload product."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <LinearGradient
colors={
darkMode
? ["#1A1625","#2A2338"]
: ["#d9c6e6","#f8f1f3"]
}
style={styles.screen}
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
            <Text style={styles.title}>Add Product</Text>
            <Text style={styles.subtitle}>Publish your equipment ad</Text>
          </View>
        </View>


        <Pressable style={styles.imageBox} onPress={pickImage}>
  {productImage ? (
    <Image
      source={{ uri: productImage }}
      style={styles.previewImage}
    />
  ) : (
    <>
      <Ionicons name="image-outline" size={46} color={colors.deepPurple} />
      <Text style={styles.imageText}>Add product image</Text>
      <Text style={styles.imageHint}>Tap to choose from gallery</Text>
    </>
  )}
</Pressable>


        <View style={styles.formCard}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Makita Drill"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Listing Type</Text>
          <View style={styles.chipsRow}>
            {listingTypes.map((type) => (
              <Pressable
                key={type}
                style={[
                  styles.chip,
                  listingType === type && styles.chipSelected,
                ]}
                onPress={() => setListingType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    listingType === type && styles.chipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>

          {(listingType === "Rent" || listingType === "Rent / Buy") && (
  <>
    <Text style={styles.label}>Rent Price</Text>
    <TextInput
      style={styles.input}
      placeholder="Example: 100 EGP / day"
      placeholderTextColor="#9ca3af"
      keyboardType="numeric"
      value={rentPrice}
      onChangeText={setRentPrice}
    />
  </>
)}

{(listingType === "Buy" || listingType === "Rent / Buy") && (
  <>
    <Text style={styles.label}>Buy Price</Text>
    <TextInput
      style={styles.input}
      placeholder="Example: 1500 EGP"
      placeholderTextColor="#9ca3af"
      keyboardType="numeric"
      value={buyPrice}
      onChangeText={setBuyPrice}
    />
  </>
)}

          <Text style={styles.label}>Category</Text>
          <View style={styles.chipsRow}>
            {categories.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.chip,
                  category === item && styles.chipSelected,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    category === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Alexandria"
            placeholderTextColor="#9ca3af"
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Write a short description..."
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleAddProduct}
        >
          <Text style={styles.addButtonText}>{isUploading ? "Uploading..." : "Add Product"}</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  imageBox: {
    height: 170,
    backgroundColor: "#ffffffcc",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eadbe0",
    marginBottom: 16,
    overflow: "hidden",
  },
  imageText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.deepPurple,
    marginTop: 10,
  },
  imageHint: {
    fontSize: 13,
    color: "#7b7280",
    marginTop: 5,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#f7eff2",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111",
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  chip: {
    backgroundColor: "#f1e7ed",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: "#fff",
    borderColor: "#ff2d98",
  },
  chipText: {
    color: colors.deepPurple,
    fontSize: 13,
    fontWeight: "700",
  },
  chipTextSelected: {
    color: "#ff2d98",
  },
  addButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 22,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

uploadText:{
marginTop:8,
fontWeight:"700",
color:colors.deepPurple
},
contentContainer: {
  paddingHorizontal: 18,
  paddingTop: 50,
  paddingBottom: 160,
},
});