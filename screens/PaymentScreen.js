import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const paymentMethod = "Wallet";

export default function PaymentScreen({
  navigation,
  route,
 }) {
  const product = route?.params?.product;
  const selectedType = route?.params?.selectedType;
  const total = route?.params?.total;
  const [method, setMethod] = useState("Card");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const rentDays = route?.params?.rentDays || 1;

  const { createOrder, darkMode } = useAuth();
  const handleConfirmPayment = async () => {
    try {
      setIsPlacingOrder(true);
  
      const response = await createOrder({
        paymentMethod: method,
        address: "Alexandria, Egypt",
      });
  
      if (response.ok) {
        navigation.navigate("OrderSuccess", {
          order: response.order,
          orderId:
          response?.order?._id || "EQP1024",
         
          productName:
          product?.name,
         
          paymentMethod:
          method,
         
          total,
         });
      } else {
        Alert.alert(
          "Order Error",
          response.error || "Failed to place order."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <LinearGradient
colors={
darkMode
? ["#1A1625","#2A2338"]
: ["#d9c6e6","#f8f1f3"]
}
>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.deepPurple} />
          </Pressable>
          <Text style={styles.title}>Payment</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choose Payment Method</Text>
          <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Order Summary
          </Text>

        <View style={styles.row}>
          <Text style={styles.summaryText}>
            Product
          </Text>

          <Text style={styles.summaryValue}>
            {product?.name || "Product"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.summaryText}>
            Type
          </Text>

          <Text style={styles.summaryValue}>
            {selectedType}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.summaryText}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            {total} EGP
          </Text>
        </View>
      </View>
        </View>
        <View style={styles.walletCard}>

<Text style={styles.walletTitle}>
Send payment to:
</Text>

<Text style={styles.walletText}>
Vodafone Cash: 01092201539
</Text>

<Text style={styles.walletText}>
Name: Mariam Mohamed
</Text>

<Text style={styles.walletHint}>
Transfer the amount then upload screenshot
</Text>

</View>

<TextInput
placeholder="Your phone number"
value={phoneNumber}
onChangeText={setPhoneNumber}
style={styles.input}
/>


onPress={()=>{
if(!phoneNumber.trim()){
Alert.alert(
"Missing information",
"Please enter your phone number"
);
return;
}

navigation.navigate(
"UploadPaymentProof",
{
product,
total,
phoneNumber
}
);
}}
          <Pressable
  style={styles.confirmWalletButton}
  onPress={() => {
    if (!phoneNumber.trim()) {
      Alert.alert(
        "Missing phone number",
        "Please enter the phone number you used for the wallet transfer."
      );
      return;
    }

    navigation.navigate("UploadPaymentProof", {
      product,
      selectedType,
      rentDays,
      total,
      phoneNumber,
    });
  }}
>
  <Ionicons name="cloud-upload-outline" size={22} color="#fff" />
  <Text style={styles.confirmWalletText}>
    I Paid - Upload Screenshot
  </Text>
</Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
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
    fontSize: 28,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eadbe0",
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.deepPurple,
    marginBottom: 12,
  },
  methodRow: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "#f7eff2",
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  methodRowSelected: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff2d98",
  },
  methodText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.deepPurple,
  },
  methodTextSelected: {
    color: "#ff2d98",
  },
  input: {
    backgroundColor: "#f7eff2",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontSize: 15,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  payButton: {
    backgroundColor: "#ff2d98",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:12,
    },
    
    summaryText:{
    fontSize:15,
    color:"#777",
    },
    
    summaryValue:{
    fontWeight:"700",
    color:colors.deepPurple,
    },
    
    totalPrice:{
    fontSize:18,
    fontWeight:"800",
    color:"#ff2d98",
    },
    walletCard:{
      backgroundColor:"#fff",
      padding:18,
      borderRadius:15,
      marginBottom:16,
      borderWidth:1,
      borderColor:"#eadbe0"
      },
      
      walletTitle:{
      fontSize:16,
      fontWeight:"700",
      marginBottom:8,
      color:colors.deepPurple
      },
      
      walletText:{
      fontSize:15,
      marginBottom:6,
      },
      
      walletHint:{
      color:"#777",
      marginTop:6
      },
      
      input:{
      backgroundColor:"#fff",
      borderRadius:14,
      paddingHorizontal:14,
      height:50,
      marginBottom:16
      },
      confirmWalletButton: {
        backgroundColor: "#20B15A",
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 12,
      },
      
      confirmWalletText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "800",
        marginLeft: 8,
      },
});