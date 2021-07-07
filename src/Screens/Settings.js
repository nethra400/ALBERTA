import React,{Component  } from "react";
import { View,Text,SafeAreaView , ImageBackground} from "react-native";
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";

export default class Settings extends Component{
    state={
        data:[{
            name:"Notification Settings"
        },
        {
            name:"Dashboard Settings"
        },
        {
            name:"Barcode Settings"
        }
    ]
    }

    handleLogout = () =>{
      AsyncStorage.removeItem('savedPassword');
      this.props.navigation.navigate('login')
    }
    render(){
        return(
           <SafeAreaView>
                {/* <View> */}
                <View style={{width: '100%'}}>
              <ImageBackground
                source={require('../assets/images/header.jpeg')}
                style={{position: 'relative', height: 80, paddingTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal:20
                  }}>
                 <FontAwesome style={{marginRight:0}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Dashboard')} />
                  <Text style={{color: 'white',fontSize:15,paddingHorizontal:8,paddingVertical:3}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Settings</Text>
                  
                </View>
              </ImageBackground>
            </View>
                <View>
          
                      {
                          this.state.data.map((val)=>{
                              return(
                                <TouchableOpacity>
                                <ListItem
                                  bottomDivider
                                  containerStyle={{
                                    borderRadius: 35,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                  }}>
                                  <View style={{flexDirection: 'row'}}>
                                    <FontAwesome name="circle" color={'#3386D6'} size={32} />
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        paddingVertical: 5,
                                        paddingHorizontal: 16,
                                      }}>
                                      {val.name}
                                    </Text>
                                  </View>
                                </ListItem>
                              </TouchableOpacity>
                              )
                          })
                      }
                    


            </View>
           
            {/* </View> */}
            <View style={{display: 'flex'}}>
              <Button
              style={{marginTop:10}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  padding: 12,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                }}
                containerStyle={{margin: 20}}
                //type="outline"
                title="Logout"
                onPress={() => this.handleLogout()}
              />
            </View>
           
           </SafeAreaView>
        )
    }
}