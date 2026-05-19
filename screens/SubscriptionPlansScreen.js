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
  const { user, subscription, setSubscription, darkMode } = useAuth();

  const plansByRole = {
    student: [
      {
        title: "🎒 Student Free",
        price: "Free",
        tag: "Up to 5 listings",
        features: [
          "Browse all listings",
          "Rent tools nearby",
          "24/7 support",
          "Basic search filters",
          "Upload up to 5 products",
        ],
      },
      {
        title: "🎒 Student Plus",
        price: "EGP 49 / month",
        tag: "Unlimited listings",
        features: [
          "Everything in Student Free",
          "Upload unlimited products",
          "Priority bookings",
          "Advanced search filters",
        ],
      },
    ],
    freelancer: [
      {
        title: "⚡ Freelancer Free",
        price: "Free",
        tag: "Basic tools",
        features: [
          "Browse all listings",
          "Rent tools nearby",
          "Upload limited listings",
          "Basic search filters",
        ],
      },
      {
        title: "⚡ Freelancer Pro",
        price: "EGP 49 / month",
        tag: "Most Popular",
        features: [
          "Everything in Free plan",
          "Priority bookings",
          "Unlimited listings",
          "Analytics dashboard",
        ],
      },
    ],
    vendor: [
      {
        title: "🏪 Vendor Basic",
        price: "Free",
        tag: "Starter storefront",
        features: [
          "Browse all listings",
          "Add basic listings",
          "Manage published ads",
          "Basic support",
        ],
      },
      {
        title: "🏪 Vendor Suite",
        price: "EGP 120 / month",
        tag: "Business plan",
        features: [
          "Everything in Vendor Basic",
          "Storefront page",
          "Bulk upload tools",
          "Featured placement",
        ],
      },
    ],
  };
  
  const userRole = String(user?.role || "student").toLowerCase();
  const currentPlans = plansByRole[userRole] || plansByRole.student;
  
  const handleSubscribe = (plan) => {
    if (plan.price === "Free") {
      Alert.alert("Current Plan", "You are already on the free plan.");
      return;
    }
  
    setSubscription({
      plan: plan.title,
      isSubscribed: true,
    });
  
    Alert.alert("Subscribed", `${plan.title} activated successfully.`);
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

        {currentPlans.map((plan) => (
       <View key={plan.title} style={styles.planCard}>
       <Text style={styles.planTitle}>{plan.title}</Text>

       <Text style={styles.planTag}>{plan.tag}</Text>

       <Text style={styles.planPrice}>{plan.price}</Text>

          {plan.features.map((feature) => (
       <Text key={feature} style={styles.featureText}>
         • {feature}
       </Text>
     ))}

       <Pressable
          style={styles.subscribeButton}
          onPress={() => handleSubscribe(plan)}
        >
      <Text style={styles.subscribeButtonText}>
      {plan.price === "Free"
        ? "Current Plan"
        : subscription?.plan === plan.title
        ? "Subscribed"
        : "Subscribe"}
      </Text>
    </Pressable>
  </View>
))}
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
  planTag: {
    alignSelf: "flex-start",
    backgroundColor: "#f1e7ed",
    color: "#ff2d98",
    fontSize: 13,
    fontWeight: "800",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 10,
  },
});