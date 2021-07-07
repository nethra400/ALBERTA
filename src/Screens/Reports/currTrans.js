import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';
import Dialog, {
  DialogContent,
  SlideAnimation,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';

export default class currTrans extends Component {
  state = {
    data: [],
    smsView: false,
    register: "",
    sales: "",
    tax: "",
    discountAmount: "",
    nnettotal: "",
    vstorename: "",
    SalesTenderDetail: [],
    User: [],
    SalesDetail: [],
    salesData: [],
    isLoading: true,
    SalesReturnDetail: [],
    SalesReturnDetailValue: [],
    SalesGranTotal: [],
    total: "",
    Tender_Total: '',
    tender_detail: []

  };

  handleClick = (val) => {
    // alert(JSON.stringify(val));
    AsyncStorage.setItem('SalesId', JSON.stringify(val.SalesId));
    this.setState({
      smsView: true,
    });
  };

  componentDidMount() {
    //this.timer = setInterval(()=> this.loginWithToken(), 1000)
    AsyncStorage.getItem('Sid').then((SID) => {
      if (SID) {
        STORE_ID = SID;
        return fetch(API_BASE_URL + 'current25transactions/' + STORE_ID)
          .then((response) => response.json())
          .then((responseJson) => {
            //this.refs.loading.show(false);
            // let ds = new ListView.DataSource({
            //   rowHasChanged: (r1, r2) => r1 !== r2,
            // });
            this.setState(
              {
                isLoading: false,
                data: responseJson.table_data,
              },
              function () {
                // In this block you can do something with new state.
                this.arrayholder = responseJson.table_data;
              },
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });


    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
          AsyncStorage.getItem('SalesId').then((SalesId) => {
              // alert(SalesId)
              if (data) {
                  fetch(API_BASE_URL + `admin/getTransactionDetail_new?token=${encodeURIComponent(data)}&sid=${SID}&salesId=${SalesId}`, {
                      method: 'GET',

                  }).then((response) => response.json())
                      .then((responseJson) => {
                          
                         
                          // alert(responseJson.Sales[0].isalesid)

                          // AsyncStorage.setItem('discountAmount',responseJson.Sales[0].ndiscountamt)
                          // AsyncStorage.setItem('sales',responseJson.Sales[0].nsaletotalamt)
                          // AsyncStorage.setItem('tax',responseJson.Sales[0].nnettotal)
                          // AsyncStorage.setItem('register',responseJson.Sales[0].iuserid)
                          // AsyncStorage.setItem('User',responseJson.SalesTenderDetail)
                          // AsyncStorage.setItem('salesData',responseJson.SalesDetail)




                          this.setState(

                              {
                                  isLoading: false,
                                  discountAmount: responseJson.Sales[0].ndiscountamt,
                                  vstorename: responseJson.Sales[0].vstorename,
                                  sales: responseJson.Sales[0].nsubtotal,
                                  tax: responseJson.Sales[0].ntaxtotal,
                                  register: responseJson.Sales[0].iuserid,
                                  User: responseJson.SalesTenderDetail,
                                  salesData: responseJson.SalesDetail,
                                  nnettotal: responseJson.Sales[0].nnettotal,
                                  SalesReturnDetail: responseJson.SalesReturnDetail,
                                  SalesReturnDetailValue: responseJson.SalesReturnDetailValue,
                                  SalesGranTotal: responseJson.SalesGranTotal,
                                  total: responseJson.total,
                                  Tender_Total: responseJson.Tender_Total,
                                  tender_detail: responseJson.tender_detail
                              })




                      })
                      .catch((error) => {
                          alert(responseJson.error);
                      });
              }
          });
      })
  })
  }

  render() {
    return (
      <View>
        <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../../assets/images/header.jpeg')}
            style={{position: 'relative', height: 80, paddingTop: 20}}>
                <View
                            style={{
                               // display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal:20,
                    marginTop:15
                            }}>
                            <FontAwesome style={{marginRight:10}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Items')} />
                            <Text style={{color: 'white',fontSize:15,paddingVertical:3}}  onPress={()=>this.props.navigation.navigate('Dashboard')}>Currrent Transactions</Text>
                        </View>
           
          </ImageBackground>
        </View>
        <ScrollView>
          {this.state.data.map((val, index) => {
            return (
              <View>
                {
                  <TouchableOpacity onPress={() => this.handleClick(val)}>
                    <ListItem
                      // key={index}
                      keyExtractor={(item, index) => index.toString()}
                      bottomDivider
                      containerStyle={{
                        borderRadius: 35,
                        marginHorizontal: 10,
                        marginVertical: 4,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <View style={{flexDirection: 'column'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              // paddingVertical: 2,
                              paddingHorizontal: 16,
                            }}>
                            {val.SalesId}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              // paddingVertical: 2,
                              paddingHorizontal: 16,
                            }}>
                            {val.Date}
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              // paddingVertical: 2,
                              paddingHorizontal: 16,
                              paddingLeft: 140,
                            }}>
                            {val.SaleAmount}
                          </Text>
                        </View>
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                }
              </View>
            );
          })}
        </ScrollView>
        <Dialog
          flex="1"
          height={700}
          width={350}
          dialogStyle={{}}
          visible={this.state.smsView}
          onTouchOutside={() => {
            this.setState({smsView: false});
          }}>
          <DialogContent>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                paddingVertical: 3,
              }}>
              <View>
                <Text style={{marginTop: 10}}>{'Store Name [Store Id]'}</Text>
                <FontAwesome
                  style={{marginLeft: 250}}
                  name="remove"
                  color={'#3386D6'}
                  size={16}
                  onPress={() => this.setState({smsView: false})}
                />
              </View>

              <View
                style={{height: 300, backgroundColor: '#fff', width: '100%'}}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    paddingHorizontal: 25,
                    paddingVertical: 20,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                    shadowRadius: 2,
                    marginBottom:10
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>SALES DETAILS</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <Text style={{color: '#3386D6'}}>Qty</Text>
                    <Text style={{color: '#3386D6'}}>Item name</Text>
                    <Text style={{color: '#3386D6'}}>Amount</Text>
                  </View>
                  <View>
                    {this.state.salesData.map((val) => {
                      return (
                        <View>
                          {
                            <TouchableOpacity
                              onPress={() => this.handleClick()}>
                              <ListItem
                                // key={index}
                                keyExtractor={(item, index) => index.toString()}
                                // bottomDivider
                                containerStyle={
                                  {
                                    //   borderRadius: 35,
                                    //   marginHorizontal: 5,
                                    //   marginVertical: 10,
                                  }
                                }>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      // paddingHorizontal: 5,
                                    }}>
                                    {val.iunitqty}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      width:100,
                                      marginLeft:50,
                                      paddingHorizontal: 5,
                                    }}>
                                    {val.vitemname}
                                  </Text>
                                  
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      width:100,
                                      marginLeft:40,
                                      paddingHorizontal: 5,
                                    }}>
                                    {val.nextunitprice}
                                  </Text>
                                </View>
                              </ListItem>
                            </TouchableOpacity>
                          }
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                    shadowRadius: 2,
                    marginBottom:10
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>SALES </Text>
                  </View>
                  
                   <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                              {"Register"}
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.register}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                              {"Sub Total"}
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.sales}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                              {"Tax"}
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.tax}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                              {"Total"}
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.nnettotal}</Text>
                          </View>
                </View>

                <View
                  style={{
                    marginTop: 5,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                    shadowRadius: 2,
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>TENDER</Text>
                  </View>
                      <View>
                        
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                            Grand Total
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.total}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                            Cash
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.total}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                            Credit
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.total}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              paddingVertical:2
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                            Change
                            </Text>
                            <Text style={{fontSize: 12}}>{this.state.total}</Text>
                          </View>
                        
                      </View>
                   
                </View>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btncontainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 30,
    width: 100,
    // marginHorizontal:"1%",
    // marginStart: "28%",
    // width: "28%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 12,
    //padding: 5,
  },
  btntext: {
    //textAlign : 'center',
    fontSize: 14,
    alignItems: 'center',
    color: '#000',
  },
});
