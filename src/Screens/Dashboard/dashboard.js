import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import moment from 'moment-timezone';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

class Dashboard extends React.Component {
  state = {
    DATA: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ],
    slides: [
      {
        key: 1,
        // headerText: moment().format('MM-DD-YYYY'),
        headerText:moment().format('MMMM DD YYYY, h:mm A'),
        salesText: 'Sales',
        salesCount: '$00.000,00',
        taxText: 'Tax',
        transText: 'Transactions',
        taxCount: '$000.00',
        transCount: '0,000',
        footerText: 'All Registers',
      },
      {
        key: 2,
        headerText: moment().format('MM-DD-YYYY'),
        salesText: 'Sales',
        salesCount: '$00.000,00',
        taxText: 'Tax',
        transText: 'Transactions',
        taxCount: '$000.00',
        transCount: '0,000',
        footerText: 'All Registers',
      },
    ],
    showRealApp: false,
    sname: null,
    svoid: null,
    ssale: null,
    sdelete: null,
    sid: null,
    date: "",
    stax: null,
    paidout: null,
    returns: null,
    curTime: null,
    refreshing: false,
    isMoving: false,
    pointsDelta: 0,
    points: 0,
    noSales: null,
    dataSource: [],
    physicalInventory: "",
    reportPermision: ""

  };

  componentDidMount(){
  

    AsyncStorage.getItem("user_and_store_details")
      .then((userAndStoreDetails) => {
        const {userDetails,
          storeDetails} = JSON.parse(userAndStoreDetails);
          // alert(userAndStoreDetails)
          const {id} = userDetails
        
          const { tax,Sid ,Storename,sales,deletes }  = storeDetails;
        // alert(sDetails)
        this.setState({
          stax:tax,
          sid:Sid,
          sname:Storename,
          noSales:sales,
          sdelete:deletes
          
        })

        axios.get( API_BASE_URL + `admin/get_by_main_menu_permission?id=${id}&sid=${Sid}` )
      .then(responseJson=>{
        // alert(responseJson)
        console.log(responseJson)
        // console.log(JSON.stringify(res));
        this.setState({
          dataSource:responseJson.data.data,
          
        })
        // alert(this.state.dataSource)
      })
      .catch(err =>{
        console.log(err)
      })

       
      })
    
    AsyncStorage.getItem('id').then(id => {
      AsyncStorage.getItem('Sid').then(Sid => {

    

    //     // if(id){
    //       // axios.get( API_BASE_URL + `admin/get_by_main_menu_permission?id=${id}&sid=${Sid}` )
          
    //     // }

    //     // if (id) {
    //     //   fetch(  API_BASE_URL +`admin/get_by_main_menu_permission?id=${id}&sid=${Sid}`, {
    //     //     method: 'GET',
    //     //   })
    //     //     // .then(response => response.json())
    //     //     .then(response => {
    //     //       console.log(Sid)

    //     //       this.setState({
    //     //         dataSource: "",
    //     //         reportPermision: ""
    //     //       })

    //     //        // const arr1 = response.data.filter(d => d.vpermissionname == "REPORTS");
    //     //         // if(arr1.length>0){
    //     //         //   this.setState({
    //     //         //    reportPermision:"REPORTS"
    //     //         //   })
    //     //       if(response.status == "success"){
    //     //         // const arr1 = response.data.filter(d => d.vpermissionname == "REPORTS");
                
    //     //       this.setState({
    //     //         dataSource: [...response.data],
    //     //        // reportPermision : response.data[0].vpermissionname

    //     //       });
    //     //     }

    //     //      if (!this.alertPresent) {
    //     //       this.alertPresent = true;
    //     //       if (response.message) {
    //     //           Alert.alert("", response.message, [{text: 'OK', onPress: () => { "" } }], { cancelable: false });
    //     //       } else {
    //     //           this.alertPresent = false;
    //     //       }
    //     //   }
    //     //     })
          
    //     //     .catch(error => {
    //     //       console.log(error);
    //     //     });

    //     // }
      })
    });
  }

  _renderItem = ({item}) => {
    return (
      <View style={{marginTop:10}}>
        <Text style={{color: 'white', alignSelf: 'center'}}>
          {item.headerText}
        </Text>
        {/* <Image source={item.image} /> */}
        <View style={{marginTop:10}}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            {item.salesText}
          </Text>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              
            }}>
            ${this.state.noSales}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: 'white'}}>{item.taxText}</Text>
          <Text style={{color: 'white'}}>{item.transText}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: 'white'}}>{this.state.stax}</Text>
          <Text style={{color: 'white'}}>{item.transCount}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>{item.footerText}</Text>
        </View>
        <Text>{item.text}</Text>
      </View>
    );
  };

 

  handleCancel = () => {
    AsyncStorage.removeItem('savedPassword');
    AsyncStorage.removeItem('token');
    // AsyncStorage.removeItem('AuthPassword')
    this.props.navigation.navigate('login');
  };

  handleClick = (item) =>{
    // alert("hello");
    // console.log(item);
    let data=JSON.stringify(item);
    let data1=JSON.parse(data);
    if(data1.vpermissionname == "RECEIVE ORDER"){
      this.props.navigation.navigate("ReceivingOrder")
    }
    else if(data1.vpermissionname == "PRINT LABEL"){
      this.props.navigation.navigate('PrintLabel')
    }
    else if(data1.vpermissionname == "QUICK REPORT"){
      this.props.navigation.navigate('Reports')
    }
    else if(data1.vpermissionname == "REPORTS"){
      this.props.navigation.navigate('Reports')
    }
    else if(data1.vpermissionname == "ADD/EDIT ITEM"){
      this.props.navigation.navigate('Items')
    }

    else if(data1.vpermissionname == "CHANGE PRICE"){
      this.props.navigation.navigate('Items')
    }
    else if(data1.vpermissionname == "UPDATE QUANTITY"){
      this.props.navigation.navigate('Items')
    }

    else if(data1.vpermissionname == "NOTIFICATIONS"){
      this.props.navigation.navigate('Audit')
    }

    else if (data1.vpermissionname == "Promotion"){
      this.props.navigation.navigate('Promotions')
    }
    else if(data1.vpermissionname == "Physical Inventory"){
      this.props.navigation.navigate('physicalInventory')
    }
    else if(data1.vpermissionname == "Tutorials"){
      this.props.navigation.navigate('Tutorials')
    }
    else{
      this.props.navigation.navigate("Dashboard")
    }
  }

  render() {
  
    return (
      <SafeAreaView>
         <ScrollView>
        
          <View>
         
            {/* <View><Text>{'hello'}</Text></View> */}

            {/* <Button 
          title="cancel"
          onPress={()=>this.handleCancel()}
            /> */}

            <View style={{width: '100%'}}>
              <ImageBackground
                source={require('../../assets/images/header.jpeg')}
                style={{position: 'relative', height: 180, paddingTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingTop: 10,
                  }}>
                  <Text style={{color: 'white'}}>{this.state.sname} [{this.state.sid}]</Text>
                  <FontAwesome name="bell" color={'white'} size={18} />
                </View>
              </ImageBackground>
            </View>
            {/* <View style={{height:130,width:200,backgroundColor:'#3386D6',marginLeft:100,}}>
                <Text style={{color:'white'}}>Hello</Text>
                <Text style={{color:'white'}}>Sales</Text>
                <Text style={{color:'white'}}>$00,000.00</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                  <Text style={{color:'white'}}>Tax</Text>
                  <Text style={{color:'white'}}>Transactions</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                  <Text style={{color:'white'}}>$000.00</Text>
                  <Text style={{color:'white'}}>0,000</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'white'}}>All Registers</Text>
                </View>
                

            </View> */}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0.8, y: 0.8}}
              colors={['#16A0DB', '#16A0DB', '#16A0DB', '#286FB7', '#286FB7']}
              style={{
                display: 'flex',
                padding: 10,
                height: 180,
                width: '80%',
                marginLeft: 40,
                marginTop: -100,
                shadowColor: '#000',
                shadowOffset: {width: 5, height: 5},
                shadowOpacity: 0.5,
                elevation: 3,
              }}>
              {!this.state.showRealApp && (
                <AppIntroSlider
                  renderItem={this._renderItem}
                  data={this.state.slides}
                  showSkipButton={false}
                  showDoneButton={false}
                  showNextButton={false}
                  // bottomButton={true}
                />
              )}
            </LinearGradient>
         
             <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                marginTop:10
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 80,
                  paddingHorizontal: 35,
                  paddingVertical: 20,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 3,
                  shadowRadius: 5,
                }}>
                <Text>Deleted Items</Text>
                <Text>{this.state.sdelete}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 80,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 3,
                  shadowRadius: 5,
                }}>
                <Text>Non Scanned Items</Text>
                <Text>23</Text>
              </View>
            </View> 
           
           {/* <View> */}
             {
             this.state.dataSource.map((val,index)=>{
                return(
                  <View >
                  <TouchableOpacity onPress={()=>this.handleClick(val)}>
                  <ListItem
                    keyExtractor={(item, index) => index.toString()}
                    bottomDivider
                    containerStyle={{
                      borderRadius: 35,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <FontAwesome name="circle" color={'#3386D6'} size={32} />
                      <Text
                        style={{
                          fontSize: 16,
                          paddingVertical: 5,
                          paddingHorizontal: 16,
                        }}>
                        {val.vpermissionname}
                      </Text>
                    </View>
                  </ListItem>
                </TouchableOpacity>
                </View>
                )
             })
            
            //  <Text>{this.state.dataSource.data.}</Text>
          //  <Text>No data Found</Text>
          // null
           
             }
             
      
           {/* </View> */}
           {/* </ScrollView> */}
          </View>
          </ScrollView>
       
      </SafeAreaView>
    );
  }
}

export default Dashboard;