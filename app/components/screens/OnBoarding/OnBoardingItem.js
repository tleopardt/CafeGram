import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import CustomOption from "../../Elements/CustomOption";

function OnBoardingItem({ item, handleCriteria }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={{ marginVertical: 50 }}>
        <Text style={{ fontSize: 25, fontWeight: "900", color: "#fff" }}>
          {item.title}
        </Text>
        <Text style={{ fontWeight: '300', fontSize: 16, color: "#fff" }}>
          {item.question}
        </Text>
      </View>
      <CustomOption
        option={item.option}
        name={item.name}
        onChange={handleCriteria}
        style={{ alignItems: "center" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  image: {
    flex: 0.4,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  description: {
    color: "#a2a2a2",
    paddingHorizontal: 64,
    textAlign: "center",
  },
});

export default OnBoardingItem;
