import { Modal,Alert ,Text, SafeAreaView, StyleSheet, View, Image, TextInput, FlatList, ScrollView, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';

export default function Main({ route, navigation }) {
     const [modalVisible, setModalVisible] = useState(false);
 const handleUpdate = () => {
        setModalVisible(false);
        navigation.navigate("CậpNhật"); // Thay đổi tên màn hình theo nhu cầu của bạn
    };

    const handleLogout = () => {
        setModalVisible(false);
        
        navigation.navigate("DangNhap")
        alert("Dang Xuat Thanh Cong")
    };      

    
    const { username, avatar } = route.params; // Lấy tên người dùng và avatar từ params

    const [CategoryAPI, setCategoryAPI] = useState([]);
    const [locationAPI, setLocationAPI] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const rescate = await axios.get("https://66195da2125e9bb9f299cf4f.mockapi.io/giuaki/category");
                const resLocation = await axios.get("https://66195da2125e9bb9f299cf4f.mockapi.io/giuaki/location");

                setCategoryAPI(rescate.data);
                setLocationAPI(resLocation.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View
          style={{
            backgroundColor: "#5959b3",
            height: 160,
            paddingHorizontal: 40,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Image source={require("../assets/baiTH4/logoicon.png")} style={{ width: 46 }} resizeMode="contain" />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
                height: 36,
                borderRadius: 10,
                flex: 1,
              }}
            >
              <TextInput placeholder="Search here" style={{ flex: 1, height: "100%", outline: "none" }} />
              <Image source={require("../assets/baiTH4/findicon.png")} style={{ width: 24 }} resizeMode="contain" />
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity >
              <Image
                source={{ uri: avatar }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginLeft: 5,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Wellcome</Text>
              <Text style={{ color: "#fff", fontSize: 12 }}>{username}</Text>
            </View>

            <Image
              source={require("../assets/baiTH4/ringicon.png")}
              style={{ width: 40, marginLeft: "auto" }}
              resizeMode="contain"
            />
          </View>
        </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 18 }}>Category</Text>
                    <Image source={require("../assets/baiTH4/3gach.png")} style={{ width: 40, height: 40 }} />
                </View>

                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={CategoryAPI}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center', padding: 10 }}>
                                <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
                                <Text>{item.name}</Text>
                            </View>
                        )}
                        numColumns={4}
                    />
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 18 }}>Popular Destination</Text>
                    <Image source={require("../assets/baiTH4/3gach.png")} style={{ width: 40, height: 40 }} />
                </View>

                <FlatList
                    data={locationAPI}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center', padding: 5 }}>
                            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 18 }}>Recommended</Text>
                </View>

                <FlatList
                    data={locationAPI}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center', padding: 5 }}>
                            <Image source={{ uri: item.image }} style={{ width: 170, height: 100, borderRadius: 10 }} />
                        </View>
                    )}
                    numColumns={2}
                />
            </ScrollView>

            <View style={{ alignItems: 'center', height: 100, backgroundColor: '#5958b2', justifyContent: 'space-around', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../assets/baiTH4/homeicon.png")} style={{ width: 30, height: 30 }} />
                    <Text style={{ color: '#fff' }}>Home</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../assets/baiTH4/exploreicon.png")} style={{ width: 30, height: 30 }} />
                    <Text style={{ color: '#fff' }}>Explore</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../assets/baiTH4/searchicon.png")} style={{ width: 30, height: 30 }} />
                    <Text style={{ color: '#fff' }}>Search</Text>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                 onPress={() => setModalVisible(true)}
                >
                    <Image source={{ uri: avatar }} style={{ width: 30, height: 30, borderRadius: "50%" }} />
                    <Text style={{ color: '#fff' }}>{username}</Text>
                </TouchableOpacity>
            </View>

             <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>Bạn Muốn</Text>
                        {/* <Button title="Cập nhật" onPress={handleUpdate} /> */}
                        <Button title="Đăng xuất" onPress={handleLogout} color={"pink"} />
                        <Button title="Hủy" onPress={() => setModalVisible(false)}  color={"purple"} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
