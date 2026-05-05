import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Pressable,
  TextInput, ScrollView, ActivityIndicator, Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";
import { API } from "../constants/api";

export default function ShippingAddressScreen() {
  const navigation = useNavigation();
  const { userToken } = useAuth();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // API: GET /user/address - gets saved address
    const getAddress = async () => {
      try {
        const response = await fetch(API.address, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        if (data) {
          setAddress(data.address || "");
          setCity(data.city || "");
          setPhone(data.phone || "");
          setPostcode(data.postcode || "");
        }
      } catch (err) {
        console.log("Error fetching address");
      }
    };
    getAddress();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // API: PUT /user/address - saves the shipping address
      const response = await fetch(API.address, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          address, city, phone,
          postcode, country: "Egypt",
        }),
      });
      if (response.ok) {
        // No API - goes back after saving
        navigation.goBack();
      }
    } catch (err) {
      console.log("Error saving address");
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
        <Text style={styles.headerTitle}>Shipping Address</Text>
      </View>

      <ScrollView style={styles.form}>

        {/* No API - just input fields */}
        <Text style={styles.label}>Country</Text>
        <View style={styles.countryRow}>
          <Text style={styles.countryText}>🇪🇬  Egypt</Text>
        </View>

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Town / City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+20 xxx xxx xxxx"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Postcode</Text>
        <TextInput
          style={styles.input}
          value={postcode}
          onChangeText={setPostcode}
          placeholder="Enter postcode"
          placeholderTextColor="#9ca3af"
          keyboardType="number-pad"
        />

        {/* API: PUT /user/address */}
        <Pressable
          style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.9 }, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.saveBtnText}>Save Changes</Text>}
        </Pressable>

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
  form: { padding: 20 },
  label: {
    fontSize: 13, color: colors.deepPurple,
    fontWeight: "700", marginBottom: 6, marginTop: 16,
  },
  input: {
    borderWidth: 1.5, borderColor: "#e5e7eb",
    borderRadius: 12, padding: 14,
    fontSize: 14, color: "#111",
    backgroundColor: colors.inputBg,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  countryRow: {
    borderWidth: 1.5, borderColor: "#e5e7eb",
    borderRadius: 12, padding: 14,
    backgroundColor: colors.inputBg,
  },
  countryText: { fontSize: 15, color: colors.deepPurple, fontWeight: "600" },
  saveBtn: {
    backgroundColor: colors.deepPurple,
    padding: 18, borderRadius: 14,
    alignItems: "center", marginTop: 28, marginBottom: 40,
    ...Platform.select({
      ios: { shadowColor: colors.deepPurple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});