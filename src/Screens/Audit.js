import React, {Component} from 'react';
import {View, Text, SafeAreaView, ImageBackground,StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-community/async-storage";

export default class Audit extends Component {

    state ={
       data:[],
       data1:[],

    data2:[],

    data3:[],

    data4:[],

    data5:[],

    data6:[]
    }

    handlenoSale= () =>{
      const {data1} = this.state
      this.setState({
        data:data1
      })
    }

    componentDidMount (){
      //    const {data1} = this.state
      // this.setState({
      //   data:data1
      // })
      AsyncStorage.getItem("Sid").then(data => {
        if (data) {
          STORE_ID = data;
          API_URL = API_BASE_URL + "notifications_new/" + STORE_ID;
          return fetch(API_URL)
            .then(response => response.json())
            .then(responseJson => {
              this.setState({ isLoading: false });
  
              this.setState({ data1: responseJson.delete,
              data2:responseJson.void,
            data3:responseJson.no_sale, });
            })
            .catch(error => {
              alert("Sommething went  wrong! Please try again later!");
            });
        }
      });
    }

    handleVoid = () =>{
      
     const {data2} = this.state
      this.setState({
        data:data2
      })
    }
    handleDelete = () =>{
       const {data1} = this.state;
       this.setState({
         data:data1
       })

      // AsyncStorage.getItem("Sid").then(data => {
      //   if (data) {
      //     STORE_ID = data;
      //     API_URL = API_BASE_URL + "notifications_new/" + STORE_ID;
      //     return fetch(API_URL)
      //       .then(response => response.json())
      //       .then(responseJson => {
      //         this.setState({ isLoading: false });
  
      //         this.setState({ data: responseJson.delete });
      //       })
      //       .catch(error => {
      //         alert("Sommething went  wrong! Please try again later!");
      //       });
      //   }
      // });

    }

    handlenonScanned = () =>{
      const {data4} = this.state;
      this.setState({
        data:data4
      })
    }

    handlehighTotal = () =>{
      const {data5} = this.state;
      this.setState({
        data:data5
      })
    }

    handleDsicounted = () =>{
      const {data6} = this.state
      this.setState({
        data:data6
      })
    }
  render() {
  
    return (
      <SafeAreaView>
        <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../assets/images/header.jpeg')}
            style={{position: 'relative', height: 160, paddingTop: 20}}>
                <Text style={{color:'#fff',paddingHorizontal:40}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Loss Prevention</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent:'space-evenly',
                marginTop:10

              }}>
              <TouchableOpacity style={styles.btncontainer} onPress = {()=>this.handlenoSale()} >
                <Text style={styles.btntext}>No Sale</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer} onPress={()=>this.handleVoid()}>
                <Text style={styles.btntext}>Void</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer} onPress={()=>this.handleDelete()}>
                <Text style={styles.btntext}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent:'space-evenly',
                marginTop:10
              }}>
              <TouchableOpacity style={styles.btncontainer} onPress={()=>this.handlenonScanned()}>
                <Text style={styles.btntext}>Non Scanned</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer} onPress={()=>this.handlehighTotal()}>
                <Text style={styles.btntext}>High Total</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer} onPress={()=>this.handleDsicounted()}>
                <Text style={styles.btntext}>Discounted</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View>
{
        
          this.state.data.map((val,index)=>{
              return(
      
              <View>
                {
                  <TouchableOpacity>
                  <ListItem
                  // key={index}
                  keyExtractor={(item, index) => index.toString()}
                    bottomDivider
                    containerStyle={{
                      borderRadius: 35,
                      marginHorizontal: 10,
                      marginVertical: 10,
                    }}>
                    <View >
                      {/* <FontAwesome name="circle" color={'#3386D6'} size={32} /> */}
                      <Text
                        style={{
                          fontSize: 12,
                          // paddingVertical: 2,
                          paddingHorizontal: 16,
                        }}>
                        {val.time}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          // paddingVertical: 2,
                          paddingHorizontal: 16,
                        }}>
                        {val.message}
                      </Text>
                    </View>
                  </ListItem>
                </TouchableOpacity>
                }
                
                </View>
              )
          })
      
  }
      
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    btncontainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 30,
        width:100,
        // marginHorizontal:"1%",
        // marginStart: "28%",
        // width: "28%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 12,
        //padding: 5,
      },
      btntext: {
        //textAlign : 'center',
        fontSize: 14,
        alignItems: "center",
        color: "#000",
      },

})
