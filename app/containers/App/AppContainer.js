import { Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainRoutes from "../../config/routes";
import * as SecureStore from "expo-secure-store";
import Auth from "../../components/screens/Auth";
import OnBoardingScreen from "../../components/screens/OnBoarding";
import { fullWidth } from "../../styles";

export default function AppContainer() {
  const [auth, setAuth] = useState(false);
  const [isVote, setIsVote] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (auth?.vote) {
      setIsVote(true);
    }
    // console.log(auth, isVote, loading);
  }, [auth]);

  const logout = () => {
    setAuth(false);
    setIsVote(false);
  };

  const checkAuth = async () => {
    // await SecureStore.deleteItemAsync("auth_session");
    const response = await SecureStore.getItemAsync("auth_session");

    if (response) {
      const { expiresIn } = JSON.parse(response);

      if (new Date().getTime() >= expiresIn) {
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

  if (!auth && !loading) {
    return <Auth setIsVote={setIsVote} setAuth={setAuth} />;
  }

  if (auth && !loading && !isVote) {
    return <OnBoardingScreen setIsVote={setIsVote} />;
  }

  return loading ? (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={{ uri: "../../../assets/splash.png" }}
        style={{ width: fullWidth, height: "100%" }}
      />
    </SafeAreaView>
  ) : (
    <MainRoutes auth={auth} logout={logout} />
  );
}
