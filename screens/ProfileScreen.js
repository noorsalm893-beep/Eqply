import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || user?.fullName || user?.username || "—"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "—"}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user?.phone || "—"}</Text>
      </View>

      <Pressable style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutPressed]} onPress={signOut}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: colors.primaryPink,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutPressed: {
    opacity: 0.85,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
