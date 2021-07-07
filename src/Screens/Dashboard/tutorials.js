import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignn from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import CardView from 'react-native-cardview';

export default class Tutorials extends Component {
  myfun = () => {
    this.props.navigation.navigate('Transations');
  };

  // static navigationOptions = {
  //     Title: "Home",
  //     headerTitle: (
  //         <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
  //             <Image
  //                 source={require("../images/poslogo.jpg")}
  //                 style={{
  //                     height: 100,
  //                     width: 100,
  //                     marginRight: 20,
  //                     resizeMode: "contain"
  //                 }}
  //             />
  //         </View>
  //     ),
  //     headerRight: (
  //         <View style={{ marginRight: 20 }}>
  //             <AntDesignn name="bell" size={25} color="#16a0db" />
  //         </View>
  //     )
  // };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
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
                  onPress={() => this.props.navigation.navigate('Dashboard')}>
                  Tutorials
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{flexDirection: 'column', margin: 10}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReactNativeYouTubeExample', {
                  myUrl: 'TDY7oOuY6sg',
                })
              }>
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
                    Basic POS Settings
                  </Text>
                </View>
              </ListItem>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReactNativeYouTubeExample', {
                  myUrl: 'vCI3cpbHX-4',
                })
              }>
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
                    User Tutorial
                  </Text>
                </View>
              </ListItem>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReactNativeYouTubeExample', {
                  myUrl: '1xoePbgoUSQ',
                })
              }>
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
                    Vendor Tutorial
                  </Text>
                </View>
              </ListItem>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReactNativeYouTubeExample', {
                  myUrl: '3hEwh6U2h84',
                })
              }>
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
                    Item Tutorial
                  </Text>
                </View>
              </ListItem>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReactNativeYouTubeExample', {
                  myUrl: 'h6P-gOZBs74',
                })
              }>
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
                    Advance Item Tutorial
                  </Text>
                </View>
              </ListItem>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReactNativeYouTubeExample', {
                  myUrl: 'LtHw57w8bzM',
                })
              }>
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
                    Item Labeling
                  </Text>
                </View>
              </ListItem>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReactNativeYouTubeExample', {
                  myUrl: 'oJt8SzR9zqg',
                })
              }>
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
                    Purchase orders
                  </Text>
                </View>
              </ListItem>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ccc"
  },
  card1: {
    // backgroundColor: '#16a0db',
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,

    height: 60,
    width: '100%',
    marginTop: 20,
  },
  card2: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    height: 60,

    width: '100%',
  },
});
