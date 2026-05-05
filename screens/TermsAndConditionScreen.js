import React from "react";
import {
  View, Text, StyleSheet, Pressable, ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";

export default function TermsScreen() {
  const navigation = useNavigation();

  // No API here - static content
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {/* No API - goes back */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Terms and Conditions</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>EQPLY</Text>
        </View>

        {/* No API - static content */}
        <Text style={styles.intro}>
          Eqply is a platform that connects users to rent and list equipment.
          We do not own or guarantee any listed items.
        </Text>

        {[
          "Users are responsible for providing accurate information and using the platform honestly.",
          "Renters are responsible for returning equipment in the same condition, and covering any damage or loss.",
          "Lenders are responsible for accurate listings, pricing, and availability.",
          "All transactions are between users; Eqply is not liable for disputes, damages, or misuse.",
          "Payments and refunds are subject to each listing's terms and conditions.",
          "Eqply may suspend or remove accounts that violate these terms.",
        ].map((term, index) => (
          <View key={index} style={styles.termItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>{index + 1}</Text>
            </View>
            <Text style={styles.termText}>{term}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing to use Eqply, you accept these terms.
          </Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>
            If you need help or have any questions, feel free to contact us.
          </Text>
          <Text style={styles.email}>hello@eqply.com</Text>
        </View>
      </ScrollView>

      {/* Bottom Nav - No API */}
      <View style={styles.bottomNav}>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.navIcon}>🛒</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Favorites")}>
          <Text style={styles.navIcon}>🤍</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navIcon}>🏠</Text>
        </Pressable>
        <Pressable><Text style={styles.navIcon}>☰</Text></Pressable>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.navIcon}>👤</Text>
        </Pressable>
      </View>
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
  scroll: { padding: 24, paddingBottom: 100 },
  logoContainer: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: colors.lightLavender,
    alignItems: "center", justifyContent: "center",
    alignSelf: "center", marginBottom: 24,
  },
  logoText: {
    fontSize: 13, fontWeight: "800",
    color: colors.deepPurple, letterSpacing: 2,
  },
  intro: {
    fontSize: 15, color: "#4b5563",
    lineHeight: 24, marginBottom: 24,
    textAlign: "center",
  },
  termItem: {
    flexDirection: "row", gap: 12,
    marginBottom: 16, alignItems: "flex-start",
  },
  bullet: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.deepPurple,
    alignItems: "center", justifyContent: "center",
    marginTop: 2,
  },
  bulletText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  termText: {
    flex: 1, fontSize: 14,
    color: "#4b5563", lineHeight: 22,
  },
  footer: {
    backgroundColor: colors.lightLavender,
    borderRadius: 14, padding: 16,
    marginTop: 24, marginBottom: 16,
  },
  footerText: {
    fontSize: 14, color: colors.deepPurple,
    fontWeight: "600", textAlign: "center", lineHeight: 20,
  },
  contactBox: { alignItems: "center", marginTop: 8 },
  contactText: { fontSize: 13, color: "#9ca3af", textAlign: "center" },
  email: {
    fontSize: 14, fontWeight: "700",
    color: colors.deepPurple, marginTop: 6,
  },
  bottomNav: {
    flexDirection: "row", justifyContent: "space-around",
    padding: 14, backgroundColor: "#fff",
    borderTopWidth: 1, borderTopColor: colors.lightLavender,
  },
  navIcon: { fontSize: 22 },
});