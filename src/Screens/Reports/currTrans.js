import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
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
    data1: [
      {
        qty: 1,
        name: 'Item Name @ $000 Discount $00.0',
        amount: '$000.00',
      },
      {
        qty: 1,
        name: 'Item Name @ $000 Discount $00.0',
        amount: '$000.00',
      },
      {
        qty: 1,
        name: 'Item Name @ $000 Discount $00.0',
        amount: '$000.00',
      },
      {
        qty: 1,
        name: 'Item Name @ $000 Discount $00.0',
        amount: '$000.00',
      },
      {
        qty: 1,
        name: 'Item Name @ $000 Discount $00.0',
        amount: '$000.00',
      },
    ],
    data2: [
      ,
      {
        name: 'register',
        amt: '101',
      },
      {
        name: 'subtotal',
        amt: '$000.0',
      },
      {
        name: 'tax',
        amt: '$000.0',
      },
      {
        name: 'total',
        amt: '$000.0',
      },
    ],
  };

  handleClick = () => {
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
            let ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2,
            });
            this.setState(
              {
                isLoading: false,
                data: ds.cloneWithRows(responseJson.table_data),
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
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../../assets/images/header.jpeg')}
            style={{position: 'relative', height: 80, paddingTop: 20}}>
            <Text
              style={{color: '#fff', paddingHorizontal: 40}}
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              Currrent Transactions
            </Text>
          </ImageBackground>
        </View>
        <View>
          {this.state.data.map((val, index) => {
            return (
              <View>
                {
                  <TouchableOpacity onPress={() => this.handleClick()}>
                    <ListItem
                      // key={index}
                      keyExtractor={(item, index) => index.toString()}
                      bottomDivider
                      containerStyle={{
                        borderRadius: 35,
                        marginHorizontal: 10,
                        marginVertical: 10,
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
                            {val.id}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              // paddingVertical: 2,
                              paddingHorizontal: 16,
                            }}>
                            {val.date}
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
                            {val.label}
                          </Text>
                        </View>
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                }
              </View>
            );
          })}
        </View>
        <Dialog
          flex="1"
          height={700}
          width={300}
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
                    paddingHorizontal: 35,
                    paddingVertical: 20,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                    shadowRadius: 2,
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>SALES DETAILS</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      ARHINTOP: 5,
                    }}>
                    <Text style={{color: '#3386D6'}}>Qty</Text>
                    <Text style={{color: '#3386D6'}}>Item name</Text>
                    <Text style={{color: '#3386D6'}}>Amount</Text>
                  </View>
                  <View>
                    {this.state.data1.map((val) => {
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
                                    flexWrap: 'wrap',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      paddingHorizontal: 5,
                                    }}>
                                    {val.qty}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      paddingHorizontal: 5,
                                    }}>
                                    {val.name}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      paddingHorizontal: 5,
                                    }}>
                                    {val.amount}
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
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>SALES </Text>
                  </View>
                  {this.state.data2.map((val) => {
                    return (
                      <View>
                        {
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                              {val.name}
                            </Text>
                            <Text style={{fontSize: 12}}>{val.amt}</Text>
                          </View>
                        }
                      </View>
                    );
                  })}
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
                  {this.state.data2.map((val) => {
                    return (
                      <View>
                        {
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <Text style={{marginRight: 20, fontSize: 12}}>
                              {val.name}
                            </Text>
                            <Text style={{fontSize: 12}}>{val.amt}</Text>
                          </View>
                        }
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </SafeAreaView>
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
