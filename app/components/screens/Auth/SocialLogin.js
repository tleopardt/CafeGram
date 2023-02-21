import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, fullWidth } from "../../../styles";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export function GoogleAuth({ clientId, onAuth }) {
  const [load, setLoad] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest(clientId);

  useEffect(() => {
    if (response?.type === "success") {
      getUserInfo(response.authentication.accessToken);
    } else if (response?.type !== "success" && response?.type) {
      Alert.alert("SSO Failed" + JSON.stringify(response));
    }
  }, [response]);

  async function getUserInfo(accessToken) {
    setLoad(true);

    const getUserInfo = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    getUserInfo.json().then((data) => {
      isAlreadyVote(data);
    });
  }

  async function isAlreadyVote(data) {
    const currentValue = await axios.get(
      "https://json.extendsclass.com/bin/a3727e4966ca",
      {
        headers: {
          "Content-Type": "application/json",
          "Security-key": "654321ccd",
        },
      }
    );

    if (currentValue) {
      const { account } = currentValue.data;
      const accountExist = account.find((val) => val.email === data.email);

      // this is where machine will decide, I'll go to Home if I already vote, other will be redirect to onBoarding Page
      if (accountExist) {
        if (accountExist.vote) {
          onAuth({
            ...data,
            vote: accountExist.vote,
            expiresIn:
              new Date().getTime() + response.authentication.expiresIn * 3000,
          });
          setLoad(false);
        } else {
          onAuth({
            ...data,
            expiresIn:
              new Date().getTime() + response.authentication.expiresIn * 3000,
          });
          setLoad(false);
        }
      } else {
        onAuth({
          ...data,
          expiresIn:
            new Date().getTime() + response.authentication.expiresIn * 3000,
        });
        setLoad(false);
      }
    }
  }

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 5,
        alignItems: "center",
        width: fullWidth / 3,
      }}
      onPress={() =>
        promptAsync({
          useProxy: true,
          showInRecents: true,
        })
      }
      disabled={load}
    >
      {!load ? (
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
      ) : (
        <ActivityIndicator size="small" color={colors.brandPink} />
      )}
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
