import React, { useState } from "react";
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
import { useAuth } from "../context/AuthContext";

const languages = [
  "English",
  "French",
  "German",
];

export default function LanguageScreen({
 navigation,
}) {

const { updatePreferences, darkMode } = useAuth();

const [selectedLanguage,setSelectedLanguage] =
useState("English");

const handleSelect = async(language)=>{

setSelectedLanguage(language);

await updatePreferences({
language,
});
};

return(
<LinearGradient
colors={
darkMode
? ["#1A1625","#2A2338"]
: ["#d9c6e6","#f8f1f3"]
}
>

<ScrollView
contentContainerStyle={styles.container}
>

<View style={styles.header}>
<Pressable
style={styles.backButton}
onPress={()=>navigation.goBack()}
>
<Ionicons
name="chevron-back"
size={22}
color={colors.deepPurple}
/>
</Pressable>

<Text style={styles.title}>
Language
</Text>
</View>

<View style={styles.card}>

{languages.map((item)=>(

<Pressable
key={item}
style={[
styles.languageRow,
selectedLanguage===item &&
styles.selected
]}
onPress={()=>handleSelect(item)}
>

<Text style={styles.languageText}>
{item}
</Text>

<Ionicons
name={
selectedLanguage===item
? "radio-button-on"
: "radio-button-off"
}
size={22}
color="#ff2d98"
/>

</Pressable>

))}

</View>

</ScrollView>

</LinearGradient>
);
}

const styles=StyleSheet.create({
screen:{flex:1},

container:{
paddingHorizontal:18,
paddingTop:50,
},

header:{
flexDirection:"row",
alignItems:"center",
marginBottom:20,
},

backButton:{
width:38,
height:38,
borderRadius:19,
backgroundColor:"#fff",
alignItems:"center",
justifyContent:"center",
marginRight:12,
},

title:{
fontSize:28,
fontWeight:"700",
color:colors.deepPurple,
},

card:{
backgroundColor:"#fff",
borderRadius:18,
padding:16,
},

languageRow:{
minHeight:60,
borderBottomWidth:1,
borderBottomColor:"#eee",
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

selected:{
backgroundColor:"#fff8fc",
},

languageText:{
fontSize:16,
fontWeight:"700",
color:colors.deepPurple,
},

});