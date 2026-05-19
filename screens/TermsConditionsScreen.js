import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function TermsConditionsScreen({ navigation }) {
  const { darkMode } = useAuth();
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
            <Text style={styles.title}>Terms & Conditions</Text>
            <Text style={styles.subtitle}>Please read carefully</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Account Responsibility</Text>
          <Text style={styles.paragraph}>
            Users are responsible for providing accurate information during registration
            and keeping their account details secure.
          </Text>

          <Text style={styles.sectionTitle}>2. Renting & Buying Equipment</Text>
          <Text style={styles.paragraph}>
            Eqply allows users to publish, rent, or buy equipment. Users must make
            sure that product details, prices, and availability are accurate.
          </Text>

          <Text style={styles.sectionTitle}>3. Equipment Condition</Text>
          <Text style={styles.paragraph}>
            Equipment owners should provide clear information about the condition of
            their items. Renters and buyers should inspect equipment before confirming
            the transaction.
          </Text>

          <Text style={styles.sectionTitle}>4. Payments</Text>
          <Text style={styles.paragraph}>
            Payment features may be handled through supported payment methods. Users
            must follow payment instructions and keep proof of payment when needed.
          </Text>

          <Text style={styles.sectionTitle}>5. Delivery & Returns</Text>
          <Text style={styles.paragraph}>
            Delivery, pickup, and return arrangements should be agreed on clearly
            between both parties before completing the transaction.
          </Text>

          <Text style={styles.sectionTitle}>6. User Safety</Text>
          <Text style={styles.paragraph}>
            Users should avoid sharing sensitive personal information and should report
            suspicious activity or misuse of the platform.
          </Text>

          <Text style={styles.sectionTitle}>7. Platform Changes</Text>
          <Text style={styles.paragraph}>
            Eqply may update its features, rules, and terms in the future to improve
            user experience and platform safety.
          </Text>
        </View>
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
    fontSize: 24,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  subtitle: {
    fontSize: 14,
    color: "#6f6d8c",
    marginTop: 3,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 8,
    marginTop: 14,
  },
  paragraph: {
    fontSize: 15,
    color: "#6f6d8c",
    lineHeight: 22,
  },
});