import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  AsyncStorage,
  TextInput,
  Index,
  Alert,
  ImageBackground
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Loading from 'react-native-whc-loading';
import {arrayExpression} from '@babel/types';
import {ScrollView} from 'react-native-gesture-handler';
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { NavigationEvents } from 'react-navigation'
import {Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class OrderInformation extends Component {
  constructor() {
    super();

    this.state = {isLoading: true, isFetching: true};
    this.setState({
      dataSource: null,
      check: [],
      qty: '',
      ipoid: '',
      textInputs: [],
      qtyCheck: true,
      vendorName: '',
      vinvoiceno: '',
      nnettotal: '',
      isLoading: false,
    });
  }

  nextscreen = () => {
    // alert("Sdsdsdsd")
    // alert([index])
    // if ([index] == "0") {
    //     alert("sdhdshdshdshdshs")
    // }
    // alert("Next Screen")
    // this.props.navigation.navigate('AddNewReceivingOrder')
  };

  updateCost = (e, index) => {
    // // const { value } = e.target
    // alert(e)
    // // alert(e.target.value)
    // // alert(index)
    // const { dataSource } = this.state
    // // dataSource[index].amount = parseInt(e) * parseInt(dataSource[index].qty)
    // dataSource[index].amount = 10
    // this.setState({
    //     dataSource
    //     //check: e
    // })
  };

  onRefresh() {
    this.setState({isFetching: true}, function () {
      this.componentDidMount();
    });
  }

  LoginPress = () => {
    // alert("Under Development")
    this.props.navigation.navigate('SelectItem');
  };
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

  endEditing(index) {
    // let { dataSource, textInputs } = this.state;
    // // dataSource[index] = dataSource[index]['qty']
    // dataSource[index].qty = text

    let {dataSource, qtyCheck} = this.state;
    let recQty = dataSource[index]['qty_received'];

    let npack = dataSource[index]['npack'];

    if (recQty == 0 || recQty == '') {
      alert('qty received can not be empty or 0');

      qtyCheck = false;
    } else if (recQty % npack == 0) {
      // qty = recQty / npack

      dataSource[index]['qty_received'] = recQty;

      qtyCheck = true;

      // this.state.qtyCheck = true

      // this.setState({
      //     qtyCheck: true
      // });

      // this.totalAmountFunc(index)
    } else {
      qtyCheck = false;
      // this.setState({
      //     qtyCheck: false,

      // });

      alert('Please Enter Correct qty which fits in cases' + '(' + npack + ')');
      //  alert(npack)
    }

    this.setState({
      qtyCheck,
      dataSource,
    });
  }

  keyboardHidefunction = () => {
    Keyboard.dismiss();
  };

  totalAmountFunc = (index, item) => {
    let {dataSource} = this.state;
    // dataSource[index] = dataSource[index]['qty']
    // dataSource[index].qty = text

    // dataSource[index].suggested_cost = text.trim() ? parseFloat(text) * dataSource[index]["cost_price"] : 0
    dataSource[index].total_amount = 100;
  };

  renderItem = ({item, index}) => {
    this.state.check = item.qty;

    let {dataSource, qtyCheck} = this.state;

    let npack = dataSource[index]['npack'];

    return (
      <View
        style={{
          marginTop: 5,
          borderRightWidth: 1,
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity onPress={this.nextscreen()}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '2%',
              marginBottom: '2%',
              marginRight: '5%',
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 18,
                marginRight: '2%',
                color:
                  this.state.estatus && this.state.estatus == 'Open'
                    ? '#3386D6'
                    : '#3386D6',
                width: '40%',
                backgroundColor:
                  this.state.estatus && this.state.estatus == 'Open'
                    ? '#fff'
                    : '#D3D3D3',
              }}>
              {item.item_name}(@{item.npack})
            </Text>
            <TextInput
              style={{
                fontSize: 18,
                marginRight: '2%',
                color: '#3386D6',
                width: '20%',
                borderRadius: 3,
                borderRightWidth: 1,
                borderRightColor: '#3386D6',
                borderLeftWidth: 1,
                borderLeftColor: '#3386D6',
                borderTopWidth: 1,
                borderTopColor: '#3386D6',
                borderBottomWidth: 1,
                borderBottomColor: '#3386D6',
                backgroundColor:
                  this.state.estatus && this.state.estatus == 'Open'
                    ? 'white'
                    : '#D3D3D3',
              }}
              underlineColorAndroid="transparent"
              returnKeyType="done"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={5}
              multiline={true}
              editable={true}
              onSubmitEditing={() => this.keyboardHidefunction()}
              onEndEditing={() => this.endEditing(index)}
              onChangeText={
                this.state.estatus && this.state.estatus == 'Open'
                  ? (text) => {
                      if (text.length == 1 && text == 0) {
                        alert('qty can not start from 0');

                        return;
                      }

                      if (text) {
                        let idx = text.indexOf('.');
                      }

                      if (/^\d*[.]?\d*$/.test(text)) {
                        let {dataSource, textInputs} = this.state;

                        dataSource[index].qty_received = text;

                        let total_amount = text.trim()
                          ? parseFloat(text) *
                            dataSource[index]['new_costprice']
                          : 0;

                        total_amount.toFixed(2);

                        textInputs[index] = total_amount.toString();
                        textInputs[index] = total_amount.toFixed(2);

                        let rowData = {...dataSource[index]};

                        // rowData[index]['suggessted_cost'] = text.trim() ? parseFloat(text) * dataSource[index]["new_costprice"] : 0,
                        rowData = {
                          ...rowData,
                          suggested_cost: text.trim()
                            ? (
                                parseFloat(text) *
                                dataSource[index]['new_costprice']
                              ).toFixed(2)
                            : 0,
                          total_amount: text.trim()
                            ? parseFloat(text) *
                              dataSource[index]['new_costprice']
                            : 0,
                        };

                        dataSource[index] = {
                          ...rowData,
                        };

                        this.setState(
                          {
                            dataSource,
                            textInputs,
                          },

                          // this.totalAmountFunc(index)
                        );

                        //    this.state.nnettotal = 0.00;

                        let sum = 0.0;

                        this.state.textInputs.map((userData) => {
                          sum += parseFloat(userData);
                        });
                        // this.setState({
                        //     nnettotal = sum
                        // },
                        // )

                        sum.toFixed(2);

                        this.state.nnettotal = sum.toString();

                        this.state.nnettotal = sum.toFixed(2);
                      } else {
                        return;
                      }
                    }
                  : null
              }
              value={this.state.dataSource[index].qty_received}
            />

            <TextInput
              style={{
                fontSize: 18,
                marginRight: '2%',
                color: '#3386D6',
                width: '35%',
                borderRadius: 3,
                borderRightWidth: 1,
                borderRightColor: '#3386D6',
                borderLeftWidth: 1,
                borderLeftColor: '#3386D6',
                borderTopWidth: 1,
                borderTopColor: '#3386D6',
                borderBottomWidth: 1,
                borderBottomColor: '#3386D6',
                backgroundColor: 'white',
                backgroundColor:
                  this.state.estatus && this.state.estatus == 'Open'
                    ? 'white'
                    : '#D3D3D3',
              }}
              underlineColorAndroid="transparent"
              returnKeyType="done"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => this.keyboardHidefunction()}
              multiline={true}
              maxLength={9}
              // defaultValue={this.state.textInputs[index]}
              onFocus={
                this.state.estatus && this.state.estatus == 'Open'
                  ? (text) => {
                      const {textInputs, dataSource} = this.state;

                      textInputs[index] = '';
                      // dataSource[index].totalAmount = ''
                      this.setState({
                        textInputs,
                      });
                    }
                  : null
              }
              onChangeText={
                this.state.estatus && this.state.estatus == 'Open'
                  ? (text) => {
                      if (this.state.dataSource[index].qty_received == '') {
                        alert('qty cannot be empty');

                        return;
                      }

                      if (text) {
                        let idx = text.indexOf('.');
                        if (idx >= 0) {
                          text = text.slice(0, idx + 3);
                        }
                      }

                      if (/^\d*[.]?\d*$/.test(text)) {
                        let {dataSource, textInputs} = this.state;

                        text = text == '' || text == undefined ? 0.0 : text;

                        textInputs[index] = text;
                        this.setState({
                          textInputs,
                          dataSource,
                        });
                        let sum = 0.0;

                        this.state.textInputs.map((userData) => {
                          sum += parseFloat(userData);
                          sum.toFixed(2);
                        });

                        this.state.nnettotal = sum.toString();
                        this.state.nnettotal = sum.toFixed(2);
                        sum.toFixed(2);
                      } else {
                        return;
                      }
                    }
                  : null
              }
              value={this.state.textInputs[index]}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  

  componentDidMount() {
    
    AsyncStorage.getItem('ipoid').then((ipoid) => {
      if (ipoid) {
        //alert(datastore)
        this.setState({ipoid: ipoid});
      }
    });
    this.setState({
      refresh: !this.state.refresh,
    });

    this.state.qtyCheck = true;

    this.setState({
      isLoading: false,
    });

    AsyncStorage.getItem('ipoid').then((ipoid) => {
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem('Sid').then((datasid) => {
          if (data) {
            const url = API_BASE_URL + 'admin/' + 'get_order_items?';

            fetch(url + 'iroid=' + ipoid + '&sid=' + datasid + '&token=' + data)
              .then((response) => response.json())
              .then((responsejson) => {
                this.setState({
                  estatus: responsejson.estatus,
                });

                if (responsejson.status == 'success') {
                  this.state.vendorName = responsejson.vvendorname;
                  this.state.vinvoiceno = responsejson.vinvoiceno;
                  this.state.nnettotal = responsejson.nnettotal;
                  let dataSource = responsejson.table_data;
                  textInputs = dataSource.map((item) => {
                    return item['total_amount'];
                  });

                  dataSource = dataSource.map((item) => {
                    item['qty_received'] = item.qty_received.toString();
                    return item;
                  });
                  this.setState({dataSource, textInputs, isFetching: false});
                }
                if (!this.alertPresent) {
                  this.alertPresent = true;
                  if (responsejson.status == 'error') {
                    alert(responsejson.error);
                  } else {
                    this.alertPresent = false;
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      });
    });
  }

  cancelBtnPress = () => {
    this.props.navigation.navigate('ReceivingOrder');
  };

  nexttoRecOrderScreen = () => {
    this.props.navigation.navigate('ReceivingOrder');
  };

  saveDetails = () => {
    if (!this.state.qtyCheck) {
      //  alert(JSON.stringify(this.state.qty))
      alert('Please Enter  qty ');
      return;
    }

    let {dataSource: itemdata, textInputs} = this.state;

    itemdata = itemdata.map((item, key) => {
      return {
        irodetid: item.irodetid,
        vitemname: item.item_name,
        // nordqty: item.qty_received,
        npack: item['npack'],
        receiving_qty: item.qty_received,
        suggested_cost: item['suggested_cost'],
        total_amount: textInputs[key],
      };
    });

    let res = {
      itemdata: itemdata,
    };

    AsyncStorage.getItem('ipoid').then((ipoid) => {
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem('Sid').then((datasid) => {
          this.setState({
            isLoading: true,
          });

          fetch(
            API_BASE_URL +
              `admin/edit_multiple_ro_items_save?sid=${datasid}&iroid=${ipoid}&token=${data}`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              // body: JSON.stringify(updatedData)

              body: JSON.stringify(res),
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
              });

              //  alert(responseJson.error)
              // this.refs.loading.show(false);

              if (responseJson.status == 'error') {
                alert(responseJson.error);
              }

              if (responseJson.status == 'success') {
                Alert.alert('', responseJson.success, [
                  {text: 'OK', onPress: () => this.nexttoRecOrderScreen()},
                ]);
              }
            })
            .catch((error) => {
              console.error(error);
              alert(error);
            });
        });
      });
    });
  };

  finalizedDetails = () => {
    if (!this.state.qtyCheck) {
      //  alert(JSON.stringify(this.state.qty))
      alert('Please Enter  qty ');
      return;
    }

    let {dataSource: itemdata, textInputs} = this.state;

    itemdata = itemdata.map((item, key) => {
      return {
        irodetid: item.irodetid,
        vitemname: item.item_name,
        // nordqty: item.qty_received,
        npack: item['npack'],
        receiving_qty: item.qty_received,
        suggested_cost: item['suggested_cost'],
        total_amount: textInputs[key],
      };
    });

    let res = {
      itemdata: itemdata,
    };

    AsyncStorage.getItem('ipoid').then((ipoid) => {
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem('Sid').then((datasid) => {
          this.setState({
            isLoading: true,
          });

          fetch(
            API_BASE_URL +
              `admin/edit_multiple_ro_items_finalize?sid=${datasid}&iroid=${ipoid}&token=${data}`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              // body: JSON.stringify(updatedData)

              body: JSON.stringify(res),
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
              });

              //  alert(responseJson.error)
              // this.refs.loading.show(false);

              if (responseJson.status == 'error') {
                alert(responseJson.error);
              }

              if (responseJson.status == 'success') {
                Alert.alert('', responseJson.success, [
                  {text: 'OK', onPress: () => this.nexttoRecOrderScreen()},
                ]);
              }
            })
            .catch((error) => {
              console.error(error);
              alert(error);
            });
        });
      });
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }

    return (
        <SafeAreaView>
      <View style={{flexDirection: 'column', height: '100%'}}>
        
        <View style={{width: '100%'}}>
        <ImageBackground
                source={require('../../assets/images/header.jpeg')}
                style={{position: 'relative', height: 80, paddingTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal:20
                  }}>
                  <Text style={{color: 'white'}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Receiving Order</Text>
                  
                </View>
              </ImageBackground>
            </View>
        <ScrollView>
          <View>
            

            <View style={styles.container}>
              <View style={{flexDirection:'row',backgroundColor:'grey'}}>
                <View
                  style={{
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 60,
                  }}>
                  <Text
                    style={{
                    //   fontWeight: '300',
                      fontSize: 14,
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    Item Name
                  </Text>
                  <Text
                    style={{
                    //   fontWeight: '300',
                      fontSize: 12,
                      color: '#fff',
                      fontWeight: 'bold',
                    }}>
                    (@unit/case)
                  </Text>
                </View>

               

                <View
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 60,
                  }}>
                  <Text
                    style={{
                    //   fontWeight: '300',
                      fontSize: 14,
                      color: '#fff',
                      flexDirection: 'row',
                      fontWeight: 'bold',
                    }}>
                    Unit Recd
                  </Text>
                </View>
               
                <View
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 60,
                  }}>
                  <Text
                    style={{
                      fontWeight: '300',
                      fontSize: 14,
                      color: '#fff',
                      flexDirection: 'row',
                      fontWeight: 'bold',
                    }}>
                    New Cost
                  </Text>
                </View>
              </View>

              <FlatList
                data={this.state.dataSource}
                extraData={[
                  this.state.dataSource,
                  this.state.textInputs,
                  this.state.refresh,
                ]}
                renderItem={(item) => this.renderItem(item)}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}

              />
            </View>
          </View>
        </ScrollView>

        {/* </KeyboardAwareScrollView> */}

        <View style={styles.btncontainerr}>
        <Button
            //   style={{marginTop:10,}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  paddingVertical: 12,
                  paddingHorizontal:68,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                  // width:"50%"
                }}
                containerStyle={{margin: 20}}
                //type="outline"
                title="Save"
                onPress={()=>this.saveDetails()}
              />
               <Button
            //   style={{marginTop:10,}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  paddingVertical: 12,
                  paddingHorizontal:58,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                  // width:"50%"
                }}
                containerStyle={{margin: 20}}
                //type="outline"
                title="Cancel"
                onPress={()=>this.cancelBtnPress()}
              />
            
    
        </View>
        <View >
              <Button
              style={{marginTop:10}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  padding: 12,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                }}
                containerStyle={{}}
                //type="outline"
                title="Finalize"
                onPress={() => 
                    this.finalizedDetails()
                }
              />
            </View>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    marginTop: 0,
    backgroundColor:'grey'
  },
  vender_Details: {
    marginLeft: 0,
    fontSize: 20,
    color: 'blue',
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 70,
  },
  btncontainer: {
    backgroundColor: '#f15a2c',

    borderRadius: 10,
    // mirginTop: 10,
    height: 35,
    // marginLeft: '70%',
    // marginRight: 20,
    //    width: "40%",
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 30
  },
  btncontainer1: {
    backgroundColor: '#f15a2c',

    borderRadius: 10,
    // mirginTop: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 20,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  btncontainer2: {
    backgroundColor: '#f15a2c',

    borderRadius: 10,
    // mirginTop: 10,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  btntext: {
    //textAlign : 'center',
    fontSize: 20,
    fontWeight: 'bold',

    //  marginLeft: 25,

    color: '#fff',
  },
  btncontainerr: {
    flexDirection: 'row',
    // marginBottom: '0%'
    // marginTop: '10%',
    height: '20%',
  },

  btncontainerr1: {
    flexDirection: 'row',
    // marginBottom: '0%'
  },
  btnText: {
    marginLeft: 0,
    fontSize: 20,
    color: '#fff',
  },
  input: {
    flexDirection: 'row',
    //width: 250,
    // alignSelf: "stretch",
    height: 40,
    // backgroundColor: '#ccc',

    // marginEnd: 10,
    borderRadius: 3,
    borderRightWidth: 1,
    borderRightColor: '#636466',
    borderLeftWidth: 1,
    borderLeftColor: '#636466',
    borderTopWidth: 1,
    borderTopColor: '#636466',
    borderBottomWidth: 1,
    borderBottomColor: '#636466',

    // marginBottom: 10,
    color: '#3386D6',
    fontSize: 15,
    // paddingHorizontal: 20,
  },
});
