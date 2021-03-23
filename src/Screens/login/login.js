import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
  Keyboard,
  Switch,
  AsyncStorage
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
// import {Switch} from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from 'react-native-whc-loading';
import axios from 'axios';
import moment from 'moment-timezone';
// import { Switch } from 'react-native-switch';
import TabNav from "../Navigation/TabNav";

export default class welcome extends Component {
  constructor() {
    super();

    this.state = {
      // isSwitchOn: 'false',
      email: '',
      password: '',
      isSwitchEnabled: false,
      AUTH: false,
      dataSource: [],
      vpermissionnameArray: [],
      hidePassword: true,
    };
  }

  forceUpdate() {
    AsyncStorage.getItem('savedPassword').then((save) => {
      if (save) {
        this.props.navigation.navigate('saveUsername');
      }
    });
  }

  // componentDidMount() {
  //   // this.navigationSubscription =
  //   this.props.navigation.addListener('focus', (payload) => {
  //     this.forceUpdate();
  //   });
  // }

  //   componentWillUnmount() {
  //     this.navigationSubscription.remove();
  // }

  handleSwitch = () => {
    const {isSwitchEnabled} = this.state;
    this.setState({
      isSwitchEnabled: !isSwitchEnabled,
    });
  };

  handleLogin = () => {
    const {email, password, emailError} = this.state;
    // alert('hello')
    // alert(this.state.password);
    Keyboard.dismiss();

    let errors = true;
    let errorMsgs = {};

    if (!email) {
      errorMsgs.emailError = 'Please Enter Email';
      errors = false;
    }

    if (!password) {
      errorMsgs.pwdError = 'Please Enter Password';
      errors = false;
    }

    // if((this.state.AUTH && this.state.isSwitchEnabled)){
    //   alert("Please Select One")
    // }

    if (!errors) {
      this.setState({
        emailError: errorMsgs.emailError,
        pwdError: errorMsgs.pwdError,
      });
      return;
    } else {
      this.onLoginPressed();
    }
  };

