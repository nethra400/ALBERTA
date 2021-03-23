import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  View,
  Text,
  AsyncStorage,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import moment from 'moment-timezone';
import LinearGradient from 'react-native-linear-gradient';

class Dashboard extends React.Component {
  state = {
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
    reportPermision: "",
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
  };

  componentDidMount(){
    AsyncStorage.getItem('id').then(id => {
      AsyncStorage.getItem('Sid').then(Sid => {
        // alert(Sid)

        // if (id) {
          fetch(  API_BASE_URL +`admin/get_by_main_menu_permission?id=56&sid=100178`, {
            method: 'GET',
          })
            .then(response => response.json())
            .then(response => {
              console.log(Sid)

              this.setState({
                dataSource: "",
                reportPermision: ""
              })

              if(response.status == "success"){

                
              this.setState({
                dataSource: [...response.data],

              });
              alert(dataSource)
            }

            })
          
            .catch(error => {
              console.log(error);
            });

        // }
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
            {item.salesCount}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: 'white'}}>{item.taxText}</Text>
          <Text style={{color: 'white'}}>{item.transText}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: 'white'}}>{item.taxCount}</Text>
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
    const rederGridItem = itemData => {

      if(itemData.item.vpermissionname == "REPORTS"){
        this.setState({      
          reportPermision: "REPORTS"
        })

      }
      switch (itemData.item.vpermissionname) {
        case "REPORTS":
          return (<Tile
            title={itemData.item.vpermissionname}
            icon="file-text"
            code={["#52c6d8", "#45c0d4", "#37b9d0", "#25b3cd", "#04adc9"]}
            onSelect={() => this.props.navigation.navigate('Dashboard')}
          />);
          break;
        case "Tutorials":
          return (<Tile
            title={itemData.item.vpermissionname}
            icon="youtube-play"
            code={["#f58120", "#f4771f", "#f36c20", "#f26221", "#f05623"]}
            onSelect={() => this.props.navigation.navigate('LiveSales')}
          />);
          break;
        case "Item":
          return (<Tile
            title={itemData.item.vpermissionname}
            icon="cart-plus"
            code={["#3386D6", "#3386D6", "#3386D6", "#3386D6", "#3386D6"]}
            onSelect={() => this.props.navigation.navigate('ItemDashboard')}
          />);
          break;
        case "NOTIFICATIONS":
          return (<Tile
            title={itemData.item.vpermissionname}

            icon="bell-o"
            code={["#f4d60c", "#edc425", "#e3b432", "#d8a43c", "#ca9544"]}
            onSelect={() => this.props.navigation.navigate('Notifications')}
          />);
          break;
        case "RECEIVE ORDER":
          return (<Tile
            title={itemData.item.vpermissionname}
            icon="line-chart"
            code={["#52c6d8", "#45c0d4", "#37b9d0", "#25b3cd", "#04adc9"]}
            onSelect={() => this.props.navigation.navigate('ReciveOrder')}
          />);
          break;
        case "PRINT LABEL":
          return (<Tile
            title={itemData.item.vpermissionname}
            icon="barcode"
            code={["#f58120", "#f4771f", "#f36c20", "#f26221", "#f05623"]}
            onSelect={() => this.props.navigation.navigate('BarcodeTablePrint')}
          />);
          break;

        case "Physical Inventory":
          // if(this.state.physicalInventory == "Active") {
            return (<Tile
              title={itemData.item.vpermissionname}
              icon="shopping-cart"
              code={["#3386D6", "#3386D6", "#3386D6", "#3386D6", "#3386D6"]}
             // onSelect={() => this.props.navigation.navigate('PhysChooseItem')}
              onSelect={() => this.refreshTiles()}
            />);

            break;
           
          // }
break;
          /*if(this.state.physicalInventory == "Hide") {
            // return (<Tile
            //   title={itemData.item.vpermissionname}
            //   icon="shopping-cart"
            //   code={["#3386D6", "#3386D6", "#3386D6", "#3386D6", "#3386D6"]}
            //   onSelect={() => this.props.navigation.navigate('PhysChooseItem')}
            // />);
            break
          }*/
        case "Promotion":
          return (<Tile
            title={itemData.item.vpermissionname}
            icon="gift"
            code={["#f4d60c", "#edc425", "#e3b432", "#d8a43c", "#ca9544"]}
           onSelect={() => this.props.navigation.navigate('Promotion')}
          //onSelect={() => this.props.navigation.navigate('PromStockAddItem')}
          />);
        break;
        default:
          break;
      }
      
    };

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
                  <Text style={{color: 'white'}}>{this.state.sname} [Store Id]</Text>
                  <FontAwesome name="bell" color={'white'} size={18} />
                </View>
              </ImageBackground>
            </View>
           
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
            {/* <ScrollView> */}
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
                <Text>00</Text>
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
            
            {
              this.state.dataSource &&
              this.state.dataSource.map(val=>{
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
                      {val.vpermissionname}
                    </Text>
                  </View>
                </ListItem>
              </TouchableOpacity>
              })

            }
            {/* <View>
           
                <ListItem
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
                      Print Label
                    </Text>
                  </View>
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity>
                <ListItem
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
                      Promotions
                    </Text>
                  </View>
                </ListItem>
              </TouchableOpacity>

              <TouchableOpacity>
                <ListItem
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
                      Physical Inventory
                    </Text>
                  </View>
                </ListItem>
              </TouchableOpacity>

              <TouchableOpacity>
                <ListItem
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
                      Tutorials
                    </Text>
                  </View>
                </ListItem>
              </TouchableOpacity>
            </View> */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={this.state.dataSource}
                keyExtractor={(item, index) => item.index}
                numColumns={2}
                renderItem={rederGridItem}
              />
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
