import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, TouchableWithoutFeedback, SwipeView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Loading from "react-native-whc-loading";
import { ScrollView } from 'react-native-gesture-handler';
// import { NavigationEvents } from 'react-navigation'
import { CheckBox } from "react-native-elements";
import Entypo from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class PhysUserList extends Component {

    constructor() {
        super()

        this.state = { isLoading: true, isFetching: false, checkBoxes: [], emailValue: [] };
        this.setState({ dataSource: null, ipoid: "", isLoading: false, checkAll: false, });

    }

    nextscreen = (item, index) => {




        //  alert(item.ipoid)


        //alert(this.state.ipoid)
        //  alert("Next Screen")
        this.props.navigation.navigate('OrderInformation')
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.componentDidMount() });
    }

    cancelbtnPress = () => {

        // alert("Under Development")
        this.props.navigation.navigate('PhysItemList')
    }

    exportBtnPress = () => {
        const { checkBoxes, dataSource } = this.state

        const emails = dataSource.filter((item, index) => checkBoxes[index])
            .map(item => item.email);


        alert(JSON.stringify(emails))
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

    renderItem = ({ item, index }) => {


        return (
            <View>



                <ScrollView>
                    < View style={{
                        marginTop: 3, borderRightWidth: 1,
                        borderBottomWidth: 1,

                    }
                    }>


                        {/* <TouchableOpacity onPress={this.nextscreen()}> */}

                        <TouchableWithoutFeedback onPress={() => this.nextscreen(item, index)}>


                            <View style={{ flexDirection: 'row', marginLeft: '0%', marginBottom: '0%', marginRight: '2%', width: "100%" }}>
                                {/* <Text style={{ fontSize: 18, marginRight: '2%', color: '#3386D6', width: "15%" }}>{item.first_name}</Text> */}
                                <CheckBox
                                    checkedIcon={
                                        <Entypo name="checksquare" size={20} color="#696969">

                                        </Entypo>
                                    }
                                    uncheckedIcon={
                                        <FontAwesome name="square-o" size={20} color="#696969" />
                                    }
                                    // title=""
                                    checked={this.state.checkBoxes[index]}
                                    onPress={() => {
                                        let { checkBoxes, checkAll } = this.state
                                        const checked = checkBoxes[index]

                                        checkBoxes[index] = checked ? false : true
                                        if (!checkBoxes[index]) {
                                            checkAll = false
                                        }
                                        this.setState({
                                            checkBoxes,
                                            checkAll


                                        })
                                    }
                                    }
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#fff"
                                    }}
                                />
                                <Text style={{ fontSize: 18, marginRight: '2%', color: '#3386D6', width: "20%" }}>{item.first_name}</Text>
                                <Text style={{ fontSize: 18, marginRight: '2%', color: '#3386D6', width: "40%" }}>{item.email}</Text>
                                <Text style={{ fontSize: 18, marginRight: '2%', color: '#3386D6', width: "15%" }}>{item.user_type}</Text>

                            </View>




                        </TouchableWithoutFeedback>



                    </View >

                </ScrollView>



            </View>

        )


    }

    componentDidMount() {




        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("Sid").then(datasid => {
                const { checkBoxes } = this.state
                if (data) {
                    this.setState(
                        {
                            isLoading: true,
                        },

                    );
                    //    const url = API_BASE_URL + 'admin/get_receiving_order/'

                    fetch(API_BASE_URL + "admin/exportuser?sku=1&sid=1001")
                        //     fetch(url + datasid + "?token=" + data)

                        .then((response) => response.json())
                        .then((responsejson) => {
                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );

                            this.setState({ isFetching: false })

                            if (responsejson.status == "success") {

                                checkBoxes.length = responsejson.data.length
                                this.setState({ dataSource: responsejson.data, checkBoxes })
                            }

                            if (!this.alertPresent) {
                                this.alertPresent = true;

                                if (responsejson.status == "error") {

                                    alert(responsejson.error)
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

            <View style={{ flexDirection: 'column', height: "100%" }}>
                {/* <KeyboardAwareScrollView style={{ height: "80%" }}> */}
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#696969",
                            fontSize: 20,
                            fontWeight: "bold"
                        }}
                    >
                        User List

                </Text>
                    {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}
                    <View style={styles.container}>
                        <View flexDirection='row' marginTop='0%'>
                            <View style={{
                                width: '20%', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: "#3386D6", height: 60
                            }}>
                                {/* <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', fontWeight: "bold" }}>Date
</Text> */}
                                <CheckBox
                                    checkedIcon={
                                        <Entypo name="checksquare" size={25} color="white">

                                        </Entypo>
                                    }
                                    uncheckedIcon={
                                        <FontAwesome name="square-o" size={25} color="white" />
                                    }
                                    // title=""
                                    checked={this.state.checkAll}
                                    onPress={() => {
                                        let { checkBoxes, checkAll } = this.state
                                        checkAll = !checkAll
                                        checkBoxes.fill(checkAll)
                                        this.setState({
                                            checkAll: checkAll,
                                            checkBoxes
                                        })
                                    }
                                    }
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#fff"
                                    }}
                                />
                            </View>

                            <View style={{
                                width: '15%', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: "#3386D6", height: 60,
                            }}>
                                <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Name
</Text>
                            </View>

                            <View style={{
                                width: '35%', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: "#3386D6", height: 60,
                            }}>
                                <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Email
</Text>
                            </View>

                            <View style={{
                                width: '30%', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: "#3386D6", height: 60,
                            }}>
                                <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>User Type
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
                        />

                    </View>

                {/* </KeyboardAwareScrollView> */}
                <View style={styles.btncontainerr}>
                    <TouchableOpacity
                        style={styles.btncontainer2}
                        onPress={this.exportBtnPress}
                    >
                        <Text style={styles.btnText}> Export to Mobile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btncontainer1}
                        onPress={this.cancelbtnPress}
                    >
                        <Text style={styles.btnText}> Cancel </Text>
                    </TouchableOpacity>

                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        // paddingTop: 10,
        // marginTop: "5%",
        // marginBottom: "10%",

        // height: '80%'
        paddingTop: 5,
        marginTop: 5,



    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 70,

    },
    btncontainer: {
        backgroundColor: "#3386D6",


        // marginTop: 10,
        bottom: 5,
        borderRadius: 40,
        height: 40,
        marginLeft: "65%",
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
    btncontainerr: {
        // flexDirection: "row",
        // marginTop: "80%",
        // marginBottom: "10%",
        // height: "40%",
        flexDirection: "row",
        // marginBottom: '0%'
        marginTop: "10%",
        height: "20%",
        // flexDirection: "row",
        // // marginBottom: '0%'
        // marginTop: "40%",
        // height: "20%",
    },
    btnText: {
        marginLeft: 0,
        fontSize: 20,
        color: "#fff"
    },


    btncontainer1: {
        backgroundColor: "#3386D6",

        borderRadius: 10,
        // mirginTop: 10,
        height: 50,
        marginLeft: 10,
        marginRight: 20,
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 70
    },
    btncontainer2: {
        backgroundColor: "#3386D6",

        borderRadius: 10,

        marginStart: "8%",
        // mirginTop: 10,
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 70
    },

})