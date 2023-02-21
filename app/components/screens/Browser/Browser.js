import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { rowContainer } from "../../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Browser({ route, navigation }) {
  const { webUrl } = route.params;
  const webView = useRef();
  const [isLoadWeb, setIsLoadWeb] = useState(true);

  const refresh = () => {
    webView.current.reload();
    setIsLoadWeb(true);
  };

  const stopLoad = () => {
    webView.current.stopLoading();
    setIsLoadWeb(false);
  };

  const renderLoadWebView = () => {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={[rowContainer, { padding: 10 }]}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <Ionicons name="ios-chevron-back" style={{ fontSize: 18 }} />
            </TouchableWithoutFeedback>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Browser</Text>
            <TouchableWithoutFeedback onPress={isLoadWeb ? stopLoad : refresh}>
              <Ionicons
                name={isLoadWeb ? "ios-close" : "refresh"}
                style={{ fontSize: 18 }}
              />
            </TouchableWithoutFeedback>
          </View>
          <WebView
            ref={webView}
            source={{ uri: webUrl }}
            onLoadEnd={() => setIsLoadWeb(false)}
            renderLoading={renderLoadWebView}
            startInLoadingState={true}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
