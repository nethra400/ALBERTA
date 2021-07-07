import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Loading from 'react-native-whc-loading';
import {ScrollView} from 'react-native-gesture-handler';
// import { NavigationEvents } from 'react-navigation'
import {ListItem} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';

export default class PrintLabel extends Component {
  constructor() {
    super();

    this.state = {isLoading: true, isFetching: false};
    // this.setState({dataSource: null, ipoid: '', isLoading: false});
  }

  onRefresh() {
    this.setState({isFetching: true}, function () {
      this.componentDidMount();
    });
  }

  LoginPress = () => {
    // alert("Under Development")
    this.props.navigation.navigate('AddPrintLabel');
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

  closeAllOpneStatus = () => {
    const self = this;

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          this.setState({
            isLoading: true,
          });

          fetch(
            API_BASE_URL +
              `admin/closestatus?token=${encodeURIComponent(data)}&sid=${SID}`,
            {
              method: 'POST',
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              //this.refs.loading.show(false);
              //console.log(responseJson)

              this.setState({
                isLoading: false,
              });

              if (responseJson.success) {
                Alert.alert('', responseJson.success, [
                  {
                    text: 'OK',
                    onPress: () => {
                      // let { dataSource } = self.state
                      // dataSource = dataSource.splice(1, index)
                      // this.setState({ dataSource })
                      this.updateData();
                    },
                  },
                ]);
                return;
              }

              if (responseJson.error) {
                //this.refs.loading.show(false);

                Alert.alert('', responseJson.error, [{text: 'OK'}]);
                return;
              } else if (responseJson.error == 'Token is Invalid') {
                //this.sessionButton()
              }
              Keyboard.dismiss();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });
  };

  saveDetails = (index, item) => {
    const self = this;

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          this.setState({
            isLoading: true,
          });

          fetch(
            API_BASE_URL +
              `admin/deletebarcode?barcode=${
                item.vbarcode
              }&token=${encodeURIComponent(data)}&sid=${SID}`,
            {
              method: 'POST',
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              //this.refs.loading.show(false);
              //console.log(responseJson)

              this.setState({
                isLoading: false,
              });

              if (responseJson.success) {
                Alert.alert('', responseJson.success, [
                  {
                    text: 'OK',
                    onPress: () => {
                      // let { dataSource } = self.state
                      // dataSource = dataSource.splice(1, index)
                      // this.setState({ dataSource })
                      this.updateData();
                    },
                  },
                ]);
                return;
              }

              if (responseJson.error) {
                //this.refs.loading.show(false);

                Alert.alert('', responseJson.error, [{text: 'OK'}]);
                return;
              } else if (responseJson.error == 'Token is Invalid') {
                //this.sessionButton()
              }
              Keyboard.dismiss();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });
  };

  // renderItem = ({ item, index }) => {

  //     var swipeoutBtns = [
  //         {
  //             text: 'Delect',
  //             fontWeight: 'bold',
  //             backgroundColor: "#3386D6",
  //             // borderRadius: 40,
  //             onPress: () => {

  //                 Alert.alert(
  //                     "",
  //                     "Do you want to delect the Item",
  //                     [
  //                         {
  //                             text: "Ok",
  //                             onPress: () => this.saveDetails(index, item),

  //                         },
  //                         {
  //                             text: "Canel",
  //                             onPress: () => { swipeoutBtns }
  //                         }
  //                     ],
  //                     {
  //                         cancelable: false
  //                     }
  //                 );
  //                 return true;

  //             }
  //         }
  //     ]

  //     console.log(item.estatus)
  //     return (
  //         <Swipeout right={swipeoutBtns} autoClose={true}

  //         >

  //             <View>

  //                 <ScrollView>
  //                     < View style={{
  //                         // marginTop: 5, borderRightWidth: 0,
  //                         // marginBottom: 2,
  //                         // borderBottomWidth: 1,
  //                         // borderBottomColor: '#3386D6'
  //                         marginTop: 3,
  //                         borderBottomWidth: 0.3,
  //                         borderBottomColor: "#3386D6",

  //                     }
  //                     }>

  //                         {/* <TouchableOpacity onPress={this.nextscreen()}> */}

  //                         <View style={{ flexDirection: 'row', marginLeft: '0%', marginBottom: '0%', marginRight: '2%', width: "100%" }}>

  //                             <Text style={{ marginLeft: '2%', marginRight: '5%', width: "70%" }}>
  //                                 <Text style={{ fontSize: 18, color: '#3386D6', marginRight: 10 }}>{item.vitemname + "  "}</Text>
  //                                 <Text style={{ fontSize: 14, color: '#3386D6', }}>

  //                                     ({item.vbarcode})</Text></Text>

  //                         </View>

  //                     </View >

  //                 </ScrollView>

  //             </View>
  //         </Swipeout>

  //     )

  // }

  updateData = () => {
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((datasid) => {
        if (data) {
          this.setState({
            isLoading: true,
          });
          const url = API_BASE_URL + 'admin/openstatus';
          fetch(url + '?token=' + data + '&sid=' + datasid)
            .then((response) => response.json())
            .then((responsejson) => {
              this.setState({
                isFetching: false,
                isLoading: false,
                dataSource: responsejson.table_data,
              });

              if (responsejson.status == 'success') {
                this.setState({
                  isFetching: false,
                  isLoading: false,
                  dataSource: responsejson.table_data,
                });
              }

              if (!this.alertPresent) {
                this.setState({
                  isFetching: false,
                  isLoading: false,
                });
                this.alertPresent = true;

                if (responsejson.status == 'error') {
                  alert(responsejson.error);
                  this.alertPresent = true;
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
  };

  componentDidMount() {
    this.updateData();
  }

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
      <View>
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
                paddingHorizontal: 20,
              }}>
              <Text
                style={{color: 'white'}}
                onPress={() => this.props.navigation.navigate('Dashboard')}>
                Print Label
              </Text>
            </View>
          </ImageBackground>
        </View>
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
            title="Add Items"
            onPress={() => this.LoginPress()}
          />
        </View>
        <ScrollView style={{height:550}}>
        {
              this.state.dataSource.map((val,idx)=>{
                  return(
                    <TouchableOpacity>
                    <ListItem
                    // key = {index}
                    keyExtractor={(item, index) => index.toString()}
                    
                      bottomDivider
                      containerStyle={{
                        borderRadius: 35,
                        marginHorizontal: 10,
                        marginVertical: 10,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                          <Text style={{width:325}}>{val.vitemname}</Text>
                        <FontAwesome style={{marginRight:0}} name="remove" color={'#3386D6'} size={16} onPress={()=>this.removeItem(val,idx)} />
                        
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                  )
              })
          }
        </ScrollView>

        {/* <View style={styles.container}>
          <View style={styles.btncontainerr}>
            <TouchableOpacity
              style={styles.btncontainer2}
              onPress={this.closeAllOpneStatus}>
              <Text style={styles.btntext}> Clear </Text>
            </TouchableOpacity>
          </View>
        </View> */}

<View style={{display: 'flex',alignItems:'center',marginTop:10}}>
              <Button
              style={{marginTop:10,}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  paddingVertical: 12,
                  paddingHorizontal:38,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                  // width:"50%"
                }}
                containerStyle={{margin: 20}}
                //type="outline"
                title="Clear"
                onPress={() => this.closeAllOpneStatus()
                  
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
    // paddingTop: 10,
    marginTop: 5,
    marginBottom: '10%',

    height: '80%',
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
    marginLeft: '2%',
    marginEnd: '2%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btncontainer1: {
    backgroundColor: '#3386D6',

    // marginTop: 10,

    borderRadius: 40,
    height: 40,
    marginLeft: '65%',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btncontainer2: {
    backgroundColor: '#3386D6',
    marginStart: '28%',
    // marginBottom: '20%',

    // marginTop: 10,

    borderRadius: 40,
    height: 50,
    // marginLeft: "65%",
    top: 30,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btntext: {
    //textAlign : 'center',
    fontSize: 20,
    fontWeight: 'bold',

    color: '#fff',
  },
  btncontainerr: {
    flexDirection: 'row',
    // marginBottom: '10%',
    // marginBottom: '5%',
    marginTop: '0%',
    height: '0%',
    bottom: '0%',
    backgroundColor: 'red',
  },
  btntext1: {
    //textAlign : 'center',
    fontSize: 18,
    // fontWeight: "bold",
    color: 'white',
  },
});
