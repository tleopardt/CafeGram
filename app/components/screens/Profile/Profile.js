import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { avatar, colors, pageWrapper, rowContainer } from "../../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile({ auth, logout }) {
  const {
    name,
    email,
    picture = "https://i.pinimg.com/originals/dd/e5/f9/dde5f9c5724e6dc550231eb56c8ac38d.jpg",
  } = auth;

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("auth_session");
    logout();
  };

  return (
    <SafeAreaView style={pageWrapper}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}
      >
        <Image
          style={avatar}
          source={{
            uri: picture,
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ fontWeight: "300", fontSize: 12 }}>{email}</Text>
        </View>
      </View>
      <Text
        style={{
          opacity: 0.2,
          fontWeight: "bold",
          backgroundColor: "#a2a2a2",
          padding: 10,
        }}
      >
        Content
      </Text>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
      >
        <Text style={{ fontWeight: "400" }}>
          <Ionicons name="ios-person-outline" style={{ fontSize: 15 }} />
          &nbsp; Edit Profile
        </Text>
        <Ionicons name="ios-chevron-forward" style={{ fontSize: 15 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
      >
        <Text style={{ fontWeight: "400" }}>
          <Ionicons name="ios-heart-outline" style={{ fontSize: 15 }} />
          &nbsp; Favorites
        </Text>
        <Ionicons name="ios-chevron-forward" style={{ fontSize: 15 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
      >
        <Text style={{ fontWeight: "400" }}>
          <Ionicons name="ios-reload" style={{ fontSize: 15 }} />
          &nbsp; Reset Category
        </Text>
        <Ionicons name="ios-chevron-forward" style={{ fontSize: 15 }} />
      </TouchableOpacity>
      <Text
        style={{
          opacity: 0.2,
          fontWeight: "bold",
          backgroundColor: "#a2a2a2",
          padding: 10,
        }}
      >
        Preferences
      </Text>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
      >
        <Text style={{ fontWeight: "400" }}>
          <Ionicons name="ios-globe-outline" style={{ fontSize: 15 }} />
          &nbsp; Language
        </Text>
        <Ionicons name="ios-chevron-forward" style={{ fontSize: 15 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
      >
        <Text style={{ fontWeight: "400" }}>
          <Ionicons name="ios-moon-outline" style={{ fontSize: 15 }} />
          &nbsp; Dark Mode
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
      >
        <Text style={{ fontWeight: "400" }}>
          <Ionicons name="ios-lock-closed-outline" style={{ fontSize: 15 }} />
          &nbsp; Authentication two factor
        </Text>
        <Ionicons name="ios-chevron-forward" style={{ fontSize: 15 }} />
      </TouchableOpacity>
      <Text
        style={{
          opacity: 0.2,
          fontWeight: "bold",
          backgroundColor: "#a2a2a2",
          padding: 10,
        }}
      >
        Account
      </Text>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
        onPress={handleLogout}
      >
        <Text style={{ fontWeight: "400", color: colors.brandRed }}>
          Log Out
        </Text>
        <Ionicons name="ios-chevron-forward" style={{ fontSize: 15 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[rowContainer, { paddingVertical: 15, paddingHorizontal: 20 }]}
      >
        <Text style={{ fontWeight: "400", color: colors.brandRed }}>
          Delete Account
        </Text>
        <Ionicons name="ios-chevron-forward" style={{ fontSize: 15 }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
