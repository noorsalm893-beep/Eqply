import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const COLORS = {
  background: "#FDF8F8",
  title: "#2A005F",
  tagline: "#513682",
  buttonBg: "#FF007F",
  buttonShadow: "#E0006F",
};

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Image
          source={require("../assets/eqply-logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>EQPLY</Text>
        <Text style={styles.tagline}>
          Rent. Lend. Borrow. Buy{"\n"}
          From students and vendors{"\n"}
          around you.
        </Text>
      </View>

      <View style={styles.buttonWrap}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate("Login" as never)}
        >
          <Text style={styles.buttonText}>Let's get started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 32,
  },
  logoSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    marginBottom: 48,
  },
  logoImage: {
    width: 140,
    height: 140,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.title,
    letterSpacing: 2,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 17,
    fontWeight: "400",
    color: COLORS.tagline,
    lineHeight: 26,
  },
  buttonWrap: {
    paddingBottom: 48,
    paddingTop: 24,
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.buttonBg,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 28,
    minWidth: 260,
    alignItems: "center",
    shadowColor: COLORS.buttonShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 10,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});