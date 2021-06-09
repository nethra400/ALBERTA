import React,{ Component  } from "react";
import { View,Text,SafeAreaView , ImageBackground} from "react-native";
import {Button} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class PrintLabel extends Component{
    state= {
        data:[{name:"Item Name"},
        {name:"Item Name"},
        {name:"Item Name"},
        {name:"Item Name"},
        {name:"Item Name"},
        ]
    }

    removeItem = (val,idx) =>{
        alert(val,idx)
        const {data} = this.state;
        data.splice(idx,1)
    }
    render(){
        return(
            <SafeAreaView>
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
                  <Text style={{color: 'white'}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Print Label</Text>
                  
                </View>
              </ImageBackground>
            </View>
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
                title="Add Items"
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}
              />
            </View>
            <View>
          
          {
              this.state.data.map((val,idx)=>{
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
                          <Text>{val.name}</Text>
                        <FontAwesome style={{marginLeft:250}} name="remove" color={'#3386D6'} size={16} onPress={()=>this.removeItem(val,idx)} />
                        
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                  )
              })
          }
           <View style={{display: 'flex',alignItems:'center'}}>
              <Button
              style={{marginTop:10,}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  paddingVertical: 12,
                  paddingHorizontal:38,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                  // width:"50%"
                }}
                containerStyle={{margin: 20}}
                //type="outline"
                title="Clear"
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}
              />
            </View>
        


</View>
            </SafeAreaView>
        )
    }
}

export default PrintLabel