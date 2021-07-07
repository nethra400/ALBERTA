import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, TouchableWithoutFeedback, Alert, Button, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Loading from "react-native-whc-loading";
import { ScrollView } from 'react-native-gesture-handler';
// import { NavigationEvents } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



export default class PromStockItemList extends Component {

    constructor() {
        super()

        this.state = { isLoading: true, isFetching: false, };
        this.setState({ dataSource: null, ipoid: "", isLoading: false, promotion_name: "" });

    }



    onRefresh() {
        this.setState({ isFetching: true }, function () { this.componentDidMount() });
    }

    LoginPress = () => {

        // alert("Under Development")
        // this.props.navigation.navigate('PromStockAddItem')
    }
    // static navigationOptions = {
    //     headerStyle: {
    //         backgroundColor: "#fff"
    //     },
    //     headerTitle: (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 alignItems: "center",
    //                 marginStart: 0
    //             }}
    //         >
    //             <Image
    //                 source={require("../images/poslogo.jpg")}
    //                 style={{
    //                     height: 100,
    //                     width: 100,
    //                     marginRight: 0,
    //                     resizeMode: "contain"
    //                 }}
    //             />
    //         </View>
    //     ),
    // }

    closeAllOpneStatus = () => {




        Alert.alert(

            '',
            "Promotion Saved Succesfully",
            [
                {
                    text: 'OK', onPress: () => {
                        // let { dataSource } = self.state
                        // dataSource = dataSource.splice(1, index)
                        // this.setState({ dataSource })
                        this.props.navigation.navigate('Promotion')
                    },
                }
            ]
        )



    }



