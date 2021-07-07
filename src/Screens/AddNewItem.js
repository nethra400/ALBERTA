import React, { Component } from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    KeyboardAvoidingView,
    View,
    Keyboard,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Picker,
    PickerIOS,
    Alert,
    SafeAreaView,
    ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { CheckBox } from "react-native-elements";
import Entypo from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from "react-native-simple-radio-button";
import {Button} from 'react-native-elements';
import { Dropdown } from "react-native-material-dropdown";
import Loading from "react-native-whc-loading";
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default class AddNewItem extends React.Component {
    testArray = [
        {
            label: "Yes                     ",
            value: 0
        },
        {
            label: "No                     ",
            value: 1
        }
    ];
    // static navigationOptions = ({ navigation }) => {
    //     const { params } = navigation.state;
    //        return {
    //         headerTitle: (
    //           <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
    //             <Image source={require('../images/poslogo.jpg')}
    //               style={{ height: 100, width: 100, marginRight: 20, resizeMode: 'contain' }} />
    //           </View>
    //         ),
           
    //            headerRight: (<View  style={{ marginRight: 0 }}>
    //       <TouchableOpacity onPress={()=>params.onPressMethod()}>
    //       <MaterialIcons name="save" size={35} color="#3386D6" />  
    //       </TouchableOpacity>
           
    //        </View>)
    //     };  
    //   }

    constructor() {
        super();
        this.state = {
            check: true,
            isLoading: true,
            PickerValueHolder: "",
            categoryHolder: "",
            subcategoryHolder: "",
            deptHolder: "",
            supplierHolder: "",
            VerificationHolder: "",
            catdata: [],
            supdata: [],
            subcategortdata: [],
            data: [],
            cost: "",
            item: "",
            sellingPrice: "",
            qty_on_hand: "",
            department: "",
            category: "",
            supplier: "",
            subcategory: "",
            selling_unit: "",
            age_verification: "",
            food_stamp: "",
            barcode: "",
            visinventory: "",
            tax1: "",
            tax2: "",
            tax3: "",
            foodItem: "",
            taxValue: "",
            tax1Value: "",
            vdepartmentname: "",
            vcompanyname: "",
            vcategoryname: "",
            InventoryDataHolder: "",
            vdepcode: "",
            vcategorycode: "",
            vsuppliercode: "",
            ageverificationArray: [],
            vsubcategoryname: "",
            vsubcategorycode: "",
            nbottledepositamt: "",
            taxArray: [],
            sizeTypeArray: [],
            sizeArrayValue : "",
            ManufacturerArray: [],
            ManufacturerValue : "",
            unitArray: [],
            unitValue : "",
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({onPressMethod: this.saveNPLItemDetails });
        this.setState({ showCategory: 0 });

        
        const item = this.props.route.params.item;
        this.setState({
            item: item
        });
        const cost = this.props.route.params.cost;
        this.setState({
            cost: cost
        });
        const sellingPrice = this.props.route.params.sellingPrice;
        this.setState({
            sellingPrice: sellingPrice
        });
        const qty_on_hand = this.props.route.params.qty_on_hand;
        this.setState({
            qty_on_hand: qty_on_hand
        });
        const department = this.props.route.params.department;
        this.setState({
            department: department
        });
        const category = this.props.route.params.category;
        this.setState({
            category: category
        });
        const supplier = this.props.route.params.supplier;
        this.setState({
            supplier: supplier
        });
        const visinventory = this.props.route.params.visinventory;
        this.setState({
            visinventory: visinventory
        });
        const selling_unit = this.props.route.params.selling_unit;
        this.setState({
            selling_unit: selling_unit
        });
        const age_verification = this.props.route.params.age_verification;
        this.setState({
            age_verification: age_verification
        });
        const food_stamp = this.props.route.params.food_stamp;
        this.setState({
            food_stamp: food_stamp
        });

        const vdepartmentname = this.props.route.params.vdepartmentname;
        this.setState({
            vdepartmentname: vdepartmentname
        });

        const vcategoryname = this.props.route.params.vcategoryname;
        this.setState({
            vcategoryname: vcategoryname
        });

        const vcompanyname = this.props.route.params.vcompanyname;
        this.setState({
            vcompanyname: vcompanyname
        });

        const vdepcode = this.props.route.params.vdepcode;
        this.setState({
            vdepcode: vdepcode
        });

        const vcategorycode = this.props.route.params.vcategorycode;
        this.setState({
            vcategorycode: vcategorycode
        });

        const vsuppliercode = this.props.route.params.vsuppliercode;
        this.setState({
            vsuppliercode: vsuppliercode
        });

        const vsubcategoryname = this.props.route.params.vsubcategoryname;
        this.setState({
            vsubcategoryname: vsubcategoryname
        });

        const nbottledepositamt = this.props.route.params.nbottledepositamt;
        this.setState({
            nbottledepositamt: nbottledepositamt
        });



        const vsubcategorycode = this.props.route.params.vsubcategorycode;
        this.setState({
            vsubcategorycode: vsubcategorycode
        });

        const unitValue = this.props.route.params.vunitcode;
        this.setState({
            unitValue: unitValue
        });

        const vsize = this.props.route.params.vsize;
        this.setState({
            sizeArrayValue: vsize
        });


        const manufacturer_id = this.props.route.params.manufacturer_id;
        this.setState({
            ManufacturerValue: manufacturer_id
        });
        
        




        if (vsubcategorycode != "") {
            this.setState({
                categoryHolder: vcategorycode
            });
            this.getSubCategoryList(vcategorycode, 1);
            this.setState({
                subcategoryHolder: vsubcategoryname
            });
        }

        if (vsubcategorycode == "") {
            this.setState({
                categoryHolder: vcategorycode
            });
            this.getSubCategoryList(vcategorycode, 1);
            this.setState({
                subcategoryHolder: vsubcategoryname
            });
        }

        if (vdepcode != "") {
            this.setState({
                deptHolder: vdepcode
            });
            this.getCategoryList(vdepcode, 1);
            this.setState({
                categoryHolder: vcategorycode
            });
        }
        if (vsuppliercode != "") {
            this.setState({
                supplierHolder: vsuppliercode
            });
        }

        if (food_stamp == "N") {
            this.state.foodItem = 1;
        }
        if (food_stamp == "Y") {
            this.state.foodItem = 0;
        }
        if (age_verification != "") {
            this.setState({
                VerificationHolder: age_verification
            });
        }

        const barcode = this.props.route.params.barcode;
        this.setState({
            barcode: barcode
        });

        const isInventery = this.props.route.params.isInventery;
        this.setState({
            isInventery: isInventery
        });

        if (isInventery != "") {
            this.setState({
                InventoryDataHolder: isInventery
            });
        }

        const tax1 = this.props.route.params.tax1;
        this.setState({
            tax1: tax1
        });
        const tax2 = this.props.route.params.tax2;

        this.setState({
            tax2: tax2
        });

        const tax3 = this.props.route.params.tax3;

        this.setState({
            tax3: tax3
        });


        if (tax1 == "Y"){

            this.state.tax1Value ="Y"
            this.setState({
              tax1 : "Y",
              tax2 : "N",
              tax3 : "N"
            })
        }

        if (tax2 == "Y"){

            this.state.tax1Value ="1"
            this.setState({
              tax1 : "N",
              tax2 : "Y",
              tax3 : "N"
            })
        }

        if (tax3 == "Y"){

            this.state.tax1Value ="2"
            this.setState({
              tax1 : "N",
              tax2 : "N",
              tax3 : "Y"
            })
        }

        if(tax1 == "N" && tax2 == "N" &&tax3 == "N"  ){
            this.state.tax1Value ="3"
            this.setState({
              tax1 : "N",
              tax2 : "N",
              tax3 : "N"
            })
            

        }


        AsyncStorage.getItem("token").then((data) => {
            AsyncStorage.getItem("Sid").then((SID) => {
                if (data) {
                    return fetch(
                        API_BASE_URL + `admin/department/list/${SID}?token=${encodeURIComponent(
                            data
                        )}`
                    )
                        .then(response => response.json())
                        .then(responseJson => {
                            this.setState(
                                {
                                    isLoading: false,
                                    data: responseJson.data
                                },
                                function () {
                                    // In this block you can do something with new state.
                                }
                            );
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        });
        AsyncStorage.getItem("token").then((data) => {
            AsyncStorage.getItem("Sid").then((SID) => {
                if (data) {
                    return fetch(
                        API_BASE_URL +
                        `admin/vendor/list/${SID}?token=${encodeURIComponent(data)}`
                    )
                        .then(response => response.json())
                        .then(responseJson => {
                            this.setState(
                                {
                                    isLoading: false,
                                    supdata: responseJson.data
                                },
                                function () {
                                    // In this block you can do something with new state.
                                }
                            );
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        });

        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/size/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                sizeTypeArray: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })


        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/manufacture/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                ManufacturerArray: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })

        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/unit/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                unitArray: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })

        
        AsyncStorage.getItem("token").then((data) => {
            AsyncStorage.getItem("Sid").then((SID) => {
                if (data) {
                    return fetch(
                        API_BASE_URL +
                        `admin/ageverification/list/${SID}?token=${encodeURIComponent(
                            data
                        )}`
                    )
                        .then(response => response.json())
                        .then(responseJson => {
                            this.setState(
                                {
                                    isLoading: false,
                                    ageverificationArray: responseJson.data
                                },
                                function () {
                                    // In this block you can do something with new state.
                                }
                            );
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        });
    }

    getCategoryList = (deparmentID, isLoad = 0) => {
        // this.state.vcategoryname = ""
        // // this.state.categoryHolder = ""
        // this.setState({ deptHolder: deparmentID })

        this.state.vcategoryname = "";
        this.state.categoryHolder = "";

        this.state.vsubcategoryname = "";
        this.state.subcategoryHolder = "";
        this.setState({
            deptHolder: deparmentID
        });

        
        // this.setState({ categoryHolder: this.state.categoryHolder })

        AsyncStorage.getItem("token").then((data) => {
            AsyncStorage.getItem("Sid").then((SID) => {
                if (data) {
                    return fetch(
                        API_BASE_URL + `admin/category/list/${SID}/${deparmentID}?token=${encodeURIComponent(
                            data
                        )}`
                    )
                        .then(response => response.json())
                        .then(responseJson => {
                            // this.refs.loading.show(false);

                            if (responseJson.data.length === 0) {
                                this.setState({
                                    isLoading: false,
                                    catdata: responseJson.data,
                                    categoryHolder: ""
                                });
                            } else {
                                this.setState(
                                    {
                                        isLoading: false,
                                        catdata: responseJson.data
                                        // categoryHolder: ''
                                    },
                                    function () {
                                        // In this block you can do something with new state.
                                    }
                                );
                            }
                            this.componentWillUnmount;
                            if (isLoad == 0) {
                                this.setState({
                                    categoryHolder: ""
                                });
                            } else {
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        });
    };
    getSubCategoryList = (subCategoryID, isLoad = 0) => {
        // this.state.vcategoryname = ""
        // this.state.categoryHolder = ""
        // this.setState({ deptHolder: deparmentID })
        // this.setState({ categoryHolder: this.state.categoryHolder })

        this.state.vsubcategoryname = "";
        this.state.subcategoryHolder = "";
        this.setState({
            categoryHolder: subCategoryID
        });

        AsyncStorage.getItem("token").then((data) => {
            AsyncStorage.getItem("Sid").then((SID) => {
                if (data) {
                    return fetch(
                        API_BASE_URL + `admin/subcategorysid?category_id=${subCategoryID}&sid=${SID}&token=${encodeURIComponent(
                            data
                        )}`
                    )
                        .then(response => response.json())
                        .then(responseJson => {
                            console.log(responseJson)
                            this.setState(
                                {
                                    isLoading: false,
                                    subcategortdata: responseJson.data
                                    // subcategoryHolder: '',
                                },
                                function () {
                                    // In this block you can do something with new state.
                                }
                            );
                            if (isLoad == 0) {
                                this.setState({
                                    subcategoryHolder: ""
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        });
    };

    GetPickerSelectedItemValue = () => {
        Alert.alert(this.state.PickerValueHolder);
    };

    saveNPLItemDetails = deparmentID => {



        
        if (this.state.foodItem == 0) {
            this.state.foodItem = "Y";
        }

        if (this.state.foodItem == 1) {
            this.state.foodItem = "N";
        }

        // if (this.state.checkedTax1 == true) {
        //     this.state.checkedTax1 = "Y";
        // }
        // if (this.state.checkedTax1 == false) {
        //     this.state.checkedTax1 = "N";
        // }

        // if (this.state.checkedTax2 == true) {
        //     this.state.checkedTax2 = "Y";
        // }
        // if (this.state.checkedTax2 == false) {
        //     this.state.checkedTax2 = "N";
        // }

        // if (this.state.checkedTax3 == true) {
        //     this.state.checkedTax3 = "Y";
        // }
        // if (this.state.checkedTax3 == false) {
        //     this.state.checkedTax3 = "N";
        // }

    
       if(this.state.categoryHolder == ""){

        this.state.categoryHolder = this.state.vcategoryname
       }



        AsyncStorage.getItem("token").then((data) => {
            // alert(this.state.categoryHolder)
            AsyncStorage.getItem("Sid").then((sid) => {
                if (sid) {
                    if (data) {
                        this.setState(
                            {
                                isLoading: true,
                            },
    
                        );
                        fetch(
                            API_BASE_URL + `admin/insert/item/customer?token=${encodeURIComponent(
                                data
                            )}`,
                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    sku: this.state.barCodeNumber,
                                    sid: sid,
                                    item_name: this.state.item,
                                    cost: this.state.cost,
                                    barcode: this.state.barcode,
                                    selling_price: this.state.sellingPrice,
                                    qty_on_hand: this.state.qty_on_hand,
                                    department_code: this.state.deptHolder,
                                    subcat_id: this.state.subcategoryHolder,
                                    category_code: this.state.categoryHolder,
                                    supplier_code: this.state.supplierHolder,
                                    age_verification: this.state.VerificationHolder,
                                    is_inventory: "YES",
                                    food_stamp: this.state.foodItem,
                                    tax1: this.state.tax1,
                                    tax2: this.state.tax2,
                                    tax3 : this.state.tax3,
                                    nbottledepositamt: this.state.nbottledepositamt,
                                    "size" :this.state.sizeArrayValue,
                                    "vunitcode" :this.state.unitValue,
                                    "manufacturer_id" :this.state.ManufacturerValue
                                    //  tax3: this.state.checkedTax3
                                })

                            }

                        )

                            .then(response => response.json())
                            .then(responseJson => {
                                this.setState(
                                    {
                                        isLoading: false,
                                    },
            
                                );
                                if (responseJson.message) {

                                //    if (responseJson.message == "The qty on hand field is required."){

                                //     Alert.alert("")
                                //    }

                                    Alert.alert(responseJson.message);
                                }

                                if (responseJson.success) {
                                    Alert.alert(
                                        "",
                                        responseJson.success,
                                        [
                                            { text: 'OK', onPress: () => this.cancelBtnPress() },

                                        ]
                                    )

                                }
                                if (responseJson.error) {
                                    alert(responseJson.error);
                                }
                            })

                            .catch(error => {
                                console.error(error);
                            });
                    }
                }
            });
        });
    };
    cancelBtnPress = () => {
        this.props.navigation.navigate("Items");
    };

    keyboardHidefunction = () => {

        Keyboard.dismiss()

    }

    ConTwoDecDigit=(digit)=>{
        return digit.indexOf(".")>0?
                digit.split(".").length>=2?
                 digit.split(".")[0]+"."+digit.split(".")[1].substring(-1,2)
                : digit
               : digit
      }

    getTaxlist = (item, index) => {

        if (index == 0) {

            this.setState({
                tax1: "Y",
                tax2: "N",
                tax3: "N",
                //   nonTaxable: "N"
            })
        }

        if (index == 1) {

            this.setState({
                tax1: "N",
                tax2: "Y",
                tax3: "N",
                //  nonTaxable: "N"
            })
        }
        if (index == 2) {

            this.setState({
                tax1: "N",
                tax2: "N",
                tax3: "Y",
                //  nonTaxable: "N"
            })
        }
        if (index == 3) {

            this.setState({
                tax1: "N",
                tax2: "N",
                tax3: "N",
                //  nonTaxable: "Y"
            })
        }
    }

    render() {
        this.state.taxArray = [
            {
                value: "Y",
                label: 'Tax1'
            },
            {
                value: "1",
                label: 'Tax2',
            },
            {
                value: "2",
                label: 'Tax3',
            },
            {
                value: "3",
                label: 'Non Taxable',
            },
        ];
        <Loading ref="loading" />;
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        paddingTop: 20
                    }}
                >
                    <ActivityIndicator />
                </View>
            );
        }
        let InventoryData = [
            {
                value: "YES"
            },
            {
                value: "NO"
            }
        ];
        // this.state.tax3 = "N"
        const { tax3 } = this.state
        return (
            <View style={styles.MainContainer}>
                 <View style={{width: '100%',marginTop:100}}>
                    <ImageBackground
                        source={require('../assets/images/header.jpeg')}
                        style={{position: 'relative', height: 100, paddingTop: 20}}>
                        <View
                            style={{
                               // display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal:20,
                    marginTop:15
                            }}>
                            <FontAwesome style={{marginRight:10}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Items')} />
                            <Text style={{color: 'white',fontSize:15,paddingVertical:3}}  onPress={()=>this.props.navigation.navigate('Items')}>Add/Edit Item</Text>
                        </View>
                    </ImageBackground>
                </View>
            <View style={{marginTop:10}}>
                {/* <KeyboardAwareScrollView> */}
                  
                    <ScrollView style={{marginTop:10}}>
                        <View style={styles.logocontainer}>
                            {/* <View
                                style={{
                                    width: "40%"
                                }}
                            >
                                <Text style={styles.setTextSize}> Item Name <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View> */}
                            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.setTextSize}>Item Name</Text>
            </View>
                            <View
                                 style={{
                                    alignItems: 'flex-start',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                  }}
                            >
                                <TextInput
                                    // style={styles.input}
                                    // returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.item}
                                    onChangeText={item =>
                                        this.setState({
                                            item
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View
                               style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                            >
                                <Text style={styles.setTextSize}> Bar Code <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                               style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                              }}
                            >
                                <TextInput
                                    // style={styles.input}
                                    // returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.barcode}
                                />
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                            >
                                <Text style={styles.setTextSize}> Cost  </Text>
                            </View>
                            <View
                               style={{
                                alignItems: 'flex-start',
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                // paddingRight:30
                              }}
                            >
                                <TextInput
                                    // style={styles.input}
                                    // returnKeyType="done"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    autoCorrect={false}
                                    value={this.state.cost}
                                    keyboardType="numeric"
                                    onEndEditing={
                                        text => {
                                     
                                           this.setState({
                                                cost: (parseFloat(this.state.cost)).toFixed(2)
                                             })                                               
                                    
                                }
                            }
                                    onChangeText={cost =>
                                        this.setState({
                                            cost : this.ConTwoDecDigit(cost)
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                    paddingHorizontal: 5,
                                    paddingVertical: 10,
                                  }}
                            >
                                <Text style={styles.setTextSize}> Price <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                               style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                              }}
                            >
                                <TextInput
                                    // style={styles.input}
                                    returnKeyType="done"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    autoCorrect={false}
                                    value={this.state.sellingPrice}
                                    keyboardType="numeric"
                                    onEndEditing={
                                        text => {
                                     
                                           this.setState({
                                                sellingPrice: (parseFloat(this.state.sellingPrice)).toFixed(2)
                                             })                                               
                                    
                                }
                            }
                                    onChangeText={sellingPrice =>
                                        this.setState({
                                            sellingPrice: this.ConTwoDecDigit(sellingPrice)
                                        })
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                                        <View
                                            style={{
                                                width: "40%"
                                            }}
                                        >
                                            <Text style={styles.setDepartmentTextSize}>Unit <Text style ={styles.setStarTextSize}>*</Text></Text>
                                        </View>
                                        <View
                                          style={{
                                            width:'60%'
                                             }}
                                        >
                                            <Dropdown
                                                label=""
                                                data={this.state.unitArray}
                                                value={this.state.unitValue}
                                                // selectedValue={this.state.deptHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 12, left: 25 }}
                                                fontSize={16}
                                                height = {12}
                                                shadeOpacity="2.0"
                                                containerStyle={styles.input1}
                                                onChangeText={(value, index) =>
                                                    this.setState({ unitValue: value })
                                                }

                                                // onChangeText={(value, index) =>
                                                //     this.setState({ taxvalue: value })
                                                // }
                                            />
                                        </View>
                                    </View>
                                    
                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width:'40%'
                                     }}
                            >
                                <Text style={styles.setDepartmentTextSize}> Department <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                               style={{
                                width:'60%'
                                 }}
                            >
                                <Dropdown
                                    label=""
                                    data={this.state.data}
                                    value={this.state.vdepartmentname}
                                    selectedValue={this.state.deptHolder}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    shadeOpacity="2.0"
                                    
                                    containerStyle={styles.input1}
                                    onChangeText={(value, index) => this.getCategoryList(value)}
                                />
                            </View>
                        </View>
                        <View style={styles.logocontainer}>
                            <View
                              style={{
                                width:'40%'
                                 }}
                            >
                                <Text style={styles.setDepartmentTextSize}> Category <Text style ={styles.setStarTextSize}>*</Text></Text>
                            </View>
                            <View
                                style={{
                                    width:'60%'
                                     }}
                            >

                                {
                                    <Dropdown
                                        label=""
                                        data={this.state.catdata}
                                        value={this.state.vcategoryname}
                                      //  selectedValue={label}
                                        itemTextStyle="bold"
                                        labelFontSize={16}
                                        fontSize={16}
                                        containerStyle={styles.input1}
                                        onChangeText={(value, label) =>
                                            this.setState(
                                                {
                                                    categoryHolder: value,
                                                    vcategoryname:label
                                                },
                                                this.getSubCategoryList(value)
                                            )
                                        }
                                    />
                                }
                            </View>
                        </View>
                        {/* Sub category starts*/}

                        {showcategary ? <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width:'40%'
                                     }}
                            >
                                <Text style={styles.setDepartmentTextSize}> Sub category </Text>
                            </View>
                            <View
                                  style={{
                                    width:'60%'
                                     }}
                            >
                                <Dropdown
                                    label=""
                                    data={this.state.subcategortdata}
                                    // value={this.state.vsubcategoryname}
                                    value={this.state.vsubcategoryname}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    shadeOpacity="2.0"
                                    containerStyle={styles.input1}
                                    onChangeText={(value, index) =>
                                        this.setState({
                                            subcategoryHolder: value
                                        })
                                    }
                                />
                            </View>
                        </View>
                            : <View></View>}

                        {/* Sub category starts*/}
                        <View style={styles.logocontainer}>
                            <View
                               style={{
                                width:'40%'
                                 }}
                            >
                                <Text style={styles.setDepartmentTextSize}> Supplier <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                 style={{
                                    width:'60%'
                                     }}
                            >

                                {
                                    <Dropdown
                                        label=""
                                        data={this.state.supdata}
                                        value={this.state.vcompanyname}
                                        itemTextStyle="bold"
                                        labelFontSize={16}
                                        fontSize={16}
                                        selectedValue={this.state.supplierHolder}
                                        containerStyle={styles.input1}
                                        onChangeText={(value, index) =>
                                            this.setState({
                                                supplierHolder: value
                                            })
                                        }
                                    />
                                }
                            </View>
                        </View>
                        {/* <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}
                            >
                                <Text style={styles.setDepartmentTextSize}>

                                    Inventory Item
                </Text>
                            </View>            
                            <View
                                style={{
                                    width: "60%"
                                }}
                            >
                                <Dropdown
                                    label="Select Inventory"
                                    data={InventoryData}
                                    value={this.state.visinventory}
                                    selectedValue={this.state.InventoryDataHolder}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    shadeOpacity="2.0"
                                    containerStyle={styles.inputt}
                                    onChangeText={(value, index) =>
                                        this.setState({
                                            InventoryDataHolder: value
                                        })
                                    }
                                />
                            </View>
                        </View> */}
                        <View style={styles.logocontainer}>
                            <View
                               style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                            >
                                <Text style={styles.setTextSize}> QOH </Text>
                            </View>
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                  }}
                            >
                                <TextInput
                                    // style={styles.input}
                                    //returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    returnKeyType="done"             
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    value={this.state.qty_on_hand}
                                    onChangeText={qty_on_hand =>
                                        this.setState({
                                            qty_on_hand
                                        })
                                    }
                                />
                            </View>
                        </View>

                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                    paddingHorizontal: 5,
                                    paddingVertical: 10,
                                  }}
                            >
                                <Text style={styles.setTextSize}> Bottle Deposit </Text>
                            </View>
                            <View
                                 style={{
                                    alignItems: 'flex-end',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                  }}
                            >
                                <TextInput
                                    // style={styles.input}
                                    returnKeyType="done"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    autoCorrect={false}
                                    value={this.state.nbottledepositamt}
                                    keyboardType="numeric"
                                    onChangeText={nbottledepositamt =>
                                        this.setState({
                                            nbottledepositamt :this.ConTwoDecDigit(nbottledepositamt)
                                        })
                                    }
                                />
                            </View>
                        </View>
                        {/* <View style={styles.taxContainer}>
                            <View
                                style={{
                                    width: "20%"
                                }}
                            >
                                <Text style={styles.setTextSize}> Tax </Text>
                            </View>
                            <View
                                style={{
                                    width: "30%"
                                }}
                            >
                                <View flexDirection="row">
                                    <CheckBox
                                        checkedIcon={
                                            <Entypo name="checksquare" size={15} color="#3386D6">

                                            </Entypo>
                                        }
                                        uncheckedIcon={
                                            <FontAwesome name="square-o" size={15} color="#636466" />
                                        }
                                        title="Tax1"
                                        checked={this.state.checkedTax1}
                                        onPress={() =>
                                            this.setState({
                                                checkedTax1: !this.state.checkedTax1
                                            })
                                        }
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#fff"
                                        }}
                                    />
                                    <CheckBox
                                        checkedIcon={
                                            <Entypo
                                                name="checksquare"
                                                size={15}
                                                color="#3386D6"
                                                marginLeft="0%"
                                                marginTop="0%"
                                            />
                                        }
                                        uncheckedIcon={
                                            <FontAwesome name="square-o" size={15} color="#636466" />
                                        }
                                        title="Tax2"
                                        checked={this.state.checkedTax2}
                                        onPress={() =>
                                            this.setState({
                                                checkedTax2: !this.state.checkedTax2
                                            })
                                        }
                                    />
                                    {
                                        (tax3 == "" || (tax3 === "Y" || tax3 === "N"))
                                            ?
                                            <CheckBox
                                                checkedIcon={
                                                    <Entypo
                                                        name="checksquare"
                                                        size={15}
                                                        color="#3386D6"
                                                        marginLeft="0%"
                                                        marginEnd="1%"
                                                    />
                                                }
                                                uncheckedIcon={
                                                    <FontAwesome name="square-o" size={15} color="#636466" />
                                                }
                                                title="Tax3"
                                                checked={this.state.checkedTax3}
                                                onPress={() =>
                                                    this.setState({
                                                        checkedTax3: !this.state.checkedTax3
                                                    })
                                                }
                                            />
                                            :
                                            null
                                    }
                                </View>
                            </View>
                        </View> */}



                        <View style={styles.logocontainer}>
                            <View
                               style={{
                                width:'40%'
                                 }}
                            >
                                <Text style={styles.setDepartmentTextSize}>Tax</Text>
                            </View>
                            <View
                                  style={{
                                    width:'60%'
                                     }}
                            >
                                <Dropdown
                                    label=""
                                    data={this.state.taxArray}
                                    value={this.state.tax1Value}
                                    // selectedValue={this.state.deptHolder}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    dropdownOffset={{ top: 12, left: 20 }}
                                    fontSize={16}
                                    height={12}
                                    shadeOpacity="2.0"
                                    containerStyle={styles.input1}
                                    onChangeText={(value, index) =>
                                        this.getTaxlist(value, index)
                                    }

                                />
                            </View>
                        </View>


                        <View style={styles.logocontainer}>
                                        <View
                                          style={{
                                            width:'40%'
                                             }}
                                        >
                                            <Text style={styles.setDepartmentTextSize}>Size</Text>
                                        </View>
                                        <View
                                              style={{
                                                width:'60%'
                                                 }}
                                        >
                                            <Dropdown
                                                label=""
                                                data={this.state.sizeTypeArray}
                                                value={this.state.sizeArrayValue}
                                                // selectedValue={this.state.deptHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 12, left: 25 }}
                                                fontSize={16}
                                                height = {12}
                                                shadeOpacity="2.0"
                                                containerStyle={styles.input1}
                                                onChangeText={(value, index) =>
                                                    this.setState({ sizeArrayValue: value })
                                                }

                                                // onChangeText={(value, index) =>
                                                //     this.setState({ taxvalue: value })
                                                // }
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.logocontainer}>
                                        <View
                                           style={{
                                            width:'40%'
                                             }}
                                        >
                                            <Text style={styles.setDepartmentTextSize}>Manufacturer</Text>
                                        </View>
                                        <View
                                             style={{
                                                width:'60%'
                                                 }}
                                        >
                                            <Dropdown
                                                label=""
                                                data={this.state.ManufacturerArray}
                                                value={this.state.ManufacturerValue}
                                                // selectedValue={this.state.deptHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 12, left: 25 }}
                                                fontSize={16}
                                                height = {12}
                                                shadeOpacity="2.0"
                                                containerStyle={styles.input1}
                                                onChangeText={(value, index) =>
                                                    this.setState({ ManufacturerValue: value })
                                                }

                                                // onChangeText={(value, index) =>
                                                //     this.setState({ taxvalue: value })
                                                // }
                                            />
                                        </View>
                                    </View>


                        {/* <View style={styles.logoContainer}>
                            <View
                               style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                            >
                                <Text style={styles.setTextSize}> Food Item </Text>
                            </View>
                            <View
                                  style={{
                                    alignItems: 'flex-end',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                  }}
                            >
                                <RadioForm
                                    radio_props={this.testArray}
                                    labelstyle={{
                                        fontSize: 40,
                                        fontWeight: "bold",
                                        alignItems: "center",
                                        
                                    }}
                                    flexDirection="row"
                                    buttonSize={12}
                                    height = {0}
                                    formHorizontal={true}
                                    animation={true}
                                    initial={this.state.foodItem}
                                    labelColor="#636466"
                                    selectedLabelColor="#286fb7"
                                    onPress={foodItem => {
                                        this.setState({
                                            foodItem: foodItem
                                        });
                                    }}
                                />
                            </View>
                        </View> */}
                        <View style={styles.logocontainer}>
                            <View
                              style={{
                                width:'40%'
                                 }}
                            >
                                <Text style={styles.setTextSize}> Age Verification </Text>
                            </View>
                            <View
                                  style={{
                                    width:'60%'
                                     }}
                            >

                                {
                                    <Dropdown
                                        label=""
                                        data={this.state.ageverificationArray}
                                        value={this.state.age_verification}
                                        itemTextStyle="bold"
                                        labelFontSize={16}
                                        fontSize={16}
                                        selectedValue={this.state.VerificationHolder}
                                        containerStyle={styles.input1}
                                        onChangeText={(value, index) =>
                                            this.setState({
                                                VerificationHolder: value
                                            })
                                        }
                                    />
                                }
                            </View>
                        </View>
                        {/* <View style={styles.btncontainerr}>
                            
                            <TouchableOpacity
                                style={styles.btncontainer}
                                onPress={this.saveNPLItemDetails}
                            >
                                <Text style={styles.btnText}> Save </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btncontainer}
                                onPress={this.cancelBtnPress}
                            >
                                <Text style={styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                            
                        </View> */}
                        <View style={{display: 'flex'}}>
          <Button
            style={{marginTop: 10}}
            titleStyle={{color: '#fff', fontSize: 16}}
            buttonStyle={{
              padding: 12,
              backgroundColor: '#3386D6',
              borderRadius: 25,
            }}
            containerStyle={{margin: 20}}
            //type="outline"
            title="Save"
            onPress={()=>this.saveNPLItemDetails()}
          />
        </View>
                    
                    </ScrollView>
                    
                    <Loading ref="loading" />
                {/* </KeyboardAwareScrollView> */}
                
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logocontainer: {
        width: '95%',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        flexDirection: 'row',
        height: 45,
        // backgroundColor: 'red',
        // paddingRight: 8,
        paddingLeft: 28,
        // width: '100%',
        borderTopWidth: 0.4,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        // backgroundColor: '#fff',
        marginBottom: 8,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#ccc',
        justifyContent: 'space-between',
    },

    btncontainerr: {
        flexDirection: "row",
        marginLeft: 50
    },
    logocontainer1: {
        flex: 1,
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 10,
        flexDirection: "row"
    },
    ScrollContainer: {
        flex: 1,
        marginTop: 0,
        marginBottom: 3,
        marginLeft: 10,
        width: 100,

        flexDirection: "row"
    },
    MainContainer: {
        flex: 1,

        // Set content's vertical alignment.
        justifyContent: "center",

        // // Set content's horizontal alignment.
        alignItems: "center",

        // Set hex color code here.
        // backgroundColor: "#ccc"
    },

    MainContainer1: {
        justifyContent: "center",
        flex: 1,
        margin: 10
    },
    taxContainer: {
        flex: 1,
        marginTop: 13,
        // marginBottom: 20,
        marginRight: 5,
        marginLeft: 10,
        backgroundColor: "#fff",

        flexDirection: "row"
    },
    foodContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: "row"
    },

    setTextSize: {
        fontSize: 18,
        fontWeight: "300",
        color: "#286fb7"
    },
    setDepartmentTextSize: {
        fontSize: 18,
        fontWeight: "300",
        color: "#286fb7"
    },
    setCheckMark: {
        width: 50,
        height: 50,
        marginLeft: 70,
        color: "#286fb7"
        //  color: 'white'
    },
    input: {
        height: 45,
        // backgroundColor: 'red',
        paddingRight: 8,
        paddingLeft: 18,
        width: '80%',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        // backgroundColor: '#fff',
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#ccc',
    },
    input1:{
        height: 40,
        // backgroundColor: '#fff',
    
        // marginEnd: 10,
        // borderRadius: 3,
        // borderRightWidth: 1,
        // borderRightColor: '#636466',
        // borderLeftWidth: 1,
        // borderLeftColor: '#636466',
        // borderTopWidth: 1,
        // borderTopColor: '#636466',
        // borderBottomWidth: 1,
        // borderBottomColor: '#636466',
    
        marginBottom: 40,
        color: 'white',
        //       fontSize: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },

    inputt: {
        //width: 250,
        alignSelf: "stretch",
        height: 70,

        marginEnd: 10,
        borderRadius: 3,
        borderRightWidth: 1,
        borderRightColor: "#636466",
        borderLeftWidth: 1,
        borderLeftColor: "#636466",
        borderTopWidth: 1,
        borderTopColor: "#636466",
        borderBottomWidth: 1,
        borderBottomColor: "#636466",

        marginBottom: 10,
        color: "#000",
        fontSize: 15,
        paddingHorizontal: 20
    },
    setDroupDownStyleInput: {
        marginRight: 10,
        marginLeft: 20,
        height: 40,
        width: 230,
        flexDirection: "row"
    },
    btncontainer: {
        backgroundColor: "#3386D6",

        borderRadius: 10,
        // mirginTop: 10,
        height: 35,
        marginLeft: 10,
        marginRight: 20,
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30
    },
    btnText: {
        marginLeft: 0,
        fontSize: 20,
        color: "#fff"
    },
    setStarTextSize: {
        fontSize: 18,
        fontWeight: '300',
        color: "red",
      },
});

