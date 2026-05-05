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

const trackingSteps = [
  {
    id: 1,
    title: "Order Confirmed",
    description: "Your order has been confirmed successfully.",
    completed: true,
  },
  {
    id: 2,
    title: "Preparing Equipment",
    description: "The owner is preparing the equipment.",
    completed: true,
  },
  {
    id: 3,
    title: "Out for Delivery",
    description: "Your equipment is on the way.",
    completed: false,
  },
  {
    id: 4,
    title: "Delivered",
    description: "Order delivered successfully.",
    completed: false,
  },
];

export default function TrackingOrderScreen({ navigation }) {
  return (
    <LinearGradient colors={["#d9c6e6", "#f8f1f3"]} style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <View>
            <Text style={styles.title}>Tracking Order</Text>
            <Text style={styles.subtitle}>Follow your equipment delivery</Text>
          </View>
        </View>

        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order #EQP-1024</Text>
          <Text style={styles.orderText}>Makita Drill</Text>
          <Text style={styles.orderText}>Estimated delivery: Today, 6:00 PM</Text>
        </View>

        <View style={styles.timelineCard}>
          {trackingSteps.map((step, index) => (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.stepCircle,
                    step.completed && styles.stepCircleCompleted,
                  ]}
                >
                  {step.completed && (
                    <Ionicons name="checkmark" size={15} color="#fff" />
                  )}
                </View>

                {index !== trackingSteps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      step.completed && styles.stepLineCompleted,
                    ]}
                  />
                )}
              </View>

              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    step.completed && styles.stepTitleCompleted,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable style={styles.helpButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" />
          <Text style={styles.helpText}>Contact Support</Text>
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
    fontSize: 26,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  subtitle: {
    fontSize: 14,
    color: "#6f6d8c",
    marginTop: 3,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
    marginBottom: 18,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 15,
    color: "#6f6d8c",
    marginBottom: 6,
  },
  timelineCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  stepRow: {
    flexDirection: "row",
    minHeight: 86,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 14,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#d8d2df",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleCompleted: {
    backgroundColor: "#ff2d98",
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#d8d2df",
    marginTop: 5,
  },
  stepLineCompleted: {
    backgroundColor: "#ff2d98",
  },
  stepContent: {
    flex: 1,
    paddingBottom: 18,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#9c8db0",
    marginBottom: 5,
  },
  stepTitleCompleted: {
    color: colors.deepPurple,
  },
  stepDescription: {
    fontSize: 14,
    color: "#6f6d8c",
    lineHeight: 20,
  },
  helpButton: {
    marginTop: 22,
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  helpText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 8,
  },
});