import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  View,
  Text,
  AsyncStorage,
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
        headerText: moment().format('MM-DD-YYYY'),
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
    AsyncStorage.getItem("No_Sales").then(noSales => {
      if (noSales) {
        //alert(noSales)
        this.setState({ noSales: noSales });
      }
    });

    AsyncStorage.getItem("Storename").then(datastore => {
      if (datastore) {
        //alert(datastore)
        this.setState({ sname: datastore });
      }
    });

    AsyncStorage.getItem("Sid").then(datasid => {
      if (datasid) {
        this.setState({ sid: datasid });
      }
    });

    AsyncStorage.getItem("tax").then(datatax => {
      if (datatax) {
        this.setState({ stax: datatax });
        //alert(datatax)
      }
    });
    AsyncStorage.getItem("returns").then(datareturns => {
      if (datareturns) {
        this.setState({ returns: datareturns });
      }
    });
    AsyncStorage.getItem("paid_out").then(datapaid_out => {
      if (datapaid_out) {
        this.setState({ paidout: datapaid_out });
      }
    });
    AsyncStorage.getItem("void").then(datavoid => {
      if (datavoid) {
        //alert(datavoids)
        this.setState({ svoid: datavoid });
      }
    });
    AsyncStorage.getItem("sales").then(datasales => {
      if (datasales) {
        //alert(datastore)
        this.setState({ ssale: datasales });
      }
    });
    AsyncStorage.getItem("delete").then(datadelete => {
      if (datadelete) {
        //alert(datadelete)
        this.setState({ sdelete: datadelete });
      }
    });

    
    AsyncStorage.getItem('id').then(id => {
      AsyncStorage.getItem('Sid').then(Sid => {

      axios.get( API_BASE_URL + `admin/get_by_main_menu_permission?id=${id}&sid=${Sid}` )
      .then(responseJson=>{
        // alert(responseJson)
        console.log(responseJson)
        // console.log(JSON.stringify(res));
        this.setState({
          dataSource:responseJson.data.data
        })
        alert(this.state.dataSource)
      })
      .catch(err =>{
        console.log(err)
      })

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
      <View>
        <Text style={{color: 'white', alignSelf: 'center'}}>
          {item.headerText}
        </Text>
        {/* <Image source={item.image} /> */}
        <View>
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
            {this.state.noSales}
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

  render() {
    AsyncStorage.getItem("No_Sales").then(noSales => {
      if (noSales) {
        //alert(noSales)
        this.setState({ noSales: noSales });
      }
    });

    AsyncStorage.getItem("Storename").then(datastore => {
      if (datastore) {
        //alert(datastore)
        this.setState({ sname: datastore });
      }
    });

    AsyncStorage.getItem("Sid").then(datasid => {
      if (datasid) {
        this.setState({ sid: datasid });
      }
    });
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
              {/* <View > */}
              {!this.state.showRealApp && (
                <AppIntroSlider
                  renderItem={this._renderItem}
                  data={this.state.slides}
                  showSkipButton={false}
                  showDoneButton={false}
                  showNextButton={false}
                  bottomButton={true}
                />
              )}
              {/* </View> */}
            </LinearGradient>
         
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 80,
                  paddingHorizontal: 35,
                  paddingVertical: 20,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.5,
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
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 3,
                  shadowRadius: 5,
                }}>
                <Text>Non Scanned Items</Text>
                <Text>23</Text>
              </View>
            </View>
            
           <View>
             {
             this.state.dataSource.map((val,index)=>{
                return(
                  <TouchableOpacity>
                  <ListItem
                  key={index}
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
                )
             })
            
            //  <Text>{this.state.dataSource.data.}</Text>
          //  <Text>No data Found</Text>
          // null
           
             }
             
      
           </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Dashboard;