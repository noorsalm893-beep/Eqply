import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import RatingModal from "../components/RatingModal";

export default function SettingsScreen({ navigation }) {
  const {
    signOut,
    updatePreferences,
    darkMode,
    setDarkMode,
  } = useAuth();
  const [ratingVisible, setRatingVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const handleComingSoon = (title) => {
    Alert.alert(title, "This feature will be added later.");
  };
  const handleUpdatePreferences = async (updates) => {
    try {
      setIsSavingPreferences(true);
  
      const response = await updatePreferences(updates);
  
      if (!response.ok) {
        Alert.alert(
          "Error",
          response.error || "Failed to update preferences."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsSavingPreferences(false);
    }
  };

  return (
    <LinearGradient
  colors={
    darkMode
      ? ["#1A1625", "#2A2338"]
      : ["#d9c6e6", "#f7eff2"]
  }
  style={styles.screen}
>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.innerCard}>
            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.rowText}>Edit Profile</Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={colors.deepPurple}
              />
            </Pressable>

            <Pressable
              style={[styles.row, styles.rowNoBorder]}
              onPress={() => navigation.navigate("Subscriptions")}
            >
              <Text style={styles.rowText}>Subscription Plans</Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={colors.deepPurple}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.innerCard}>
            <View style={styles.row}>
            <Text style={styles.rowText}>Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={async (value) => {
                  setNotificationsEnabled(value);
                
                  await handleUpdatePreferences({
                    notifications: value,
                  });
                }}
                trackColor={{ false: "#d9c6e6", true: "#f48acb" }}
                thumbColor="#fff"
              />
            </View>

            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate("Language")}>

              <Text style={styles.rowText}>Language</Text>

              <View style={styles.rowRight}>
              <Text style={styles.secondaryText}>
                 Select
              </Text>
                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={colors.deepPurple}
                />
              </View>
            </Pressable>

            <View style={[styles.row, styles.rowNoBorder]}>
            <Text style={styles.rowText}>Dark Mode</Text>
              <Switch
                 value={darkMode}
                 onValueChange={async (value) => {
                 setDarkMode(value);

                 await handleUpdatePreferences({
                 darkMode: value,
                });
              }}
                trackColor={{ false: "#d9c6e6", true: "#f48acb" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Support</Text>

        <View style={styles.innerCard}>
            <Pressable style={styles.row} onPress={() => navigation.navigate("HelpCenter")}>
            <Text style={styles.rowText}>Help Center</Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={colors.deepPurple}
                onPress={() => navigation.navigate("HelpCenter")}
              />
            </Pressable>
            <Pressable style={styles.row} onPress={() => setRatingVisible(true)}>
            <Text style={styles.rowText}>Rate App</Text>
              <Ionicons name="chevron-forward" size={22} color={colors.deepPurple} />
            </Pressable>

            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate("ContactUs")}
            >
              <Text style={styles.rowText}>Contact Us</Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={colors.deepPurple}
                onPress={() => navigation.navigate("ContactUs")}
              />
            </Pressable>

            <Pressable
              style={[styles.row, styles.rowNoBorder]}
              onPress={() => navigation.navigate("TermsConditions")}
            >
              <Text style={styles.rowText}>Terms & Conditions</Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={colors.deepPurple}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        <RatingModal visible={ratingVisible} onClose={() => setRatingVisible(false)}/>
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ffffffcc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  sectionCard: {
    borderRadius: 22,
    padding: 14,
    marginBottom: 22,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    paddingLeft: 4,
  },
  innerCard: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  row: {
    minHeight: 62,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0e6eb",
  },
  rowNoBorder: {
    borderBottomWidth: 0,
  },
  rowText: {
    fontSize: 17,
    fontWeight: "600",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryText: {
    fontSize: 16,
    color: "#9c8db0",
    marginRight: 8,
  },
  logoutButton: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.9,
  },
});