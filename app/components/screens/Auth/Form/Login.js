import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../styles";
import Input from "../../../Elements/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getResources } from "../../OnBoarding";

export default function Login(props) {
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    
    if (user.email && user.password) {
      const response = await getResources();

      if (response) {
        const findUser = response.data.account.find(
          (cred) => cred.email === user.email && cred.password === user.password
        );
        if (findUser) {
          const name = user.email.split("@")[0];
          afterAuth({
            ...findUser,
            name: name.charAt(0).toUpperCase() + name.slice(1),
          });
          setLoad(false);
        } else {
          Alert.alert("Invalid Credentials");
          setLoad(false);
        }
      }
    } else {
      Alert.alert("Please fill out the blanks");
      setLoad(false);
    }
  };

  // const checkCredential = async () => {
  //   const response = await axios.get(
  //     "https://json.extendsclass.com/bin/a3727e4966ca",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Security-key": "654321ccd",
  //       },
  //     }
  //   );
  //   return console.log(response.data)
  // }

  // useEffect(() => {
  //   checkCredential()
  // }, [])

  return (
    <View>
      <Input
        placeholder="Username"
        fontSize={12}
        value={user.email}
        keyboardType="email-address"
        onChangeText={(val) => handleChange("email", val)}
      />
      <Input
        placeholder="Password"
        value={user.password}
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
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: colors.brandPink,
          width: "100%",
          borderRadius: 10,
          alignItems: "center",
          elevation: 2,
        }}
        onPress={onSubmit}
        disabled={load}
      >
        {load ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "600" }}>Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
