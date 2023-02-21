import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { colors } from "../../../styles";

export default function Filter({ data, handleFilter, selected }) {
  return data.map((val, index) => (
    <View key={index}>
      <Text
        style={{
          paddingVertical: 10,
          fontSize: 12,
          fontWeight: "400",
          color: colors.textSecondary,
        }}
      >
        Sort Cafe By {val.metaName} :
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {val.option.map((v, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleFilter({ name: val.name, value: v.value })}
          >
            <View
              style={{
                margin: 4,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
                borderWidth: .5,
                borderColor:
                  selected && selected[val.name] === v.value
                    ? colors.brandPink
                    : colors.textSecondary,
                alignSelf: "baseline",
              }}
            >
              <Text
                style={{
                  color:
                    selected && selected[val.name] === v.value
                      ? colors.brandPink
                      : colors.textSecondary,
                }}
              >
                {v.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  ));
}
