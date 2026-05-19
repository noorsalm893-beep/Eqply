import React, { useState } from "react";
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

const categories = ["All", "Media", "Engineering", "Fine Arts"];
const listingTypes = ["All", "Rent", "Buy", "Rent / Buy"];
const sortOptions = ["Newest", "Lowest Price", "Highest Price", "Most Popular"];

export default function FilterSortScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const { darkMode } = useAuth();

  const handleApply = () => {
    Alert.alert("Filters Applied", "Your selected filters have been applied.");
    navigation.goBack();
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedSort("Newest");
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>

          <View>
            <Text style={styles.title}>Filter & Sort</Text>
            <Text style={styles.subtitle}>Find the equipment you need faster</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.chipsRow}>
            {categories.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.chip,
                  selectedCategory === item && styles.chipSelected,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Listing Type</Text>
          <View style={styles.chipsRow}>
            {listingTypes.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.chip,
                  selectedType === item && styles.chipSelected,
                ]}
                onPress={() => setSelectedType(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedType === item && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sort By</Text>

          {sortOptions.map((item) => (
            <Pressable
              key={item}
              style={styles.sortRow}
              onPress={() => setSelectedSort(item)}
            >
              <Text style={styles.sortText}>{item}</Text>

              <Ionicons
                name={
                  selectedSort === item
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={22}
                color={
                  selectedSort === item
                    ? "#ff2d98"
                    : colors.deepPurple
                }
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.buttonsRow}>
          <Pressable style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>

          <Pressable style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyText}>Apply</Text>
          </Pressable>
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
    fontSize: 27,
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#f1e7ed",
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: "#fff",
    borderColor: "#ff2d98",
  },
  chipText: {
    color: colors.deepPurple,
    fontSize: 13,
    fontWeight: "700",
  },
  chipTextSelected: {
    color: "#ff2d98",
  },
  sortRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sortText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.deepPurple,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  resetButton: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  resetText: {
    color: colors.deepPurple,
    fontSize: 17,
    fontWeight: "700",
  },
  applyButton: {
    width: "47%",
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});