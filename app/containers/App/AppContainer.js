import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import MainRoutes from "../../config/routes";
import * as SecureStore from "expo-secure-store";
import Auth from "../../components/screens/Auth";

export default function AppContainer() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    const response = await SecureStore.getItemAsync("auth_session");

    if (response) {
      if (new Date().getTime() >= JSON.parse(response).expiredIn) {
        Alert.alert("Login Expired", "Your session is end, please re-login", [
          {
            text: "OK",
            onPress: async () => {
              await SecureStore.deleteItemAsync("auth_session");
              setAuth(false);
              setLoading(false);
            },
          },
        ]);
      } else {
        setAuth(JSON.parse(response));
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text>Loading App...</Text>
        </SafeAreaView>
      </View>
    );
  }

  if (!loading && !auth) {
    return <Auth setAuth={setAuth} />;
  }

  return <MainRoutes auth={auth} setAuth={setAuth} />;
}
