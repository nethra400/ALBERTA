import React from 'react';
import {Text, TouchableOpacity,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// Entypo.loadFont();

const Instagram = ({btmstyle,size, textstyle,onPress,color}) => {
  return (
    <View style={{height:35,width:35,backgroundColor:'#8a3ab9',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
    <TouchableOpacity style={btmstyle} onPress={onPress}>
      <Icon name="instagram" size={size} color={color} style={textstyle} />
    </TouchableOpacity>
    </View>
  );
};
export default Instagram;