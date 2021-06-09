import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, KeyboardAvoidingView, View, Image, SafeAreaView,TouchableOpacity, ImageBackground,ScrollView, value, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import Loading from 'react-native-whc-loading'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default class UpdateQuantity extends React.Component {

  // static navigationOptions = ({ navigation }) => {
  //   const { params } = navigation.state;
  //      return {
  //       headerTitle: (
  //         <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
  //           <Image source={require('../images/poslogo.jpg')}
  //             style={{ height: 100, width: 100, marginRight: 20, resizeMode: 'contain' }} />
  //         </View>
  //       ),
       
  //          headerRight: (<View  style={{ marginRight: 0 }}>
  //     <TouchableOpacity onPress={()=>params.onPressMethod()}>
  //     <MaterialIcons name="save" size={40} color="#f15a2c" />  
  //     </TouchableOpacity>
       
  //      </View>)
  //   };  
  // }



  constructor() {
    super();
    this.state = {

      check: true,
      item: "",
      cost: "",
      qoh: "",
      salesPrice: "",
      barCodeNumber: "",
      bar: ""

    }

  }




  componentDidMount() {


    this.props.navigation.setParams({onPressMethod: this.saveNPLItemDetails });
    AsyncStorage.getItem('vitemname').then((vitemname) => {
      if (vitemname) {
        //alert(datastore)
        this.setState({ item: vitemname })

      }

    })

    AsyncStorage.getItem('costPrice').then((costPrice) => {
      if (costPrice) {
        this.setState({ cost: costPrice })
      }

    })

    AsyncStorage.getItem('QOHData').then((QOHData) => {
      if (QOHData) {
        this.setState({ qoh: QOHData })
        //alert(datatax)
      }

    })

    AsyncStorage.getItem('SalesPriceData').then((SalesPriceData) => {
      if (SalesPriceData) {
        this.setState({ salesPrice: SalesPriceData })
        //alert(datatax)
      }

    })
    AsyncStorage.getItem('barcodeData').then((barcodeData) => {
      if (barcodeData) {
        this.setState({ barCodeNumber: barcodeData })
        //alert(datatax)
      }
    })





  }

  saveNPLItemDetails = () => {


    // if(this.state.qoh == 0){

    //   Alert.alert("qty should be more then 0")
    //   return
    // }

    AsyncStorage.getItem('token').then((data) => {

      AsyncStorage.getItem('Sid').then((SID) => {





        if (data) {
          console.log(data)

          //   alert(data)
          // this.refs.loading.show();
          fetch(API_BASE_URL + `admin/updateQuantityBySKU?token=${encodeURIComponent(data)}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sku: this.state.barCodeNumber,
              sid: SID,
              qty: this.state.qoh,

            }),
          }).then((response) => response.json())
            .then((responseJson) => {
              // this.refs.loading.show(false);



              if (responseJson.error) {
                Alert.alert(

                  '',
                  responseJson.error,
                  [
                    { text: 'OK', onPress: () => this.cancelBtnPress() },
                  ]
                )
                return;
              }
              if (responseJson.message) {

                Alert.alert(

                  '',
                  responseJson.message,
                  [
                    { text: 'OK', onPress: () => this.cancelBtnPress() },
                  ]
                )





              }
            })
            .catch((error) => {
              console.error(error);
            });



        }
      })

    });



    // alert('Under development')

  }
  cancelBtnPress = () => {
    // var bar = this.state.barCodeNumber
    AsyncStorage.removeItem('barcodeData')
    //alert(this.state.barCodeNumber)
    this.props.navigation.navigate('Items')
    // {
    //   barcodePassValue: bar

    // })
    // alert(bar)



  }


  render() {


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>



        <View style={styles.MainContainer}>

          {/* <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Update Quantity</Text>
          </View> */}
          <View style={{width: '100%'}}>
            <ImageBackground
              source={require('../assets/images/header.jpeg')}
              style={{position: 'relative', height: 100, paddingTop: 20,marginBottom:10}}>
              <View
                style={{
                  // display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // paddingVertical: 10,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{color: 'white', marginTop: 10}}
                  onPress={() =>
                    this.props.navigation.navigate('Items')
                  }>
                  Update Quantity
                </Text>
              </View>
            </ImageBackground>
          </View>


          <View style={styles.logocontainer}>


            <View  style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>

              <Text style={styles.setTextSize}>Item Name</Text>
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>

              <TextInput
              style={{color:"white"}}
                value={this.state.item}
                editable={false}
                // style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}

              >

              </TextInput>
            </View>

          </View>


          <View style={styles.logocontainer}>
            <View  style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>

              <Text style={styles.setTextSize}>Cost</Text>
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>

              <TextInput
              style={{color:"white"}}
                // style={styles.input}
                value={this.state.cost}
                editable={false}

                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              >


              </TextInput>
            </View>

          </View>

          <View style={styles.logocontainer}>
            <View  style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>

              <Text style={styles.setTextSize}>Price</Text>
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>

              <TextInput
              style={{color:"white"}}
                // style={styles.input}


                value={this.state.salesPrice}
                editable={false}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              >
              </TextInput>
            </View>

          </View>

          <View style={styles.logocontainer}>
            <View  style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>

              <Text style={styles.setTextSize}>QOH</Text>
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>

              <TextInput
              style={{color:"white"}}

                // style={styles.input1}
                value={this.state.qoh}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={qoh => this.setState({ qoh })}
                autoCorrect={false}
              >

              </TextInput>
            </View>

          </View>


          {/* <View style={styles.btncontainerr}>



            <TouchableOpacity style={styles.btncontainer} onPress={this.saveNPLItemDetails}>
              <Text style={styles.btnText}>Save</Text>

            </TouchableOpacity>


            <TouchableOpacity style={styles.btncontainer} onPress={this.cancelBtnPress}>
              <Text style={styles.btnText}>Cancel</Text>

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
            onPress={() => this.saveNPLItemDetails()}
          />
        </View>

        </View>
        <Loading ref="loading" />
      </SafeAreaView>





    );
  }
}


const styles = StyleSheet.create({


  logocontainer: {
    width: '95%',
    backgroundColor: 'grey',
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

    marginLeft: 50,
    flexDirection: 'row',
  },
  MainContainer:
  {

    flex: 1,

    // Set content's vertical alignment.
    // justifyContent: 'center',

    // // Set content's horizontal alignment.
    // alignItems: 'center',

    // Set hex color code here.
    backgroundColor: '#fff',

  },
  taxContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    flexDirection: 'row',
  },
  foodContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 0,
    flexDirection: 'row',
  },



  setTextSize: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',



  },
  setCheckMark: {

    width: 50,
    height: 50,
    marginLeft: 70
    //  color: 'white'

  },


  input: {
    //width: 250,
    alignSelf: "stretch",
    height: 40,
    backgroundColor: '#ccc',

    marginEnd: 10,
    borderRadius: 3,
    borderRightWidth: 1,
    borderRightColor: '#636466',
    borderLeftWidth: 1,
    borderLeftColor: '#636466',
    borderTopWidth: 1,
    borderTopColor: '#636466',
    borderBottomWidth: 1,
    borderBottomColor: '#636466',

    marginBottom: 10,
    color: '#000',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  input1: {
    alignSelf: "stretch",
    height: 40,


    marginEnd: 10,
    borderRadius: 3,
    borderRightWidth: 1,
    borderRightColor: '#636466',
    borderLeftWidth: 1,
    borderLeftColor: '#636466',
    borderTopWidth: 1,
    borderTopColor: '#636466',
    borderBottomWidth: 1,
    borderBottomColor: '#636466',

    marginBottom: 10,
    color: '#000',
    fontSize: 15,
    paddingHorizontal: 20,

  },
  btncontainer: {
    flex: 1,
    backgroundColor: '#f15a2c',
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 40,
    width: "45%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    alignItems: 'center'
  },
});

