import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const publishedAds = [
  {
    id: 1,
    title: "lens",
    price: "200EGP",
    image: require("../assets/lens1.jpeg"),
  },
  {
    id: 2,
    title: "light",
    price: "300EGP",
    image: require("../assets/light1.jpeg"),
  },
  {
    id: 3,
    title: "microphone",
    price: "600EGP",
    image: require("../assets/mic1.jpeg"),
  },
];

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();

  const displayName =
    user?.name || user?.fullName || user?.username || "mariam";
  const displayEmail = user?.email || "mariammohmed467@gmail.com";
  const displayPhone = user?.phone || "01092201539";
  const displayRole = user?.role || "User";

  return (
    <LinearGradient
  colors={["#d9c6e6", "#f7eff2"]}
  style={{ flex: 1 }}
>
  <ScrollView
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={false}
  >
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <Image
            source={require("../assets/ava4.jpeg")}
            style={styles.avatar}
          />

          <View style={styles.greetingBox}>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.nameText}>{displayName}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
  <Text style={styles.infoText}>Email: {displayEmail}</Text>
  <Text style={styles.infoText}>Phone number: {displayPhone}</Text>

  <View style={styles.profileTypeRow}>
    <Text style={styles.profileTypeLabel}>Profile type:</Text>
    <View style={styles.roleBadge}>
      <Text style={styles.roleBadgeText}>{displayRole}</Text>
    </View>
  </View>
</View>

<View style={styles.menuCard}>
  <Pressable style={styles.menuItem}>
    <Text style={styles.menuText}>My orders</Text>
    <Ionicons name="chevron-forward" size={20} color={colors.deepPurple} />
  </Pressable>

  <Pressable style={styles.menuItem}>
    <Text style={styles.menuText}>Favourites</Text>
    <Ionicons name="chevron-forward" size={20} color={colors.deepPurple} />
  </Pressable>

</View>

        <View style={styles.adsSection}>
        <Text style={styles.adsTitle}>Published ads</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.adsRow}
        >
          {publishedAds.map((item) => (
            <View key={item.id} style={styles.adCard}>
              <Pressable style={styles.heartIcon}>
                <Ionicons name="heart-outline" size={18} color="#ff4fa3" />
              </Pressable>

              <Image source={item.image} style={styles.adImage} />

              <Text style={styles.adTitle}>{item.title}</Text>
              <Text style={styles.adPrice}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <Pressable style={styles.supportWrapper}>
        <Text style={styles.supportText}>Support</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.editButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation?.navigate?.("EditProfile")}
      >
        <Text style={styles.editText}>Edit</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={signOut}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      
      </ScrollView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7eff2",
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    height: 190,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  greetingBox: {
    marginLeft: 14,
  },
  helloText: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.deepPurple,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  infoText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 20,
  },
  profileTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  profileTypeLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.deepPurple,
    marginRight: 14,
  },
  roleBadge: {
    backgroundColor: "#d9c6e6",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  roleBadgeText: {
    color: colors.deepPurple,
    fontSize: 15,
    fontWeight: "500",
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 6,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0e6eb",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  adsSection: {
    marginTop: 6,
    paddingLeft: 20,
  },
  adsRow: {
    paddingRight: 20,
  },
  adCard: {
    width: 130,
    backgroundColor: "#f3eded",
    borderRadius: 10,
    marginRight: 16,
    padding: 10,
    position: "relative",
    borderWidth: 1,
    borderColor: "#e4d7dc",
  },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
  adImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginTop: 15,
    marginBottom: 12,
  },
  adTitle: {
    fontSize: 15,
    color: colors.deepPurple,
    marginBottom: 8,
  },
  adPrice: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.deepPurple,
  },
  supportWrapper: {
    alignItems: "center",
    marginTop: 34,
    marginBottom: 20,
  },
  supportText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.deepPurple,
    textDecorationLine: "underline",
  },
  logoutButton: {
    alignSelf: "center",
    width: 100,
    backgroundColor: "#ff2d98",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
    marginTop: "auto",
  },
  editButton: {
    alignSelf: "center",
    width: 100,
    backgroundColor: "#5a00b5",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: "16",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  editText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  
  menuCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  adsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.deepPurple,
    marginBottom: 10,
  },
});
