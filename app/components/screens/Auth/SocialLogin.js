import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, fullWidth } from "../../../styles";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as SecureStore from "expo-secure-store";

WebBrowser.maybeCompleteAuthSession();

export function GoogleAuth({ clientId, onAuth }) {
  const [request, response, promptAsync] = Google.useAuthRequest(clientId);

  useEffect(() => {
    async function persistAuth() {
      await SecureStore.setItemAsync(
        "auth_session",
        JSON.stringify({
          accessToken: response.authentication.accessToken,
          expiresIn:
            new Date().getTime() + response.authentication.expiresIn * 1000,
        })
      );
    }

    if (response?.type === "success") {
      // persistAuth();
      getUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserInfo(accessToken) {
    const getUserInfo = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    getUserInfo.json().then((data) => {
      onAuth({
        ...data,
        expiresIn:
          new Date().getTime() + response.authentication.expiresIn * 1000,
      });
    });
  }

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: "center",
        width: fullWidth / 3,
      }}
      onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
    >
      <Text
        style={{
          color: "#000",
          fontWeight: "600",
          alignItems: "center",
        }}
      >
        <Ionicons
          style={{ fontSize: 16, color: colors.brandPink }}
          name="ios-logo-google"
        />
        &nbsp;&nbsp;Google
      </Text>
    </TouchableOpacity>
  );
}

export function FacebookAuth({ clientId, onAuth }) {
  const [request, response, promptAsync] = Facebook.useAuthRequest(clientId);

  useEffect(() => {
    async function getUserInfo(accessToken) {
      const getUserInfo = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      getUserInfo.json().then((data) => {
        onAuth(data);
      });
    }

    async function persistAuth() {
      await SecureStore.setItemAsync("auth_session", JSON.stringify(response));
    }

    if (response?.type === "success") {
      persistAuth();
      getUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: colors.brandLightBlue,
        borderRadius: 5,
        alignItems: "center",
        width: fullWidth / 3,
      }}
      onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
          alignItems: "center",
        }}
      >
        <Ionicons style={{ fontSize: 16 }} name="ios-logo-facebook" />
        &nbsp;&nbsp;Facebook
      </Text>
    </TouchableOpacity>
  );
}
