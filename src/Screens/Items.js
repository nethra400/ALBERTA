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

    handlePress = (item) =>{
      const {data} = this.state
      let data1=JSON.stringify(item);
      let data2=JSON.parse(data1);
      if(data2.name == "Add/Edit Item"){
        this.props.navigation.navigate("AddItem")
      }
      else if(data2.name == "Change Price"){
        this.props.navigation.navigate("ItemChangePrice")
      }
      else if(data2.name == "Update Quantity"){
        this.props.navigation.navigate("UpdateQty")
      }
      else if(data2.name == "Upload Picture") {
        this.props.navigation.navigate("UploadPic")
      }
      
    
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
                    <FontAwesome style={{marginRight:0}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Dashboard')} />
                  <Text style={{color: 'white',fontSize:15,paddingHorizontal:8,paddingVertical:3}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Items</Text>
                  
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                width:"100%"
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 80,
                  justifyContent:'center',
                  paddingHorizontal: 130,
                  paddingVertical: 40,
                  marginTop:20,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1,
                  elevation: 3,
                  shadowRadius: 5,
                }}>
                <Text style={{fontSize:20,padding:5}}>Total Items</Text>
                <Text style={{fontSize:16,padding:5,marginLeft:20}}>00,000</Text>
              </View>
              </View>
                <View>
          
                      {
                          this.state.data.map((val,index)=>{
                              return(
                                <TouchableOpacity onPress={()=>this.handlePress(val)}>
                                <ListItem
                                 keyExtractor={(item, index) => index.toString()}
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