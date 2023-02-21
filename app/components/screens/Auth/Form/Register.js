import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard
} from "react-native";
import Input from "../../../Elements/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../styles";
import { getResources, updateResources } from "../../OnBoarding";

export default function Register(props) {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });
  const { afterAuth } = props;

  const handleChange = (name, val) => {
    setUser({
      ...user,
      [name]: val,
    });
  };

  const onSubmit = async () => {
    setLoad(true);
    Keyboard.dismiss();

    if (user.email && user.password && user.confirmPass) {
      if (user.password === user.confirmPass) {
        const response = await getResources();

        if (response) {
          const findUser = response.data.account.find(
            (cred) =>
              cred.email === user.email && cred.password === user.password
          );
          if (findUser) {
            setLoad(false);
            Alert.alert("Credentials already used");
          } else {
            response.data.account.push(user);

            const addUser = await updateResources(response.data);

            if (addUser) {
              const name = user.email.split("@")[0];

              afterAuth({
                ...user,
                name: name.charAt(0).toUpperCase() + name.slice(1),
              });

              setLoad(false);
            }
          }
        }
      } else {
        setLoad(false);
        Alert.alert("Invalid Confirma Password!");
      }
    } else {
      setLoad(false);
      Alert.alert("Please fill out the blanks");
    }
  };
  return (
    <View>
      <Input
        placeholder="Email"
        fontSize={12}
        keyboardType="email-address"
        onChangeText={(val) => handleChange("email", val)}
        defaultMargin
      />
      <Input
        placeholder="Password"
        onChangeText={(val) => handleChange("password", val)}
        secureTextEntry={true}
        fontSize={12}
        defaultMargin
        righticon={
          <Ionicons
            name="ios-eye"
            style={{
              fontSize: 18,
              padding: 10,
              color: "#e1e1e1",
            }}
          />
        }
      />
      <Input
        placeholder="Confirm Password"
        onChangeText={(val) => handleChange("confirmPass", val)}
        secureTextEntry={true}
        fontSize={12}
        defaultMargin
        righticon={
          <Ionicons
            name="ios-eye"
            style={{
              fontSize: 18,
              padding: 10,
              color: "#e1e1e1",
            }}
          />
        }
      />
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: colors.brandPink,
          width: "100%",
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={onSubmit}
        disabled={load}
      >
        {load ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "600" }}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