  onLoginPressed = () => {
   const API_URL = LOGIN_BASE_URL + 'authenticate_new';

    fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.refs.loading.show(false);
        if (responseJson.error) {
          // this.setState({ msg: "Username or password not match" });
          this.setState({msg: responseJson.error});
        } else if (responseJson.token) {
          alert(responseJson.token);
          // this.props.navigation.navigate('Dashboard')
          AsyncStorage.setItem('token', responseJson.token);
          this.loginWithToken();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  sessionButton = () => {
    Alert.alert(
      '',
      'Session expired Please login again',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.session(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  loginWithToken = () => {
    console.log(AsyncStorage.getItem('token'))
    const {AUTH, isSwitchEnabled} = this.state;
    if (AUTH) {
      // AsyncStorage.setItem('AUTH','1')
      AsyncStorage.getItem('token').then((data) => {
        if (data) {
          AsyncStorage.setItem('AuthPassword', data);
        }
      });
    } else if (isSwitchEnabled) {
      // alert("hello")
      AsyncStorage.getItem('token').then((data) => {
        if (data) {
          AsyncStorage.setItem('savedPassword', data);
          // alert(data);
        }
      });
    }

    AsyncStorage.getItem('token').then((data) => {
      if (data) {
        let date = moment().format('MM-DD-YYYY');
        axios
          .get(LOGIN_BASE_URL1 + `${encodeURIComponent(data)}&date=${date}`)
          // .then((response) => responseJson)
          .then((responseJson) => {
            console.log(responseJson)
            // console.log(responseJson.error);
            // if (responseJson.error) {
            //   this.sessionButton();
            // }
            if (responseJson.data.user.email) {
              AsyncStorage.setItem('fname', responseJson.data.user.fname);
              AsyncStorage.setItem('lname', responseJson.data.user.lname);
              AsyncStorage.setItem('emailid', responseJson.data.user.email);
              AsyncStorage.setItem(
                'userId',
                JSON.stringify(responseJson.data.user.iuserid),
              );
              AsyncStorage.setItem('id', JSON.stringify(responseJson.data.user.id));
              //   AsyncStorage.setItem("userId", JSON.stringify(responseJson.data.user.id));
              AsyncStorage.setItem(
                'Storename',
                responseJson.data.user.stores[0].name,
              );
              AsyncStorage.setItem(
                'Sid',
                JSON.stringify(responseJson.data.user.stores[0].SID),
              );
              AsyncStorage.setItem(
                'void',
                JSON.stringify(responseJson.data.user.stores[0].voids),
              );
              AsyncStorage.setItem('sales', responseJson.data.user.stores[0].sales);
              AsyncStorage.setItem(
                'delete',
                JSON.stringify(responseJson.data.user.stores[0].deletes),
              );
              // AsyncStorage.setItem(
              //   "role_name",
              //   responseJson.data.user.user_role
              // );
              AsyncStorage.setItem('role_name', responseJson.data.user.user_role);
              AsyncStorage.setItem('tax', responseJson.data.user.stores[0].tax);
              AsyncStorage.setItem(
                'paid_out',
                responseJson.data.user.stores[0].paid_out,
              );
              AsyncStorage.setItem(
                'returns',
                responseJson.data.user.stores[0].returns,
              );
              AsyncStorage.setItem(
                'No_Sales',
                responseJson.data.user.stores[0].No_Sales,
              );
              showcategary = responseJson.data.user.stores[0].isnewdatabase;
              // this.Gonext();
              this.props.navigation.navigate('Dashboard')
            }

            Keyboard.dismiss();
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
  };

  Gonext = () => {
    AsyncStorage.getItem('id').then(id => {
      AsyncStorage.getItem('Sid').then(Sid => {
        if (id) {
          fetch(API_BASE_URL + `admin/get_by_main_nav_menu_permission?id=${id}&sid=${Sid}`, {
            method: 'GET', 
          }) 
            .then(response => response.json())
            .then(response => {
               this.setState({
                 dataSource: [...response.data],
               });
              let data = this.state.dataSource;

              if(true == data.some(item => (item.vpermissionname == "NOTIFICATIONS")) &&  true == data.some(item => (item.vpermissionname == "REPORTS")) ){
                
                this.props.navigation.navigate("TabNav");
              } 
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
    });
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#3386D6'}}>
        <View style={{marginTop: 100}}>
          <Image
            source={require('../../assets/images/Alberta_Logo1.png')}
            style={{width: '100%', height: 150, resizeMode: 'contain'}}
          />
        </View>
        <View style={{display: 'flex', flex: 1}}>
          <Text
            style={{
              alignSelf: 'center',
              marginVertical: 10,
              fontSize: 20,
              color: 'white',
            }}>
            Built by Retailers,for Retailers
          </Text>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.textBoxContainer}>
            <TextInput
              style={styles.textBox1}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#3386D6"
              // returnKeyType="next"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={true}
              onChangeText={(email) => this.setState({email, emailError: ''})}
            />
            <View style={styles.PhoneNumberView}>
              {/* <FontAwesome name="map-pin" size={16} color="#469BF6" /> */}
            </View>
          </View>
          <View>
            <Text style={styles.errors}>{this.state.emailError}</Text>
          </View>

          <View style={styles.textBoxContainer}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Password"
              style={styles.textBox1}
              secureTextEntry={this.state.hidePassword}
              keyboardType="default"
              placeholderTextColor={'#3386D6'}
              onChangeText={(password) =>
                this.setState({password, pwdError: ''})
              }
            />
            <View style={styles.PhoneNumberView}>
              <FontAwesome name="remove" size={16} color="#469BF6" />
            </View>
          </View>
          <View>
            <Text style={styles.errors}>{this.state.pwdError}</Text>
          </View>

          <View style={{display: 'flex'}}>
            <Button
              titleStyle={{color: '#fff', fontSize: 14}}
              buttonStyle={{
                padding: 12,
                backgroundColor: '#000',
                borderRadius: 25,
              }}
              containerStyle={{margin: 3}}
              //type="outline"
              title="Login"
              onPress={() => this.handleLogin()}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <ToggleSwitch
              // value={this.state.isSwitchEnabled}
              isOn={this.state.isSwitchEnabled}
              onColor="blue"
              offColor="white"
              trackOffStyle={{
                borderRightWidth: 5,
                borderRightColor: '#3386D6',
                borderTopWidth: 2,
                borderTopColor: '#3386D6',
                borderBottomWidth: 2,
                borderBottomColor: '#3386D6',
                borderLeftWidth: 2,
                borderLeftColor: '#3386D6',
              }}
              label="Save Username"
              labelStyle={{color: '#fff', fontWeight: '900'}}
              size="medium"
              onToggle={() => this.handleSwitch()}
            />
            <ToggleSwitch
              isOn={this.state.AUTH}
              onColor="blue"
              offColor="white"
              label="Use FaceId"
              labelStyle={{color: '#fff', fontWeight: '900'}}
              size="medium"
              onToggle={() => this.setState({AUTH: !this.state.AUTH})}
            />
          </View>

          {/* <View style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
            <ToggleSwitch
              isOn={false}
              onColor="#634fc9"
              offColor="transperant"
              trackOffStyle={{
                borderRightWidth: 1,
                borderRightColor: '#ccc',
                borderTopWidth: 2,
                borderTopColor: '#ccc',
                borderBottomWidth: 2,
                borderBottomColor: '#ccc',
                borderLeftWidth: 2,
                borderLeftColor: '#ccc',
              }}
              label="Save Username"
              labelStyle={{color: '#fff', fontWeight: '900'}}
              size="medium"
              onToggle={() => true}
            />
            <ToggleSwitch
              isOn={true}
              onColor="green"
              offColor="white"
              label="Use FaceId"
              labelStyle={{color: '#fff', fontWeight: '900'}}
              size="medium"
              onToggle={(isOn) => alert('changed to : ', isOn)}
            />
          </View> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textBoxContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    color: '#3386D6',
  },
  loginContainer: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 9},

    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 25,
    marginBottom: 60,
    color: '#000',
    fontSize: 15,
  },
  textBox1: {
    height: 45,
    backgroundColor: 'red',
    paddingRight: 8,
    paddingLeft: 38,
    width: '85%',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  PhoneNumberView: {
    height: 45,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  errors: {
    color: 'red',
    alignItems: 'flex-start',
    marginLeft: 46,
  },
});
