import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";

const data = [
  { id: "1", name: "Camera Canon", price: "150 EGP", type: "Rent / Buy" },
  { id: "2", name: "Tripod Stand", price: "50 EGP", type: "Rent / Buy" },
  { id: "3", name: "Lighting Kit", price: "120 EGP", type: "Rent / Buy" },
  { id: "4", name: "Microphone", price: "80 EGP", type: "Rent / Buy" },
];

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LinearGradient colors={["#d9c6e6", "#f7eff2"]} style={styles.screen}>
      <View style={styles.container}>
        
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={22} color="#777" />
          <TextInput
            placeholder="Search..."
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.resultsText}>
          Showing {filtered.length} results
        </Text>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          )}
        />

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  searchRow: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  resultsText: {
    marginBottom: 10,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    color: colors.deepPurple,
  },
  price: {
    color: "#777",
  },
  cancel: {
    textAlign: "center",
    marginTop: 20,
    color: colors.deepPurple,
    fontWeight: "bold",
  },
});