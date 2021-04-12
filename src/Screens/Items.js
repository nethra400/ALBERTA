import React,{Component  } from "react";
import { View,Text,SafeAreaView , ImageBackground,} from "react-native";
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Items extends Component{
    state={
        data:[{
            name:"Add/Edit Item"
        },
        {
            name:"Change Price"
        },
        {
            name:"Update Quantity"
        },
        {
            name:"Upload Picture"
        },
       
    ]
    }
    render(){
        return(
           <SafeAreaView>
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
                  <Text style={{color: 'white'}}>Items</Text>
                  
                </View>
              </ImageBackground>
            </View>
                <View>
          
                      {
                          this.state.data.map((val,index)=>{
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
           </SafeAreaView>
        )
    }
}