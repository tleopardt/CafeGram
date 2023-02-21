import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../../Elements/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, rowContainer } from "../../../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Panel from "../../Elements/Panel";
import Filter from "./Filter";
import { ROUTES, slidesArr } from "../../../config/constant";
import {
  filterHarga,
  filterMenu,
  filterOpenHours,
} from "../../../utils/helpers";

function Search({ route, navigation }) {
  const { data } = route.params;
  const [search, setSearch] = useState();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({
    lokasi: "",
    jam_buka: "",
    harga: "",
    view: "",
    variasi_menu: "",
  });

  let filteredData = data;

  const handleSearch = (val) => {
    setSearch(val);
  };

  const togglePanel = () => {
    setOpen(!open);
  };

  const resetCategory = () => {
    setCategory({
      lokasi: "",
      jam_buka: "",
      harga: "",
      view: "",
      variasi_menu: "",
    });
  };

  const handleFilter = (val) => {
    setCategory({
      ...category,
      [val.name]: val.value !== category[val.name] ? val.value : "",
    });
  };

  const SearchItems = (val = "", arr) => {
    if (val !== "") {
      const result = arr.filter((data) =>
        Object.values(data).join(" ").toLowerCase().includes(val.toLowerCase())
      );

      return result;
    } else {
      return arr;
    }
  };

  filteredData = filteredData.filter((val) =>
    val.tipe_cafe.toLowerCase().includes(category.view)
  );
  filteredData = filteredData.filter((val) =>
    filterOpenHours(val.total_jam_buka, category.jam_buka)
  );
  filteredData = filteredData.filter((val) =>
    filterMenu(val.variasi_menu, category.variasi_menu)
  );
  filteredData = filteredData.filter((val) =>
    filterHarga(val.harga_tertinggi, category.harga)
  );
  filteredData = filteredData.filter((val) =>
    val.kecamatan.includes(category.lokasi)
  );

  const listCafeResult = SearchItems(search, filteredData);
  const categorySelected = Object.values(category).filter((val) => val).length;

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 15,
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-arrow-back"
              style={{
                fontSize: 18,
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
            />
          </TouchableWithoutFeedback>
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
            righticon={
              search && (
                <TouchableWithoutFeedback onPress={() => setSearch()}>
                  <Ionicons
                    name="ios-close-circle"
                    color={colors.textSecondary}
                    style={{
                      fontSize: 18,
                      padding: 10,
                    }}
                  />
                </TouchableWithoutFeedback>
              )
            }
            noShadow
            autoFocus={true}
            value={search}
            onChangeText={handleSearch}
            placeholder="Search"
          />
        </View>
      </View>

      <View style={{ backgroundColor: "#fff", height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableWithoutFeedback onPress={togglePanel}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
                backgroundColor: colors.brandPink,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  marginRight: categorySelected ? 10 : 0,
                }}
              >
                Filter
              </Text>
              {categorySelected ? (
                <Text
                  style={{
                    backgroundColor: "#fff",
                    paddingHorizontal: 6,
                    borderRadius: 10,
                    color: colors.brandPink,
                  }}
                >
                  {categorySelected}
                </Text>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
          {categorySelected ? (
            <TouchableWithoutFeedback onPress={resetCategory}>
              <Text style={{ fontSize: 12, color: colors.brandPink }}>
                Reset Category
              </Text>
            </TouchableWithoutFeedback>
          ) : null}
        </View>
        {search ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 10,
            }}
          >
            <Text style={{ color: colors.textSecondary, fontStyle: "italic" }}>
              {search
                ? listCafeResult.length !== 0
                  ? `Found ${listCafeResult.length} result with "${search}"...`
                  : `No result found`
                : null}
            </Text>
          </View>
        ) : null}
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          <FlatList
            data={listCafeResult}
            ItemSeparatorComponent={() => (
              <View style={{ paddingVertical: 8 }}></View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DetailCafe, { data: item })}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginRight: 15,
                    }}
                  />
                  <View>
                    <Text style={{ marginBottom: 3, fontWeight: "600" }}>
                      {item.nama_cafe}
                    </Text>
                    <Text style={{ color: colors.textSecondary }}>
                      <Ionicons name="ios-location" color={colors.brandPink} />
                      &nbsp;&nbsp;{item.kecamatan}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <Panel
        open={open}
        onClose={togglePanel}
        renderElement={
          <Filter
            data={slidesArr}
            handleFilter={handleFilter}
            selected={category}
          />
        }
      />
    </SafeAreaView>
  );
}

export default Search;
