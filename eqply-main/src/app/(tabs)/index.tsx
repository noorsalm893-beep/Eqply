import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="home" size={48} color="#2563eb" />
        </View>
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.subtitle}>Mariam Mohamed...</Text>

        <Link href={"/(tabs)/register" as Href} asChild>
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Ionicons name="person-add" size={22} color="#120066" />
            <Text style={styles.buttonText}>Go to Register</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 32,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: "#120066",
    fontSize: 16,
    fontWeight: "600",
  },
});
