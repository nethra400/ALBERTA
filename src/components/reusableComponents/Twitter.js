import React from 'react';
import {Text, TouchableOpacity,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// Entypo.loadFont();

const Twitter = ({btmstyle, size,textstyle,onPress,color}) => {
  return (
    <View style={{height:35,width:35,backgroundColor:'#00acee',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
    <TouchableOpacity style={btmstyle} onPress={onPress}>
      <Icon name="twitter" size={size} color={color} style={textstyle} />
    </TouchableOpacity>
    </View>
  );
};
export default Twitter;