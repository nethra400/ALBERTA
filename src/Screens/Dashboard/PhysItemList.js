import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, TouchableWithoutFeedback, SwipeView ,TextInput , Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Loading from "react-native-whc-loading";
import { ScrollView } from 'react-native-gesture-handler';
// import { NavigationEvents } from 'react-navigation'
import AsyncStorage from "@react-native-community/async-storage";
import { Keyboard } from 'react-native'

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class PhysItemList extends Component {

    constructor() {
        super()

        this.state = { isLoading: true, isFetching: false, };
        this.setState({ dataSource: null, ipoid: "", isLoading: false, });

    }

    keyboardHidefunction = () => {

        Keyboard.dismiss()

    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.componentDidMount() });
    }

    LoginPress = () => {

        // alert("Under Development")
        this.props.navigation.navigate('PhysChooseItem')
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
    keyboardHidefunction = () => {

        Keyboard.dismiss()

    }

    exportBtnPress = () => {
       

        AsyncStorage.getItem("ipiid").then(ipiid => {
            AsyncStorage.getItem("token").then(data => {
                AsyncStorage.getItem("userid").then(userId => {
                AsyncStorage.getItem("Sid").then(datasid => {

                    this.setState(
                        {
                            isLoading: true,
                        },

                    );

                    fetch(API_BASE_URL + `admin/exportuser?sid=${datasid}&ipiid=${ipiid}&userid=${userId}&token=${data}`, {
                      
                    }).then((response) => response.json())
                        .then((responseJson) => {

                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );
                            if (responseJson.success){

                                // async (ipiid) => {
                                //     try {
                                //         await AsyncStorage.removeItem(ipiid);
                                //         return true;
                                //     }
                                //     catch(exception) {
                                //         return false;
                                //     }
                                // }

                            //  alert(responseJson.error)
                            // this.refs.loading.show(false);

                            // if (responseJson.status == "error") {

                            //     alert(responseJson.error)
                            // }
                           
                            

                                //alert(responseJson.success)
                                Alert.alert(


                                    "",
                                    responseJson.success,
                                    [
                                        {text: 'ok' , onPress : () => this.gotoHome() },
                                    ]

                                )
                                //this.props.navigation.navigate('PhysChooseItem') 
                            }

    
                        })
                        .catch((error) => {
                            console.error(error);
                            alert(error)
                        });
                });
            })
        })
    })

        // AsyncStorage.getItem("token").then(data => {
        //     AsyncStorage.getItem("Sid").then(datasid => {
        //         if (data) {
        //             this.setState(
        //                 {
        //                     isLoading: true,
        //                 },

        //             );
        //            const url = API_BASE_URL_Demo + 'admin/exportuser?sid='
        //             fetch(url + datasid +  "&ipiid=495" + "&userid=103"+"?token=" + data)

        //            // fetch("https://demoportal.albertapayments.com/api/admin/after_sku_finish?sku=080793803422&sid=${SID}&ipiid=1391")

                  

        //                 .then((response) => response.json())
        //                 .then((responsejson) => {
        //                     this.setState(
        //                         {
        //                             isLoading: false,
        //                         },

        //                     );

        //                     alert(responsejson.success)
        //                  //   this.setState({ isFetching: false })

        //                     // if (responsejson.success) {
        //                     //     Alert.alert(
                
        //                     //       '',
        //                     //       responseJson.success,
        //                     //       [
        //                     //         { text: 'OK', onPress: () => this.navigateToItemList() },
        //                     //        // { text: 'OK', },
        //                     //       ]
        //                     //     )
        //                     //   }
                           
        //                     if (!this.alertPresent) {
        //                         this.alertPresent = true;

        //                         if (responsejson.status == "error") {

        //                             alert(responsejson.error)
        //                         }
        //                         else {
        //                             this.alertPresent = false;

        //                         }
        //                     }



        //                 })
        //                 .catch((error) => {
        //                     console.log(error)
        //                 });
        //         }
        //     })

        // })



        // this.props.navigation.navigate('PhysUserList') 

    }


    cancelBtnPress = () => {

        this.props.navigation.navigate('PhysChooseItem') 
    }


    gotoHome = () => {

        this.props.navigation.navigate('BottomTabComplete') 
    }

    saveDetails = () =>{
        // const { dataSource } = this.state
        // const quantity = dataSource.map( item => item.updateqty)


        Alert.alert(

            '',
            "Physcial Saved Succesfully",
            [
                {
                    text: 'OK', onPress: () => {
                        // let { dataSource } = self.state
                        // dataSource = dataSource.splice(1, index)
                        // this.setState({ dataSource })
                        this.props.navigation.navigate('PhysChooseItem')
                    },
                }
            ]
        )

     //   let { dataSource , item } = this.state
      // alert(JSON.stringify(quantity))
    }

    renderItem = ({ item, index }) => {



        console.log(item.estatus)
        return (
            <View>



                <ScrollView>
                    < View style={{
                        marginTop: 3, borderRightWidth: 1,
                        borderBottomWidth: 1,

                    }
                    }>


                        {/* <TouchableOpacity onPress={this.nextscreen()}> */}

                        


                            <View style={{ flexDirection: 'row', marginLeft: '0%', marginBottom: '0%', marginRight: '2%', width: "100%", }}>
                                <Text style={{ fontSize: 18, marginRight: '2%', color:  '#3386D6', width: "50%" }}>{item.itemname}</Text>


                                <Text style={{ fontSize: 18, marginRight: '2%', color:  '#3386D6', width: "20%" }}>{item.iqtyonhand.toString()}</Text>

                                <Text style={{ fontSize: 18, marginRight: '2%', color:  '#3386D6', width: "20%" }}>{parseInt(item.physicalqty)}</Text>

                                {/* <TextInput style={{
                            fontSize: 18, marginRight: '2%', color: '#3386D6', width: "25%%", borderRadius: 0,
                            borderRightWidth: 0,
                            borderRightColor: '#3386D6',
                            borderLeftWidth: 0,
                            borderLeftColor: '#3386D6',
                            borderTopWidth: 0,
                            borderTopColor: '#3386D6',
                            borderBottomWidth: 0,
                            borderBottomColor: '#3386D6',
                            // backgroundColor: 'white',
                        }}
                            underlineColorAndroid="transparent"
                            returnKeyType="done"
                            keyboardType='number-pad'
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={5}
                            multiline={true}
                            editable={false}
                            value={item.iqtyonhand.toString()}




                        />
                          <TextInput style={{
                            fontSize: 18, marginRight: '2%', color: '#3386D6', width: "25%%", borderRadius: 0,
                            borderRightWidth: 0,
                            borderRightColor: '#3386D6',
                            borderLeftWidth: 0,
                            borderLeftColor: '#3386D6',
                            borderTopWidth: 0,
                            borderTopColor: '#3386D6',
                            borderBottomWidth: 0,
                            borderBottomColor: '#3386D6',
                          //  backgroundColor: 'white',

                        }}

                            underlineColorAndroid="transparent"
                            returnKeyType="done"
                            keyboardType='number-pad'
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.keyboardHidefunction()}
                            multiline={true}
                            maxLength={9}
                          

                        
                            // onFocus={text => {
                            //     const { textInputs, dataSource } = this.state

                            //     textInputs[index] = ''
                            //     // dataSource[index].totalAmount = ''
                            //     this.setState({
                            //         textInputs
                            //     })


                            // }}
                            onChangeText={text => {


                                let { dataSource } = this.state;

                                dataSource[index].updateqty = text

                        //         if (this.state.dataSource[index].qty_received == "") {

                        //             alert("qty cannot be empty")


                        //             return
                        //         }

                        //         if (text) {
                        //             let idx = text.indexOf('.')
                        //             if (idx >= 0) {
                        //                 text = text.slice(0, idx + 3)
                        //             }
                        //         }



                        //         if ((/^\d*[.]?\d*$/).test(text)) {

                        //             let { dataSource, textInputs } = this.state;

                        //             text = ((text == "") || (text == undefined)) ? 0.00 : text;


                               //     textInputs[index] = text
                                    this.setState({
                                        physicalqty: ""
                                       

                                    });
     

                            }}

                          //   value={item.updateqty}
                             value={this.state.dataSource[index].physicalqty}


                         /> */}

                            </View>


                    </View >

                </ScrollView>



            </View>

        )


    }

    componentDidMount() {


        AsyncStorage.getItem("ipiid").then(ipiid => {
        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("Sid").then(datasid => {
                if (data) {
                    this.setState(
                        {
                            isLoading: true,
                        },

                    );
                   const url = API_BASE_URL + 'admin/after_sku_finish?sid='
                    fetch(url + datasid +  "&ipiid=" +ipiid +"?token=" + data)

                        .then((response) => response.json())
                        .then((responsejson) => {
                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );

                            this.setState({ isFetching: false })

                            if (responsejson.status == "success") {
                                // dataSource = dataSource.map(data => {
                                //     data["updateqty"] = data.updateqty
                                //     return data
                                // })

                                this.setState({ dataSource: responsejson.data })
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
                    Item Information

                </Text>
                {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}

                <TouchableOpacity
                    style={styles.btncontainer}
                    onPress={this.LoginPress}
                >
                    <Text style={styles.btntext}>Add New</Text>
                </TouchableOpacity>



                <View style={styles.container}>


                    <View flexDirection='row' marginTop='0%'>



                        <View style={{
                            width: '35%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', fontWeight: "bold" }}>Item Name
                            
</Text>
                        </View>

                        <View style={{
                            width: '35%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>QOH
</Text>
                        </View>

                        <View style={{
                            width: '30%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 18, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Physical Qty
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
                      //  ItemSeparatorComponent={this.renderSeparator}

                    />

                </View>


                {/* <View style={{ marginTop: 0, backgroundColor: '#000', height: '20%' }}>



                </View> */}
                {/* </KeyboardAwareScrollView> */}

<View style={styles.btncontainerr}>


<TouchableOpacity
    style={styles.btncontainer1}
    onPress={this.saveDetails}
>
    <Text style={styles.btnText}> Save </Text>
</TouchableOpacity>
<TouchableOpacity
    style={styles.btncontainer2}
    onPress={this.exportBtnPress}
>
    <Text style={styles.btnText}> Export </Text>
</TouchableOpacity>
<TouchableOpacity
    style={styles.btncontainer1}
    onPress={this.cancelBtnPress}
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
        paddingTop: 5,
        marginTop: 5,
        // flex : 1,
        // marginBottom: '0%'
       


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
        // // marginBottom: '0%'
        // marginTop: "60%",
        // marginBottom: "10%",
        // height: "40%",
              flexDirection: "row",
        // marginBottom: '0%'
        marginTop: "10%",
        height: "20%",
    },
    btnText: {
        marginLeft: 0,
        fontSize: 20,
        color: "#fff"
    },


    btncontainer1: {
        backgroundColor: "#f15a2c",

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
        backgroundColor: "#f15a2c",

        borderRadius: 10,
        // mirginTop: 10,
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 70
    },

})