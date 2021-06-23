import React from 'react';
import {
  StyleSheet, TextInput, Text,
  View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert} from 'react-native';
  import AsyncStorage from "@react-native-community/async-storage";
import Loading from 'react-native-whc-loading'

export default class PhyItemInformation extends React.Component {
  // static navigationOptions = {
  //   headerStyle: {
  //     backgroundColor: '#fff'
  //   },
  //   headerTitle: (

  //     <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
  //       <Image source={require('../images/poslogo.jpg')}
  //         style={{ height: 100, width: 100, marginRight: 0, resizeMode: 'contain' }} />
  //     </View>
  //   ),
  //   // headerRight: (<View style={{ marginRight: 20 }}>
  //   //   <FontAwesome name="bell" size={25} color="#16a0db" /></View>)
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
      grossvalue: "",
      barcode : "",
      physicalqty : "",
      updateqty : "",
      ipiid: "",
      ipiidValue : "",
      isLoading: false


    }
  }




  componentDidMount() {
    const item = this.props.navigation.getParam('item');
    this.setState({ item: item })
    const cost = this.props.navigation.getParam('cost')
    this.setState({ cost: cost })
    const qty_on_hand = this.props.navigation.getParam('qty_on_hand')
    this.setState({ qty_on_hand: qty_on_hand.toString() })

    
    const salesPrice = this.props.navigation.getParam('sale')
    this.setState({ salesPrice: salesPrice })

    const barcode = this.props.navigation.getParam('barcode')
    this.setState({ barcode: barcode })

    

    const physicalqty = this.props.navigation.getParam('physicalqty')
    this.setState({ physicalqty: physicalqty })

    // this.state.physicalqty = parseInt(physicalqty)

    //this.state.ipiidValue = AsyncStorage.getItem("ipiid")

    AsyncStorage.getItem("ipiid").then(ipiid => {
      if (ipiid) {
        //alert(datastore)
        this.setState({ ipiidValue: ipiid });
      }
    });

    // this.state.physicalqty = (physicalqty).toString

    const updateqty = this.props.navigation.getParam('updateqty')
    this.setState({ updateqty: updateqty })



    // const grossvalue = (((parseInt(salesPrice)) - (parseInt(cost))) * (100) / (parseInt(salesPrice)))
    // this.setState({ grossvalue: JSON.stringify(grossvalue) })
  }

  nextBtnClicked = () => {
    const barcode = this.props.navigation.getParam('barcode')
    this.setState({ barcode: barcode })
    AsyncStorage.getItem("ipiid").then(ipiid => {
    AsyncStorage.getItem('token').then((data) => {
    AsyncStorage.getItem('user_id').then((user_id) => {
      AsyncStorage.getItem('Sid').then((SID) => {

        if (data) {
           this.refs.loading.show();
          this.refs.loading.show(true);
          fetch(API_BASE_URL+ `admin/insert_sku_next?token=${encodeURIComponent(data)}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sku: this.state.barcode,
              "sid": SID,
              "item_name": this.state.item,
              "qoh": this.state.qty_on_hand,
              "updateqty": this.state.updateqty,
              "ipiid":ipiid,
              "user_id": user_id,
            }),
          }).then((response) => response.json())
            .then((responseJson) => {

              
              // this.refs.loading.show(false);

              if (responseJson.error) {
                Alert.alert(

                  '',
                  responseJson.error,
                  [
                    { text: 'OK', onPress: () => this.navigateTochooseItem() },
                  ]
                )
                return;
              }

              if (responseJson.success) {
                Alert.alert(

                  '',
                  responseJson.success,
                  [
                    { text: 'OK', onPress: () => this.navigateTochooseItem() },
                  ]
                )
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
    })
    });

  })
  // this.props.navigation.navigate('PhysChooseItem');
  }


navigateTochooseItem = () => {

  this.refs.loading.show(false);
  this.props.navigation.navigate('PhysChooseItem')

}

navigateToHomeScreen = () =>{

  this.props.navigation.navigate('BottomTabComplete') 
}

  finisedBtmClicked = () => {


    const barcode = this.props.navigation.getParam('barcode')
    this.setState({ barcode: barcode })
    AsyncStorage.getItem("ipiid").then(ipiid => {
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('user_id').then((user_id) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          //  this.refs.loading.show();
               this.setState(
                            {
                                isLoading: true,
                            },

                        );
          fetch(API_BASE_URL + `admin/sku_finish?token=${encodeURIComponent(data)}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sku: this.state.barcode,
              "sid": SID,
              "item_name": this.state.item,
              "qoh": this.state.qty_on_hand,
              "updateqty": this.state.updateqty,
              "ipiid":ipiid,
              "user_id": user_id,
              
            }),
          }).then((response) => response.json())
            .then((responseJson) => {

              this.setState(
                {
                    isLoading: false,
                },

            );

              //  this.refs.loading.show(false);

              if (responseJson.error) {
                Alert.alert(

                  '',
                  responseJson.error,
                  [
                    { text: 'OK', onPress: () => this.navigateToItemList() },
                  ]
                )
                return;
              }


              if (responseJson.message) {
                Alert.alert(

                  '',
                  responseJson.message,
                  [
                    { text: 'OK', onPress: () => this.navigateToHomeScreen() },
                  ]
                )
                return;
              }

              if (responseJson.success) {
                Alert.alert(

                  '',
                  responseJson.success,
                  [
                    { text: 'OK', onPress: () => this.navigateToItemList() },
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
  })
  })


    
  }

  navigateToItemList = () => {

    this.refs.loading.show(false);
    this.props.navigation.navigate('PhysItemList')
  
  }


  render() {

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

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.MainContainer}>
          
          <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Item Information</Text>
            <Text style={styles.ipiidText}>Inventory-ID: <Text style={styles.ipiidText }>{this.state.ipiidValue} </Text></Text>
          </View>
          <View style={styles.logocontainer}>
            <View style={{ width: '40%' }}>
              <Text style={styles.setTextSize}>Item Name</Text>    
            </View>
            <View style={{ width: '60%' }}>
              <TextInput
                //  value={this.saveNPLItemDetails}
                editable={false}
                style={styles.input}
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
            <View style={{ width: '40%' }}>
              <Text style={styles.setTextSize}>SKU</Text>
            </View>
            <View style={{ width: '60%' }}>
              <TextInput
                editable={false}
                style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.barcode}
              >
              </TextInput>
            </View>
          </View>
          <View style={styles.logocontainer}>
            <View style={{ width: '40%' }}>
              <Text style={styles.setTextSize}>QOH</Text>
            </View>
            <View style={{ width: '60%' }}>
              <TextInput
                editable={false}
                style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.qty_on_hand}
              >
              </TextInput>
            </View>
          </View>
          <View style={styles.logocontainer}>
            <View style={{ width: '40%' }}>
              <Text style={styles.setTextSize}>Physical Qty</Text>
            </View>
            <View style={{ width: '60%' }}>
              <TextInput
                editable={false}
                style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.physicalqty}
                
              >
              </TextInput>
            </View>
          </View>
          <View style={styles.logocontainer}>
            <View style={{ width: '40%' }}>

              <Text style={styles.setTextSize}>Update Qty</Text>
            </View>
            <View style={{ width: '60%' }}>

              <TextInput

                style={styles.input1}
                value={this.state.updateqty}
                underlineColorAndroid="transparent"
                returnKeyType="next"
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={updateqty => this.setState({ updateqty })}
                autoCorrect={false}
              >

              </TextInput>
            </View>

          </View>
          <View style={styles.btncontainerr}>
            <TouchableOpacity style={styles.btncontainer} onPress={this.nextBtnClicked}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btncontainer} onPress={this.finisedBtmClicked}>
              <Text style={styles.btnText}>Finish</Text>
            </TouchableOpacity>
          </View>
          <Loading ref="loading" />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  logocontainer: {
    marginTop: 0,
    marginBottom: 3,
    marginLeft: 10,
    flexDirection: 'row',
  },
  ipiidText:{
    color: '#f15a2c',
    fontSize: 16, 
    fontWeight: "bold",
    marginTop:15
    
    


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
    color: "#286fb7",
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
