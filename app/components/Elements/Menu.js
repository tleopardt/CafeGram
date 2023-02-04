import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

export default function Menu(props) {
  const { thumbnail, name, location } = props;

  return (
    <TouchableOpacity>
      <View
        style={{
          width: 80,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 8,
        }}
      >
        {thumbnail}
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ width: '80%', textAlign: 'center', fontSize: 10, fontWeight: '500' }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
