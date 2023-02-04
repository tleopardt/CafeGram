import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Input from "../../../Elements/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../styles";

export default function Register(props) {
  const { handleLogin, loading } = props;

  return (
    <View>
      <Input placeholder="Username" fontSize={12} />
      <Input
        placeholder="Password"
        fontSize={12}
        righticon={
          <Ionicons
            name="ios-eye"
            style={{
              fontSize: 18,
              padding: 10,
              color: "#e1e1e1",
            }}
          />
        }
      />
      <Input
        placeholder="Confirm Password"
        fontSize={12}
        righticon={
          <Ionicons
            name="ios-eye"
            style={{
              fontSize: 18,
              padding: 10,
              color: "#e1e1e1",
            }}
          />
        }
      />
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: colors.brandPink,
          width: "100%",
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "600" }}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
