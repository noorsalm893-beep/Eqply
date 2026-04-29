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

const AVATARS = [
  require("../assets/ava1.jpeg"),
  require("../assets/ava2.jpeg"),
  require("../assets/ava3.jpeg"),
  require("../assets/ava4.jpeg"),
];

export default function EditProfileScreen({ navigation }) {
  const { user, updateUserProfile } = useAuth();

  const displayRole = String(user?.role || "student").toLowerCase();

  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setName(user?.name || user?.fullName || user?.username || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setLocation(user?.location || "");
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Missing info", "Please enter your name.");
      return;
    }

    if (displayRole === "vendor" && !location.trim()) {
      Alert.alert("Missing info", "Location is required for vendors.");
      return;
    }

    try {
      setIsSaving(true);

      const result = await updateUserProfile({
        name: name.trim(),
        phone: phone.trim(),
        location: displayRole === "vendor" ? location.trim() : "",
      });

      if (!result?.ok) {
        Alert.alert("Error", result?.error || "Failed to update profile.");
        return;
      }

      Alert.alert("Success", "Profile updated successfully.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LinearGradient colors={["#d9c6e6", "#f7eff2"]} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <View style={styles.avatarSection}>
          <Image source={AVATARS[selectedAvatar]} style={styles.mainAvatar} />
          <Text style={styles.avatarTitle}>Choose Avatar</Text>

          <View style={styles.avatarRow}>
            {AVATARS.map((avatar, index) => (
              <Pressable
                key={index}
                style={[
                  styles.avatarOption,
                  selectedAvatar === index && styles.avatarOptionSelected,
                ]}
                onPress={() => setSelectedAvatar(index)}
              >
                <Image source={avatar} style={styles.avatarImage} />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={email}
            editable={false}
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
          />

          {displayRole === "vendor" && (
            <>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter your location"
                placeholderTextColor="#9ca3af"
              />
            </>
          )}

          <Text style={styles.label}>Role</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>
              {displayRole.charAt(0).toUpperCase() + displayRole.slice(1)}
            </Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.buttonPressed,
            isSaving && styles.buttonDisabled,
          ]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Saving..." : "Save Changes"}
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  avatarSection: {
    backgroundColor: "#ffffffcc",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  mainAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 14,
  },
  avatarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 12,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  avatarOption: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  avatarOptionSelected: {
    borderColor: colors.primaryPink,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.deepPurple,
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111",
    marginBottom: 12,
  },
  disabledInput: {
    opacity: 0.65,
  },
  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#d9c6e6",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  roleBadgeText: {
    color: colors.deepPurple,
    fontSize: 15,
    fontWeight: "600",
  },
  saveButton: {
    marginTop: 22,
    backgroundColor: colors.primaryPink,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});