import React, { useState } from "react";
import {
  Alert,
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

export default function AddressScreen({ navigation, route }) {
  const existingAddress = route?.params?.address;

  const [fullName, setFullName] = useState(existingAddress?.fullName || "");
  const [phone, setPhone] = useState(existingAddress?.phone || "");
  const [city, setCity] = useState(existingAddress?.city || "");
  const [area, setArea] = useState(existingAddress?.area || "");
  const [street, setStreet] = useState(existingAddress?.street || "");
  const [building, setBuilding] = useState(existingAddress?.building || "");
  const [notes, setNotes] = useState(existingAddress?.notes || "");
  const { darkMode } = useAuth();

  const isEditing = Boolean(existingAddress);

  const handleSaveAddress = () => {
    if (!fullName.trim() || !phone.trim() || !city.trim() || !street.trim()) {
      Alert.alert("Missing info", "Please enter name, phone, city, and street.");
      return;
    }

    Alert.alert(
      "Success",
      isEditing ? "Address updated successfully." : "Address added successfully."
    );

    navigation.goBack();
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
            <Text style={styles.title}>
              {isEditing ? "Edit Address" : "Add Address"}
            </Text>
            <Text style={styles.subtitle}>
              {isEditing
                ? "Update your delivery details"
                : "Add your delivery address"}
            </Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#9ca3af"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Alexandria"
            placeholderTextColor="#9ca3af"
            value={city}
            onChangeText={setCity}
          />

          <Text style={styles.label}>Area</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Smouha"
            placeholderTextColor="#9ca3af"
            value={area}
            onChangeText={setArea}
          />

          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            placeholder="Street name"
            placeholderTextColor="#9ca3af"
            value={street}
            onChangeText={setStreet}
          />

          <Text style={styles.label}>Building / Floor</Text>
          <TextInput
            style={styles.input}
            placeholder="Building number, floor, apartment"
            placeholderTextColor="#9ca3af"
            value={building}
            onChangeText={setBuilding}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Any extra details..."
            placeholderTextColor="#9ca3af"
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSaveAddress}
        >
          <Text style={styles.saveButtonText}>
            {isEditing ? "Update Address" : "Save Address"}
          </Text>
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
  notesInput: {
    height: 95,
  },
  saveButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 22,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.9,
  },
});