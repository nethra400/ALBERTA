import React, {Component} from 'react';
import {View, Text, SafeAreaView, ImageBackground,StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Audit extends Component {

    state={
        data:[{
            date:'00.00.0000 00:00AM',
            label:"No Sale Register:[101]"
        },
        {
            date:'00.00.0000 00:00AM',
            label:"No Sale Register:[101]"
        },
        {
            date:'00.00.0000 00:00AM',
            label:"No Sale Register:[101]"
        },
        {
            date:'00.00.0000 00:00AM',
            label:"No Sale Register:[101]"
        }]
    }
  render() {
    return (
      <SafeAreaView>
        <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../assets/images/header.jpeg')}
            style={{position: 'relative', height: 140, paddingTop: 20}}>
                <Text style={{color:'#fff',paddingHorizontal:40}}>LOSS PREVENTION</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent:'center'
              }}>
              <TouchableOpacity style={styles.btncontainer}>
                <Text style={styles.btntext}>No Sale</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer}>
                <Text style={styles.btntext}>Void</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer}>
                <Text style={styles.btntext}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent:'center'
              }}>
              <TouchableOpacity style={styles.btncontainer}>
                <Text style={styles.btntext}>Non Scanned</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer}>
                <Text style={styles.btntext}>High Total</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btncontainer}>
                <Text style={styles.btntext}>Discounted</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View>
{
    this.state.data.map(val=>{
        return(

        <TouchableOpacity>
        <ListItem
          bottomDivider
          containerStyle={{
            borderRadius: 35,
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <View >
            {/* <FontAwesome name="circle" color={'#3386D6'} size={32} /> */}
            <Text
              style={{
                fontSize: 12,
                // paddingVertical: 2,
                paddingHorizontal: 16,
              }}>
              {val.date}
            </Text>
            <Text
              style={{
                fontSize: 16,
                // paddingVertical: 2,
                paddingHorizontal: 16,
              }}>
              {val.label}
            </Text>
          </View>
        </ListItem>
      </TouchableOpacity>
        )
    })
}
          {/* <Text>This is Audit Page</Text> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    btncontainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 30,
        width:100,
        // marginHorizontal:"1%",
        // marginStart: "28%",
        // width: "28%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 12,
        //padding: 5,
      },
      btntext: {
        //textAlign : 'center',
        fontSize: 14,
        alignItems: "center",
        color: "#000",
      },

})
