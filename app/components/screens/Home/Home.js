import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  headingText,
  pageWrapper,
  rowContainer,
} from "../../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../Elements/Input";
import Menu from "../../Elements/Menu";
import Card from "../../Elements/Card";
import Modal from "../../Elements/Modal";
import { API_CAFEGRAM } from "../../../config/api";

export const Cafe = [
  {
    name: "AADK (Ada Apa Dengan Kopi)",
    address: "Jl. Bandung No.28, Klojen",
    image: "https://i0.wp.com/waktuindonesiaberlibur.com/wp-content/uploads/2021/09/@aditkakbar.jpg?resize=780%2C975&ssl=1",
  },
  {
    name: "Robucca",
    address: "Ijen Nirwana, Jl. Raya No.1A, Bareng, Kec. Klojen",
    image:
      "https://i.pinimg.com/736x/1d/12/03/1d12036c2c5a75afb684d5ecb5f83e8c.jpg",
  },
  {
    name: "And Coffee Space",
    address: "Jl. Jakarta No.22, Penanggungan, Kec. Klojen",
    image:
      "https://i.pinimg.com/736x/2e/f0/82/2ef082d50792c1b7aded4112fb94a8c6.jpg",
  },
  {
    name: "AADK (Ada Apa Dengan Kopi)",
    address: "Jl. Bandung No.28, Klojen",
    image: "https://assets-pergikuliner.com/GzvW6YrXv9LsRggBq0ddS3BPxpk=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/1994334/picture-1597491737.JPG",
  },
  {
    name: "Robucca",
    address: "Ijen Nirwana, Jl. Raya No.1A, Bareng, Kec. Klojen",
    image:
      "https://kayakuliner.com/wp-content/uploads/2020/05/84329862_179734913281738_1333451423314534125_n.jpg",
  },
  {
    name: "And Coffee Space",
    address: "Jl. Jakarta No.22, Penanggungan, Kec. Klojen",
    image:
      "https://i.pinimg.com/736x/2e/f0/82/2ef082d50792c1b7aded4112fb94a8c6.jpg",
  },
];

const kecamatan = ["Klojen", "Sukun", "Lowokwaru", "Blimbing", "KedungKandang"];

export default function Home(props) {
  const [visible, setVisisble] = useState(false);
  const [animate, setAnimate] = useState(false);

  const onClose = () => {
    setVisisble(false);
    setAnimate(false);
  };

  const getAllData = async () => {
    const response = await API_CAFEGRAM.get('list_cafe')
    if (response) {
      console.log(response);
    }
  }

  useEffect(() => {
    getAllData();
  }, [])

  return (
    <View style={pageWrapper}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          {/* Header */}
          <View
            style={[
              rowContainer,
              { paddingVertical: 15, paddingHorizontal: 20 },
            ]}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "300", marginBottom: 3 }}>
                Location
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setVisisble(true)}
              >
                <Ionicons name="ios-location" style={{ fontSize: 18 }} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    paddingHorizontal: 3,
                  }}
                >
                  Kota Malang, Kec. Lowokwaru
                </Text>
                <Ionicons name="ios-chevron-down" style={{ fontSize: 15 }} />
              </TouchableOpacity>
              <Modal
                animate={animate}
                visible={visible}
                title="Find your location"
                option={kecamatan}
                onClose={onClose}
              />
            </View>
            <TouchableOpacity>
              <Ionicons name="ios-notifications" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Input
              lefticon={
                <Ionicons
                  name="ios-search"
                  style={{
                    fontSize: 18,
                    padding: 10,
                    paddingRight: 0,
                  }}
                />
              }
              placeholder='Search'
            />
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <View style={[rowContainer, { paddingBottom: 20 }]}>
              <Text style={headingText}>Categories</Text>
              <TouchableOpacity>
                <Text style={{ color: colors.brand, fontWeight: "500" }}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[rowContainer, { paddingBottom: 20 }]}>
              <Menu
                name="View"
                thumbnail={
                  <Image
                    source={{
                      uri: "https://design4users.com/wp-content/uploads/2019/10/autumn-illustration-digital-art.jpg",
                    }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                }
              />
              <Menu
                name="Price"
                thumbnail={
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-vector/profitable-pricing-strategy-price-formation-promo-action-clearance-shopping-idea-design-element-cheap-products-advertisement-customers-attraction_335657-3554.jpg?w=2000",
                    }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                }
              />
              <Menu
                name="Menu Variant"
                thumbnail={
                  <Image
                    source={{
                      uri: "https://images.template.net/wp-content/uploads/2018/02/flat-lay-food-and-drink-menu-788x524.jpg",
                    }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                }
              />
              <Menu
                name="Open Time"
                thumbnail={
                  <Image
                    source={{
                      uri: "https://png.pngtree.com/png-vector/20200319/ourlarge/pngtree-modern-flat-design-concept-of-time-management-with-characters-planning-a-png-image_2157998.jpg",
                    }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                }
              />
            </View>
          </View>

          <View>
            <View
              style={[
                rowContainer,
                { paddingBottom: 20, paddingHorizontal: 20 },
              ]}
            >
              <Text style={headingText}>Cafe near by</Text>
              <TouchableOpacity>
                <Text style={{ color: colors.brand, fontWeight: "500" }}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            {Cafe.map((v, index) => (
              <Card
                key={index}
                image={v.image}
                name={v.name}
                address={v.address}
                navigation={props.navigation}
              />
            ))}
          </View>
          <View style={{ margin: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
