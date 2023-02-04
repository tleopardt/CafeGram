import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { fullHeight, fullWidth } from "../../styles";

export default function Modal(props) {
  const {
    visible = false,
    animate = false,
    option,
    title = "Choose item from the list below",
    onClose,
  } = props;

  return (
    <SwipeUpDownModal
      modalVisible={visible}
      PressToanimate={animate}
      //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
      ContentModal={
        <View
          style={{
            flex: 1,
            marginTop: fullHeight / 3,
            backgroundColor: "#fff",
            padding: 15,
          }}
        >
          <View
            style={{
              padding: 2,
              backgroundColor: "#000",
              alignSelf: "center",
              width: fullWidth / 6,
              borderRadius: 10,
            }}
          />
          <Text style={{ paddingVertical: 20, fontSize: 15, opacity: 0.5 }}>
            {title}
          </Text>
          <FlatList
            data={option}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={<View style={{ margin: 10 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#e2e2e2",
                }}
                onPress={onClose}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      }
      onClose={onClose}
      {...props}
    />
  );
}
