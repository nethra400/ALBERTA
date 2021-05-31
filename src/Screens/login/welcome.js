import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {
  PrimaryButton,
  SecondaryButton,
  welcomeIcon,
} from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Facebook from '../../components/reusableComponents/FB';
import Twitter from '../../components/reusableComponents/Twitter';
import Instagram from '../../components/reusableComponents/Insta';
import LinkedIn from '../../components/reusableComponents/Linked';
import Youtube from '../../components/reusableComponents/Youtube';

Icon.loadFont();

export default class welcome extends Component {
  constructor() {
    super();

    this.state = {};
  }

  // componentDidMount() {
  //   AsyncStorage.removeItem('AuthPassword')
  // }

  welcometile = (colorTest = test) => {
    return (
      <View>
        style=
        {{
          color: 'white',
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: {colorTest},

          borderColor: 'rgb(170, 207, 202)',
          overflow: 'hidden',
        }}
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#3386D6'}}>
        <View style={{backgroundColor: '#3386D6'}}>
          <View style={styles.welcomeTextView}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeText1}>Easiest way to </Text>
            <Text style={styles.welcomeText1}>Mangage Your Business! </Text>
            <View style={{display: 'flex'}}>
              <Button
              style={{marginTop:50}}
                titleStyle={{color: '#3386D6', fontSize: 14}}
                buttonStyle={{
                  padding: 12,
                  backgroundColor: '#fff',
                  borderRadius: 25,
                }}
                containerStyle={{margin: 20}}
                //type="outline"
                title="Login"
                onPress={() => {
                  this.props.navigation.navigate('login');
                }}
              />
            </View>
            <View>
              <Image
                source={require('../../assets/images/promotion.jpeg')}
                style={{width: 250, height: 250, alignSelf: 'center',marginTop:30}}
              />
            </View>

            <View>
              <Image
                source={require('../../assets/images/promologo.png')}
                style={{
                  width: 180,
                  height: 100,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </View>

            {/* <Image
              source={require('/Users/apple/AlbertaAdmin/src/assets/images/Promologo.png')}
              style={{ width: 200, height: 60, alignSelf: 'center', marginTop: 20 }} /> */}

            <View>
              <Text style={styles.welcomeText1}>Follow Us!</Text>
            </View>
            <View style={styles.bottomView}>
              <View style={{marginLeft:10}}>
              <Facebook
                color="white"
                size={24}
                textstyle={{alignItems: 'center', alignContent: 'center'}}
              />
              </View>
              <View style={{marginLeft:10}}>
              <Instagram
                size={24}
                color="white"
                textstyle={{alignItems: 'center', alignContent: 'center'}}
              />
              </View>
              <View style={{marginLeft:10}}>
              <Twitter
                size={24}
                color="white"
                textstyle={{alignItems: 'center', alignContent: 'center'}}
              />
              </View>
               <View style={{marginLeft:10}}>
              <Youtube
                size={24}
                color="white"
                textstyle={{alignItems: 'center', alignContent: 'center'}}
              />
              </View>
               <View style={{marginLeft:10}}>
              <LinkedIn
                size={24}
                color="white"
                textstyle={{alignItems: 'center', alignContent: 'center'}}
              />
              </View>

              {/* <Icon name="facebook" size={30} color="white" style = {[styles.iconBackground,{backgroundColor:"#3b5998"}]}   />
              <Icon name="instagram" size={35} color="white" style = {[styles.iconBackground,{backgroundColor:"#8a3ab9"}]}/>
              <Icon name="twitter" size={35} color="white" style = {[styles.iconBackground,{backgroundColor:"#00acee"}]}/>
              <Icon name="youtube-play" size={35} color="white" style = {[styles.iconBackground,{backgroundColor:"#c4302b"}]}/>
              <Icon name="linkedin" size={35} color="white" style = {[styles.iconBackground],{backgroundColor:"#0e76a8"}}/> */}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  welcomeTextView: {
    marginTop: 120,
  },

  welcomeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 26,
    alignSelf: 'center',
    marginBottom: 5,
  },
  welcomeText1: {
    margin: 4,
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    // marginLeft:50
  },
  iconBackground: {
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(170, 207, 202)',
    overflow: 'hidden',
  },
});
