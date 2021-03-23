import React,{Component  } from "react";
import { View,Text,SafeAreaView , ImageBackground,} from "react-native";
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    render(){
        return(
           <SafeAreaView>
                <View>
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
                  <Text style={{color: 'white'}}>Settings</Text>
                  
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
            </View>
           </SafeAreaView>
        )
    }
}