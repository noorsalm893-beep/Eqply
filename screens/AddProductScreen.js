import React, { useState } from "react";
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

const categories = ["Media", "Engineering", "Fine Arts"];
const listingTypes = ["Rent", "Buy", "Rent / Buy"];

export default function AddProductScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [listingType, setListingType] = useState("Rent");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleAddProduct = () => {
    if (!title.trim() || !price.trim() || !location.trim()) {
      Alert.alert("Missing info", "Please enter product name, price, and location.");
      return;
    }

    Alert.alert("Success", "Product added successfully.");
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
            <Text style={styles.title}>Add Product</Text>
            <Text style={styles.subtitle}>Publish your equipment ad</Text>
          </View>
        </View>

        <View style={styles.imageBox}>
          <Ionicons name="image-outline" size={46} color={colors.deepPurple} />
          <Text style={styles.imageText}>Add product image</Text>
          <Text style={styles.imageHint}>Image upload will be connected later</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Makita Drill"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: 380EGP"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
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
          <Text style={styles.addButtonText}>Add Product</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
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
  imageBox: {
    backgroundColor: "#ffffffcc",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eadbe0",
    marginBottom: 18,
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
});