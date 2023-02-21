import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, fullWidth } from "../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const OptionElement = ({ item, selected, onPress }) => (
  <TouchableOpacity
    style={{
      paddingVertical: 10,
      width: fullWidth - 60,
      alignItems: "center",
      marginVertical: 10,
      borderRadius: 5,
      backgroundColor: selected === item.value ? colors.brandPink : "#fff",
      elevation: 2
    }}
    onPress={onPress}
  >
    <Text
      style={{ color: selected === item.value ? '#fff' : colors.brandPink, fontWeight: '500' }}
    >
      {item.name}
    </Text>
  </TouchableOpacity>
);

export default function CustomOption({ name, option, onChange, style }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) {
        onChange({
            name: name,
            value: value
        })
    }
  }, [value])

  return (
    <View {...style}>
      {
        option.length !== 0
        ? option.map((item, index) => (
            <OptionElement
              item={item}
              onPress={() => setValue(item.value)}
              selected={value}
              key={index}
            />
          ))
        : null
      }
    </View>
  );
}
