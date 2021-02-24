import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// Entypo.loadFont();

const Facebook = ({btmstyle, size, textstyle, onPress, color}) => {
  return (
   <View style={{height:35,width:35,backgroundColor:'blue',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity style={btmstyle} onPress={onPress}>
    <Icon name="facebook" size={size} color={color} style={textstyle} />
  </TouchableOpacity>
   </View>
  );
};

export default Facebook;
