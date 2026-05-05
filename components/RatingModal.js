import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

export default function RatingModal({ visible, onClose }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    setRating(0);
    setFeedback("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color={colors.deepPurple} />
          </Pressable>

          <Text style={styles.title}>Rate Eqply</Text>
          <Text style={styles.subtitle}>
            Tell us how your experience was.
          </Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={34}
                  color="#E2A93B"
                  style={styles.star}
                />
              </Pressable>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Write your feedback..."
            placeholderTextColor="#9ca3af"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Rating</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.deepPurple,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6f6d8c",
    textAlign: "center",
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 4,
  },
  input: {
    backgroundColor: "#f7eff2",
    borderRadius: 14,
    padding: 14,
    height: 100,
    fontSize: 15,
    color: "#111",
    marginBottom: 18,
  },
  submitButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});