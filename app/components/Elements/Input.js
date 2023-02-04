import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../styles";

export default function Input(props) {
  const { lefticon, righticon, fontSize = 16 } = props;

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        {lefticon}
      </View>
      <TextInput style={[styles.inputStyleBasic, { fontSize: fontSize }]} {...props} />
      <View style={{ justifyContent: "center" }}>
        {righticon}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  inputStyleBasic: {
    flex: 1,
    minHeight: 40,
    color: colors.textBase,
    paddingLeft: 15,
  }
});
