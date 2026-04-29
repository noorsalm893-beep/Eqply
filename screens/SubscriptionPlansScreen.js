import React from "react";
import {
  Alert,
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

export default function SubscriptionPlansScreen({ navigation }) {
  const { user } = useAuth();

  const userRole = String(user?.role || "student").toLowerCase();

  const studentPlan = {
    title: "Student Plan",
    price: "50 EGP / month",
    description: "A simple plan made for students who want easier access to equipment.",
    features: [
      "Browse equipment بسهولة",
      "list more than 5 products",
      "Save favourites",
    ],
    buttonText: "Subscribe Now",
  };

  const freelancerPlan = {
    title: "Freelancer Plan",
    price: "100 EGP / month",
    description: "A plan designed for freelancers who need more flexibility and visibility.",
    features: [
      "More profile visibility",
      "Access to more equipment options",
      "Priority support",
      "Freelancer-focused tools",
    ],
    buttonText: "Subscribe Now",
  };

  const vendorPlan = {
    title: "Vendor Plan",
    price: "200 EGP / month",
    description: "A plan designed for vendors who want to manage and publish equipment ads.",
    features: [
      "Publish equipment ads",
      "Manage listings easily",
      "Priority support",
      "Better visibility for ads",
    ],
    buttonText: "Subscribe Now",
  };

  let currentPlan = studentPlan;

  if (userRole === "freelancer") {
    currentPlan = freelancerPlan;
  } else if (userRole === "vendor") {
    currentPlan = vendorPlan;
  }

  const handleSubscribe = () => {
    Alert.alert("Subscription", `${currentPlan.title} selected.`);
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

          <Text style={styles.title}>Subscription Plan</Text>
        </View>

        <Text style={styles.subtitle}>
          Your plan is shown based on your account type.
        </Text>

        <View style={styles.planCard}>
          <Text style={styles.planTitle}>{currentPlan.title}</Text>
          <Text style={styles.planPrice}>{currentPlan.price}</Text>
          <Text style={styles.planDescription}>{currentPlan.description}</Text>

          <View style={styles.featuresBox}>
            {currentPlan.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={colors.primaryPink}
                />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.subscribeButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeButtonText}>{currentPlan.buttonText}</Text>
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
    fontSize: 28,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  subtitle: {
    fontSize: 16,
    color: colors.deepPurple,
    marginBottom: 20,
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#eadbe0",
    marginBottom: 24,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primaryPink,
    marginBottom: 14,
  },
  planDescription: {
    fontSize: 15,
    color: "#6e6480",
    lineHeight: 22,
    marginBottom: 18,
  },
  featuresBox: {
    marginTop: 6,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  featureText: {
    fontSize: 15,
    color: colors.deepPurple,
    marginLeft: 10,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: colors.primaryPink,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.9,
  },
});