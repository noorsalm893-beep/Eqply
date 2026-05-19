import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

export default function UploadPaymentProofScreen({ navigation, route }) {
  const { darkMode } = useAuth();
  const [proofImage, setProofImage] = useState(null);

  const total = route?.params?.total;
  const phoneNumber = route?.params?.phoneNumber;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setProofImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!proofImage) {
      Alert.alert("Missing screenshot", "Please upload your payment screenshot first.");
      return;
    }

    navigation.navigate("OrderSuccess", {
      orderId: "EQP1024",
      total,
      phoneNumber,
    });
  };

  return (
    <LinearGradient
      colors={darkMode ? ["#1A1625", "#2A2338"] : ["#d9c6e6", "#f8f1f3"]}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>
          <Text style={styles.title}>Payment Proof</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upload transfer screenshot</Text>
          <Text style={styles.text}>Total paid: {total} EGP</Text>
          <Text style={styles.text}>Phone number: {phoneNumber}</Text>

          <Pressable style={styles.uploadBox} onPress={pickImage}>
            {proofImage ? (
              <Image source={{ uri: proofImage }} style={styles.proofImage} />
            ) : (
              <>
                <Ionicons name="image-outline" size={44} color={colors.deepPurple} />
                <Text style={styles.uploadText}>Choose Screenshot</Text>
              </>
            )}
          </Pressable>

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Payment Proof</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { paddingHorizontal: 18, paddingTop: 50, paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 22 },
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
  title: { fontSize: 28, fontWeight: "800", color: colors.deepPurple },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 10,
  },
  text: { fontSize: 15, color: "#777", marginBottom: 8 },
  uploadBox: {
    height: 230,
    borderRadius: 18,
    backgroundColor: "#f7eff2",
    borderWidth: 1,
    borderColor: "#eadbe0",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
    overflow: "hidden",
  },
  uploadText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  proofImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  submitButton: {
    backgroundColor: "#20B15A",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
});