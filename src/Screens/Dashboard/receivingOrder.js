import React,{ Component  } from "react";
import { View,Text,SafeAreaView , ImageBackground,} from "react-native";
import {Button} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-community/async-storage";

class ReceivingOrder extends Component{
    state= {
        // data:[{
        //     date:"00/00",
        //     vendor:"Vendor Name",
        //     invoice:0.00,
        //     total:"100"
        // },
        // {
        //     date:"00/00",
        //     vendor:"Vendor Name",
        //     invoice:0.00,
        //     total:"100"
        // },
        // {
        //     date:"00/00",
        //     vendor:"Vendor Name",
        //     invoice:0.00,
        //     total:"100"
        // },
        // {
        //     date:"00/00",
        //     vendor:"Vendor Name",
        //     invoice:0.00,
        //     total:"100"
        // }]
        dataSource:[],
    }

    componentDidMount(){
      AsyncStorage.getItem("token").then(data => {
        AsyncStorage.getItem("Sid").then(datasid => {
            if (data) {
                this.setState(
                    {
                        isLoading: true,
                    },

                );
                const url = API_BASE_URL + 'admin/get_receiving_order/'
                fetch(url + datasid + "?token=" + data)

                    .then((response) => response.json())
                    .then((responsejson) => {
                        this.setState(
                            {
                                isLoading: false,
                            },

                        );

                        this.setState({ isFetching: false })

                        if (responsejson.status == "success") {

                            this.setState({ dataSource: responsejson.table_data })
                        }

                        if (!this.alertPresent) {
                            this.alertPresent = true;

                            if (responsejson.status == "error") {

                                alert(responsejson.error)
                            }
                            else {
                                this.alertPresent = false;

                            }
                        }



                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        })

    })

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
                  <Text style={{color: 'white',marginTop:10,}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Receiving Order</Text>
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
                  this.props.navigation.navigate('AddNewReceivingOrder');
                }}
              />
            </View>
                  
                </View>
              </ImageBackground>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'grey',height:50,paddingVertical:15,paddingHorizontal:5,justifyContent:'space-evenly',flexWrap:'wrap',width:'100%'}}>
              <Text style={{color:'white'}}> Date</Text>
              <Text style={{color:'white'}}>vendor</Text>
              <Text style={{color:'white'}}>Invoice No</Text>
              <Text style={{color:'white'}}>Total</Text>
            </View>
            <View>
          
          {
              this.state.dataSource.map((val,index)=>{
                  return(
                    <TouchableOpacity>
                    <ListItem
                    // key = {index}
                    keyExtractor={(item, index) => index.toString()}
                    
                      bottomDivider
                      containerStyle={{
                        borderRadius: 35,
                        marginHorizontal: 10,
                        marginVertical: 5,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        {/* <FontAwesome name="circle" color={'#3386D6'} size={32} /> */}
                        <Text
                          style={{
                            fontSize: 12,
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                          }}>
                          {val.dcreatedate}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            paddingVertical: 3,
                            paddingHorizontal: 20,
                          }}>
                          {val.vvendorname}
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 3,
                            paddingHorizontal: 35,
                          }}>{val.vinvoiceno}</Text>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 3,
                            paddingHorizontal: 35,
                          }}>{val.total_amount}</Text>
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

export default ReceivingOrder