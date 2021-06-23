import React, { Component } from 'react';
import {
  StyleSheet, TextInput, Text,ImageBackground,
  KeyboardAvoidingView, View, Image, TouchableOpacity, ScrollView, value, Alert, Keyboard
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'react-native-whc-loading'

export default class PromTile extends React.Component {
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
      stockView : ""
    }
  }




  componentDidMount() {


   // AsyncStorage.clear()

  }


stockBtnClicked = () => {
  // AsyncStorage.setItem("stock","Stock Bound")
  this.props.navigation.navigate('PromStockBuyN');
}

timebtnClicked = () =>{
  // AsyncStorage.setItem("time","Time Bond")
  this.props.navigation.navigate('PromTime');
  //this.props.navigation.navigate('Barcodechangeprice');

} 

openBtnClicked = () => {
  // AsyncStorage.setItem("open","Open Ended")
  this.props.navigation.navigate('PromOpen');

}

  render() {

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#D3D3D3' }}>
        <View style={styles.MainContainer}>
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
                  <Text style={{color: 'white'}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Promotions</Text>
                  
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
            containerStyle={{margin: 5}}
            //type="outline"
            title="Time Bound"
            onPress={() => this.timebtnClicked()}
          />
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
            containerStyle={{margin: 5}}
            //type="outline"
            title="Stock Bound"
            onPress={() => this.stockBtnClicked()}
          />
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
            containerStyle={{margin: 5}}
            //type="outline"
            title="Open Ended"
            onPress={() => this.openBtnClicked()}
          />
        </View>
          
       

          <Loading ref="loading" />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({

  btncontainerr: {

    alignItems : 'center',
    justifyContent : 'center',
    flexDirection: 'column',
  },

  MainContainer:
  {
    flex: 1,
    backgroundColor: '#D3D3D3',
   
  },

  subText: {
      
    //    color: "#696969",
    //   fontSize: 18,
    //  fontWeight: "bold",
    //  marginTop: 20
    fontSize: 20,
    fontWeight: "800",
    color: "#696969"      
      
  },
  btncontainer: {
    
    backgroundColor: '#3386D6',
    
    borderRadius: 10,
    height: 50,
    
    width: "180%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
    alignItems: 'center'
  },
});
