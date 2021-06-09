import React, { Component } from 'react';
import {
  StyleSheet, TextInput, Text,
  KeyboardAvoidingView, View, Image, TouchableOpacity, ScrollView, value, Alert, Keyboard,ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import Loading from 'react-native-whc-loading'
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
export default class ChangePrice extends React.Component {


  constructor() {
    super();
    this.state = {
      check: true,
      item: "",
      cost: "",
      qoh: "",
      salesPrice: "",
      barCodeNumber: "",
      grossvalue: ""
    }
  }







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
  //     <MaterialIcons name="save" size={35} color="#f15a2c" />  
  //     </TouchableOpacity>
       
  //      </View>)
  //   };  
  // }



  componentDidMount() {

    this.props.navigation.setParams({onPressMethod: this.saveNPLItemDetails });
    const item = this.props.route.params.item;
    this.setState({ item: item })
    const cost = this.props.route.params.cost;
    this.setState({ cost: cost })
    const qoh = this.props.route.params.qoh;
    this.setState({ qoh: qoh })
    const salesPrice = this.props.route.params.sale;
    this.setState({ salesPrice: salesPrice })




    if (salesPrice == "0.00") {
      this.setState({ grossvalue: "0.00" })
    }
    else {
      const grossvalue = (((parseInt(salesPrice)) - (parseInt(cost))) * (100) / (parseInt(salesPrice)))

      this.setState({ grossvalue: JSON.stringify(grossvalue) })

    }

    // const grossvalue = (((parseInt(salesPrice)) - (parseInt(cost))) * (100) / (parseInt(salesPrice)))
    // this.setState({ grossvalue: JSON.stringify(grossvalue) })
  }


  grossprofit = () => {
    this.setState({ grossvalue: JSON.stringify(((parseInt(this.state.salesPrice)) - (parseInt(this.state.cost))) * (100) / (parseInt(this.state.salesPrice))) })
  }

  saveNPLItemDetails = () => {
   
    const barCodeNumber = this.props.route.params.barcodePassValue;
    this.setState({ barCodeNumber: barCodeNumber })
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          // this.refs.loading.show();
          fetch(API_BASE_URL + `admin/updatePriceBySKU_new?token=${encodeURIComponent(data)}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sku: this.state.barCodeNumber,
              "sid": SID,
              "price": this.state.salesPrice,
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
  }

  ConTwoDecDigit=(digit)=>{
    return digit.indexOf(".")>0?
            digit.split(".").length>=2?
             digit.split(".")[0]+"."+digit.split(".")[1].substring(-1,2)
            : digit
           : digit
  }
  cancelBtnPress = () => {
    this.refs.loading.show(false);
    this.props.navigation.navigate('Items');
  }
  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.MainContainer}>
          {/* <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Change Price</Text>
          </View> */}
           <View style={{width: '100%',marginBottom:10}}>
            <ImageBackground
              source={require('../assets/images/header.jpeg')}
              style={{position: 'relative', height: 100, paddingTop: 20}}>
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
                 Change Price
                </Text>
              </View>
            </ImageBackground>
          </View>
          
          <View style={styles.logocontainer}>
          <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.setTextSize}>Name</Text>
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <TextInput
                style={{color:'white'}}
                //  value={this.saveNPLItemDetails}
                editable={false}
                // style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.item}
              >
              </TextInput>
            </View>
          </View>
          <View style={styles.logocontainer}>
            <View style={{
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
              style={{color:'white'}}
                editable={false}
                // style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.cost}
              >
              </TextInput>
            </View>
          </View>
          <View style={styles.logocontainer}>
            <View style={{
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
              style={{color:'white'}}
                editable={false}
                // style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.qoh}
              >
              </TextInput>
            </View>
          </View>
          <View style={styles.logocontainer}>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.setTextSize}> Price</Text>
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <TextInput
              style={{color:'white'}}
                // style={styles.input1}
                value={this.state.salesPrice}
                // underlineColorAndroid="transparent"
                returnKeyType="next"
                keyboardType="numeric"
                autoCapitalize="none"
                onEndEditing={
                  text => {
               
                     this.setState({
                      salesPrice: (parseFloat(this.state.salesPrice)).toFixed(2)
                       })                                               
              
          }
      }
                onChangeText={salesPrice => this.setState({ salesPrice :this.ConTwoDecDigit(salesPrice) }, this.grossprofit)}
                autoCorrect={false}
              >
              </TextInput>
            </View>
          </View>

          <View style={styles.logocontainer}>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.setTextSize}>Gross profit</Text>
            </View>
            <View style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <TextInput
              style={{color:'white'}}
                // style={styles.input1}
                value={this.state.grossvalue}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                keyboardType="numeric"
                autoCapitalize="none"
                //onChangeText={salesPrice => this.setState({ salesPrice })}
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
          <Loading ref="loading" />
        </View>
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
    backgroundColor: '#fff',
  },
  setTextSize: {
    fontSize: 18,
    fontWeight: '300',
    color: "#fff",
  },
  setStarTextSize: {
    fontSize: 18,
    fontWeight: '300',
    color: "red",
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
