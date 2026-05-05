import React, { useState } from "react";
import {
  View, Text, StyleSheet, Pressable, TextInput,
  ScrollView, ActivityIndicator, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function EditListingScreen() {
  const navigation = useNavigation();
  const { userToken } = useAuth();
  const [type, setType] = useState("Buy");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    // API: POST /upload-image - uploads equipment image
    console.log("Pick image");
  };

  const handlePublish = async () => {
    if (!price || !description || !condition) return;
    setLoading(true);
    try {
      // API: POST /listing/create - creates new listing
      const response = await fetch(API.createListing, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          type, price,
          quantity: type === "Buy" ? quantity : null,
          description, condition,
        }),
      });
      if (response.ok) {
        // No API - goes back after publishing
        navigation.goBack();
      }
    } catch (err) {
      console.log("Error publishing listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {/* No API - goes back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {type === "Rent" ? "Rent Equipment" : "Sell Equipment"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* API: POST /upload-image */}
        <Pressable style={styles.imagePicker} onPress={handlePickImage}>
          <View style={styles.plusCircle}>
            <Text style={styles.plusIcon}>+</Text>
          </View>
          <Text style={styles.imageText}>Add Photo</Text>
        </Pressable>

        {/* No API - selecting type */}
        <View style={styles.toggleRow}>
          <Pressable
            style={[styles.toggleBtn, type === "Buy" && styles.toggleActive]}
            onPress={() => setType("Buy")}>
            <Text style={[styles.toggleText, type === "Buy" && styles.toggleTextActive]}>
              Buy
            </Text>
          </Pressable>
          <Pressable
            style={[styles.toggleBtn, type === "Rent" && styles.toggleActive]}
            onPress={() => setType("Rent")}>
            <Text style={[styles.toggleText, type === "Rent" && styles.toggleTextActive]}>
              Rent
            </Text>
          </Pressable>
        </View>

        {/* No API - input fields */}
        <Text style={styles.label}>Set Price (EGP)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          placeholderTextColor="#9ca3af"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Quantity - No API */}
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.qtyRow}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>
          <View style={styles.qtyNumBox}>
            <Text style={styles.qtyNum}>{quantity}</Text>
          </View>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>

        {/* No API - just typing */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe your equipment"
          placeholderTextColor="#9ca3af"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Condition</Text>
        <TextInput
          style={styles.textArea}
          placeholder="e.g. New, Good, Fair"
          placeholderTextColor="#9ca3af"
          multiline
          value={condition}
          onChangeText={setCondition}
        />

        <View style={styles.btnRow}>
          {/* No API - goes back */}
          <Pressable
            style={({ pressed }) => [styles.cancelBtn, pressed && { opacity: 0.8 }]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          {/* API: POST /listing/create */}
          <Pressable
            style={({ pressed }) => [
              styles.publishBtn,
              pressed && { opacity: 0.9 },
              loading && { opacity: 0.7 },
            ]}
            onPress={handlePublish}
            disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.publishText}>Publish</Text>}
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.deepPurple,
    padding: 16, paddingTop: 50,
    flexDirection: "row", alignItems: "center", gap: 14,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  backIcon: { fontSize: 20, color: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },
  scroll: { padding: 20, paddingBottom: 60 },
  imagePicker: {
    backgroundColor: colors.lightLavender,
    borderRadius: 16, height: 180,
    alignItems: "center", justifyContent: "center",
    marginBottom: 20,
    borderWidth: 2, borderColor: colors.deepPurple,
    borderStyle: "dashed",
  },
  plusCircle: {
    width: 44, height: 44, borderRadius: 22,
    borderWidth: 1.5, borderColor: colors.deepPurple,
    alignItems: "center", justifyContent: "center",
  },
  plusIcon: { fontSize: 24, color: colors.deepPurple },
  imageText: {
    fontSize: 14, color: colors.deepPurple,
    marginTop: 8, fontWeight: "600",
  },
  toggleRow: {
    flexDirection: "row", gap: 12,
    marginBottom: 20,
    backgroundColor: colors.lightLavender,
    borderRadius: 14, padding: 4,
  },
  toggleBtn: {
    flex: 1, paddingVertical: 12,
    borderRadius: 12, alignItems: "center",
  },
  toggleActive: { backgroundColor: colors.deepPurple },
  toggleText: { fontSize: 15, color: "#6b7280", fontWeight: "600" },
  toggleTextActive: { color: "#fff" },
  label: {
    fontSize: 14, color: colors.deepPurple,
    fontWeight: "700", marginBottom: 8, marginTop: 4,
  },
  input: {
    borderWidth: 1.5, borderColor: "#e5e7eb",
    borderRadius: 12, padding: 14,
    fontSize: 14, color: "#111",
    backgroundColor: colors.inputBg,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 16 },
  qtyBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.lightLavender,
    alignItems: "center", justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 20, color: colors.deepPurple, fontWeight: "700",
  },
  qtyNumBox: {
    width: 44, height: 40, borderRadius: 10,
    backgroundColor: colors.lightLavender,
    alignItems: "center", justifyContent: "center",
  },
  qtyNum: {
    fontSize: 18, fontWeight: "700", color: colors.deepPurple,
  },
  textArea: {
    borderWidth: 1.5, borderColor: "#e5e7eb",
    borderRadius: 12, padding: 14,
    fontSize: 14, color: "#111",
    minHeight: 100, textAlignVertical: "top",
    backgroundColor: colors.inputBg,
    marginBottom: 16,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  btnRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  cancelBtn: {
    flex: 1, padding: 16, borderRadius: 14,
    borderWidth: 1.5, borderColor: "#e5e7eb",
    alignItems: "center",
  },
  cancelText: { fontSize: 15, color: "#6b7280", fontWeight: "600" },
  publishBtn: {
    flex: 1, padding: 16, borderRadius: 14,
    backgroundColor: colors.deepPurple, alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: colors.deepPurple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  publishText: { fontSize: 15, color: "#fff", fontWeight: "700" },
});