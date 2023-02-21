import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { colors, fullWidth } from "../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Panel({ open = false, onClose, renderElement }) {
  const pullRight = useRef(new Animated.Value(fullWidth)).current;

  useEffect(() => {
    Keyboard.dismiss();

    Animated.timing(pullRight, {
      toValue: open ? 0 : fullWidth,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [open]);

  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        width: fullWidth,
        height: "100%",
        position: open ? "absolute" : "relative",
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          position: "absolute",
          right: 0,
          width: fullWidth / 1.5,
          height: "100%",
          backgroundColor: "#fff",
          transform: [{ translateX: pullRight }],
        }}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: "absolute",
              left: -38,
              top: "50%",
              backgroundColor: "#fff",
              padding: 10,
            }}
          >
            <Ionicons
              name="ios-close"
              color={colors.textSecondary}
              style={{ fontSize: 18 }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10 }}
        >
          {renderElement}
        </View>
      </Animated.View>
    </View>
  );
}
