import React,{ Component  } from "react";
import { View,Text,SafeAreaView , ImageBackground,} from "react-native";
import {Button} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Promotions extends Component{
    state= {
        data:[{
            Name:'Promotion Name',
            Price:'Slab Price',
            Status:"Active",
            Category:'Open Ended'
        },
        {
            Name:'Promotion Name',
            Price:'Slab Price',
            Status:"Active",
            Category:'Open Ended'
        },
        {
            Name:'Promotion Name',
            Price:'Slab Price',
            Status:"Active",
            Category:'Open Ended'
        },
        {
            Name:'Promotion Name',
            Price:'Slab Price',
            Status:"Active",
            Category:'Open Ended'
        },
        
       ]
    }
    render(){
        return(
            <SafeAreaView>
                  <View style={{width: '100%'}}>
              <ImageBackground
                source={require('../../assets/images/header.jpeg')}
                style={{position: 'relative', height: 100, paddingTop: 20}}>
                <View
                  style={{
                    // display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    // paddingVertical: 10,
                    paddingHorizontal:20
                  }}>
                  <Text style={{color: 'white',marginTop:10,}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Promotions</Text>
                  <View >
              <Button
              style={{marginTop:10,}}
                titleStyle={{color: '#3386D6', fontSize: 16}}
                buttonStyle={{
                  paddingVertical: 12,
                  paddingHorizontal:20,
                  backgroundColor: '#fff',
                  borderRadius: 25,
                  // width:"50%"
                }}
                // containerStyle={{margin: 20}}
                //type="outline"
                title="Add New"
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}
              />
            </View>
                  
                </View>
              </ImageBackground>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'grey',height:50,paddingVertical:15,paddingHorizontal:5,justifyContent:'space-evenly',flexWrap:'wrap',width:'100%'}}>
              <Text style={{color:'white'}}>Promotion Name</Text>
              <Text style={{color:'white'}}>Type</Text>
              <Text style={{color:'white'}}>Status</Text>
              <Text style={{color:'white'}}>Category</Text>
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
                        {/* <FontAwesome name="circle" color={'#3386D6'} size={32} /> */}
                        <Text
                          style={{
                            fontSize: 12,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                          }}>
                          {val.Name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                          }}>
                          {val.Price}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                          }}>{val.Status}</Text>
                        <Text style={{
                            fontSize: 12,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                          }}>{val.Category}</Text>
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

export default Promotions