    saveDetails = (index, item) => {

        const self = this


        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('promotion_id').then((promotion_id) => {
                AsyncStorage.getItem('Sid').then((SID) => {
                    if (data) {
                        this.setState(
                            {
                                isLoading: true,
                            },

                        );


                        fetch(API_BASE_URL + `admin/removePromotionItems?sku=${item.barcode}&token=${encodeURIComponent(data)}&sid=${SID}&prom_id=${promotion_id}`, {
                            method: 'POST',

                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //this.refs.loading.show(false);
                                //console.log(responseJson)

                                this.setState({

                                    isLoading: false,

                                })


                                if (responseJson.status) {

                                    Alert.alert(

                                        '',
                                        responseJson.status,
                                        [
                                            {
                                                text: 'OK', onPress: () => {
                                                    // let { dataSource } = self.state
                                                    // dataSource = dataSource.splice(1, index)
                                                    // this.setState({ dataSource })
                                                    this.updateData()
                                                },
                                            }
                                        ]
                                    )
                                    return;
                                }

                                if (responseJson.error) {
                                    //this.refs.loading.show(false);

                                    Alert.alert(

                                        '',
                                        responseJson.error,
                                        [
                                            { text: 'OK', },
                                        ]
                                    )
                                    return;
                                }
                                else if (responseJson.error == 'Token is Invalid') {
                                    //this.sessionButton()

                                }
                                Keyboard.dismiss();
                            })
                            .catch((error) => {
                                console.error(error)
                            });

                    }

                });
            })

        })


    }


    renderItem = ({ item, index }) => {

        console.log(item.estatus)
        return (

            <View>
                <ScrollView>
                    < View style={{
                        // marginTop: 5, borderRightWidth: 0,
                        // marginBottom: 2,
                        // borderBottomWidth: 1,
                        // borderBottomColor: '#3386D6'
                        marginTop: 3,
                        borderBottomWidth: 0.3,
                        borderBottomColor: "#3386D6",

                    }
                    }>


                        <View style={{ flexDirection: 'row', marginHorizontal: "0%", width: "100%", backgroundColor: '#fff' }}>

                            <Text style={{ fontSize: 18, color: '#3386D6', width: "35%", fontSize: 18, marginHorizontal: "1%" }}>{item.barcode}</Text>
                            <Text style={{ width: "50%", fontSize: 18, color: '#3386D6' }}>{item.vitemname}</Text>

                            <View style={{ flexDirection: 'row', width: "10%" }}>

                                <TouchableOpacity

                                    onPress={() => {
                                        Alert.alert(
                                            "",
                                            "Do you want to delete the Item",
                                            [
                                                {
                                                    text: "Ok",
                                                    onPress: () => { this.saveDetails(index, item) },

                                                },
                                                {
                                                    text: "Canel",
                                                    onPress: () => { }
                                                }
                                            ],
                                            {
                                                cancelable: false
                                            }
                                        );
                                    }}

                                >
                                    <MaterialCommunityIcons
                                        name="delete-forever"
                                        size={25}
                                        color="#3386D6"
                                    />

                                </TouchableOpacity>
                            </View>
                        </View>




                    </View >

                </ScrollView>



            </View>


        )


    }

    updateData = () => {
        AsyncStorage.getItem('promotion_id').then((promotion_id) => {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("Sid").then(datasid => {
                    if (data) {
                        this.setState(
                            {
                                isLoading: true,
                            },

                        );
                        const url = API_BASE_URL + 'admin/showPromotionItems?'
                        fetch(url + 'sid=' + datasid + "&token=" + data + "&prom_id=" + promotion_id)

                            .then((response) => response.json())
                            .then((responsejson) => {

                                this.state.promotion_name = responsejson.promotion_name



                                this.setState({
                                    isFetching: false,
                                    isLoading: false,
                                    dataSource: responsejson.table_data
                                })


                                if (responsejson.status == "success") {

                                    this.setState({
                                        isFetching: false,
                                        isLoading: false,
                                        dataSource: responsejson.table_data
                                    })
                                }



                                if (!this.alertPresent) {
                                    this.setState({
                                        isFetching: false,
                                        isLoading: false
                                    })
                                    this.alertPresent = true;

                                    if (responsejson.error) {

                                        alert(responsejson.error)
                                        this.alertPresent = true;
                                    }
                                    else {
                                        this.alertPresent = false;

                                    }
                                }



                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    }
                })

            })
        })
    }

    componentDidMount() {



        this.updateData()




    }




    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator size={"large"} />
                </View>
            );
        }


        return (



            <View>
                <Text
                    style={{
                        textAlign: "center",
                        color: "#696969",
                        fontSize: 20,
                        fontWeight: "bold"
                    }}
                >
                    Item List
                    {/* <Text style={{ color: '#3386D6', fontSize: 16, fontWeight: "bold" ,marginLeft : 10}}>({this.state.promotion_name} )</Text> */}

                </Text>

                {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}

                {/* <View>
                 <View style = {styles.testView}>
                <Text style={{ color: '#696969', fontSize: 16, fontWeight: "bold" }}>Name:<Text style={styles.btnPromName}>{this.state.promotion_name}</Text></Text>

                <View style = {styles.testView}>
                <TouchableOpacity
                    style={styles.btncontainer1}
                    onPress={this.LoginPress}
                >
                    <Text style={styles.btntext}>Add More Items</Text>

              
                    
                </TouchableOpacity>
               </View>
               </View>
            
             </View>       */}

                <TouchableOpacity
                    style={styles.btncontainer1}
                    onPress={this.LoginPress}
                >
                    <Text style={styles.btntext}>Add More Items</Text>



                </TouchableOpacity>




                <View style={styles.container}>


                    <View flexDirection='row' marginTop='0%'>




                        <View style={{
                            width: '33%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 40,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>SKU
</Text>

                        </View>
                        <View style={{
                            width: '33%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 40,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}> Name
</Text>

                        </View>
                        <View style={{
                            width: '33%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 40,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold", marginEnd: "2%" }}> Remove
</Text>

                        </View>



                    </View>


                    <FlatList
                        // horizontal={true}


                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        ItemSeparatorComponent={this.renderSeparator}

                    // showsVerticalScrollIndicator={true}
                    // showsHorizontalScrollIndicator={false}


                    //keyExtractor={(item, index) => index.toString()}

                    />

                    <View style={styles.btncontainerr}>
                        <TouchableOpacity
                            style={styles.btncontainer2}
                            onPress={this.closeAllOpneStatus}
                        >
                            <Text style={styles.btntext}>Save</Text>
                        </TouchableOpacity>
                    </View>



                </View>

            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {

        // paddingTop: 10,
        marginTop: 5,
        marginBottom: "10%",

        height: '80%'



    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 70,

    },
    btncontainer: {



        // marginTop: 10,
        bottom: 5,

        height: '100%',
        marginLeft: "2%",
        marginEnd: "2%",
        width: "30%",
        alignItems: 'center',
        justifyContent: 'center'


    },
    btncontainer1: {
        backgroundColor: "#3386D6",


        // marginTop: 10,

        borderRadius: 40,
        height: 45,
        //    marginLeft: "18%",
       // marginHorizontal: "20%",
         marginStart : "52%",
        width: "45%",
        alignItems: 'center',
        justifyContent: 'center',



    },
    btncontainer2: {
        backgroundColor: "#3386D6",
        marginStart: "28%",
        // marginBottom: '20%',

        // marginTop: 10,

        borderRadius: 40,
        height: 50,
        // marginLeft: "65%",
        top: 30,
        width: "35%",
        alignItems: 'center',
        justifyContent: 'center'


    },

    btntext: {
        //textAlign : 'center',
        fontSize: 20,
        fontWeight: "bold",



        color: "#fff"
    },
    btnPromName: {
        //textAlign : 'center',
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,





        color: "#3386D6"
    },
    btncontainerr: {
        flexDirection: "row",
        // marginBottom: '10%',
        // marginBottom: '5%',
        marginTop: "0%",
        height: "0%",
        bottom: '0%',
        backgroundColor: 'red'
    },
    btnDelete: {
        flexDirection: "row",
        // marginBottom: '10%',
        // marginBottom: '5%',
        marginTop: "0%",
        height: "0%",
        bottom: '0%',
        backgroundColor: 'red'
    },
    btntext1: {
        //textAlign : 'center',
        fontSize: 18,
        // fontWeight: "bold",
        color: "white"
    },
    testView: {

        width: "100%",
        flexDirection: 'row',
        marginLeft: 5,
        // marginEnd : "5%"
        // marginHorizontal: "7%"
    }


})