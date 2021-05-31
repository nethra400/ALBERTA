import React, {Component} from 'react';
import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Eos extends Component {
  state = {
    data: [
      {
        name: 'Sales',
        amt: '$000.00',
      },
      {
        name: 'Taxable',
        amt: '$000.00',
      },
      {
        name: 'Non-Taxable',
        amt: '$000.00',
      },
      {
        name: 'Total',
        amt: '$000.00',
      },
      {
        name: 'Grand Total',
        amt: '$000.00',
      },
    ],
    data1: [
      {
        name: 'Credit',
        amt: '$000.00',
      },
      {
        name: 'Cash',
        amt: '$000.00',
      },
      {
        name: 'EBT',
        amt: '$000.00',
      },
    ],
    data2: [
      {
        name: '#Returned Item',
        amt: '$000.00',
      },
      {
        name: '#Of Transactiona',
        amt: '$000.00',
      },
      {
        name: '#Avg Transactions',
        amt: '$000.00',
      },
    ],
    data3: [
        {
          name: 'Opening Cash',
          amt: '$000.00',
        },
        {
          name: '+Cash Sales',
          amt: '$000.00',
        },
        {
          name: '-Cash paidout',
          amt: '$000.00',
        },
        {
          name: '-Safe Drop',
          amt: '$000.00',
        },
        {
          name: 'Expected Cash',
          amt: '$000.00',
        },
        {
            name: 'Actual Cash',
            amt: '$000.00',
          },
          {
            name: 'Cash Short',
            amt: '$000.00',
          },
      ]
  };

  render() {
    return (
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
                paddingHorizontal: 20,
              }}>
              <Text
                style={{color: 'white'}}
                onPress={() => this.props.navigation.navigate('Reports')}>
                End of shift report
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{display: 'flex'}}>
              <Button
                style={{marginTop: 10}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  paddingHorizontal: 45,
                  paddingVertical: 12,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                }}
                containerStyle={{margin: 20}}
                //type="outline"
                title="00/00/0000"
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}
              />
            </View>
            <View style={{display: 'flex'}}>
              <Button
                style={{marginTop: 10}}
                titleStyle={{color: '#fff', fontSize: 16}}
                buttonStyle={{
                  paddingHorizontal: 45,
                  paddingVertical: 12,
                  backgroundColor: '#3386D6',
                  borderRadius: 25,
                }}
                containerStyle={{margin: 20, marginLeft: 3}}
                //type="outline"
                title="[select Batch]"
                onPress={() => {
                  this.props.navigation.navigate('Dashboard');
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>SALES TOTAL</Text>
            </View>
            {this.state.data.map((val) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{val.name}</Text>
                    <Text>{val.amt}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>TENDER TOTAL</Text>
            </View>
            {this.state.data1.map((val) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{val.name}</Text>
                    <Text>{val.amt}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>PERFORMANCE STATISTICS</Text>
            </View>
            {this.state.data2.map((val) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{val.name}</Text>
                    <Text>{val.amt}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>CASH COUNT</Text>
            </View>
            {this.state.data3.map((val) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{val.name}</Text>
                    <Text>{val.amt}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
