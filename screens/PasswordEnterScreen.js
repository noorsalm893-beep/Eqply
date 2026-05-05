import React, { useState } from "react";
import {
  View, Text, StyleSheet, Pressable,
  Platform, ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { colors } from "../constants/colors";

export default function PasswordEnterScreen() {
  const navigation = useNavigation();

  // API: GET /auth/profile - gets user name and profile image
  const { user } = useAuth();
  const [dots, setDots] = useState(0);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>

        <View style={styles.shapesContainer} pointerEvents="none">
          <View style={[styles.shapeLargePurple, styles.circlePurple]} />
          <View style={[styles.shapeTeal, styles.circleTeal]} />
          <View style={[styles.shapePink, styles.circlePink]} />
        </View>

        <View style={styles.avatarWrap}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>

        {/* API: GET /auth/profile - shows user name */}
        <Text style={styles.title}>
          Hello, {user?.name || "Basmala"} !!
        </Text>
        <Text style={styles.subtitle}>Type your password</Text>

        
        <View style={styles.dotsRow}>
          {[...Array(8)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < dots ? styles.dotFilled : styles.dotEmpty,
              ]}
            />
          ))}
        </View>

        
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 40, alignItems: "center" },
  shapesContainer: {
    height: 220, marginHorizontal: -24,
    marginBottom: 8, position: "relative", width: "120%",
  },
  shapeLargePurple: {
    position: "absolute", width: "110%", height: 400,
    borderRadius: 400, right: "-20%", top: "-30%",
  },
  circlePurple: { backgroundColor: colors.deepPurple },
  shapeTeal: {
    position: "absolute", width: 100, height: 100,
    borderRadius: 50, top: -20, left: -15,
  },
  circleTeal: { backgroundColor: colors.teal },
  shapePink: {
    position: "absolute", width: 130, height: 130,
    borderRadius: 65, bottom: -10, right: -50,
  },
  circlePink: { backgroundColor: colors.primaryPink },
  avatarWrap: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: colors.lightLavender,
    marginBottom: 16,
    alignItems: "center", justifyContent: "center",
    borderWidth: 3, borderColor: colors.primaryPink,
  },
  avatarEmoji: { fontSize: 40 },
  title: {
    fontSize: 24, fontWeight: "700",
    color: colors.deepPurple, marginBottom: 8,
  },
  subtitle: {
    fontSize: 15, color: colors.teal,
    marginBottom: 28,
  },
  dotsRow: { flexDirection: "row", gap: 14, marginBottom: 28 },
  dot: { width: 18, height: 18, borderRadius: 9 },
  dotFilled: { backgroundColor: colors.primaryPink },
  dotEmpty: { backgroundColor: colors.lightLavender },
  forgot: {
    fontSize: 14, color: colors.deepPurple,
    fontWeight: "600",
  },
});