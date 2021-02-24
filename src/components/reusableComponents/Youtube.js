import React from 'react';
import {Text, TouchableOpacity,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// Entypo.loadFont();

const Youtube = ({btmstyle, size,textstyle,onPress,color}) => {
  return (
    <View style={{height:35,width:35,backgroundColor:'#c4302b',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
    <TouchableOpacity style={btmstyle} onPress={onPress}>
      <Icon name="youtube-play" size={size} color={color} style={textstyle} />
    </TouchableOpacity>
    </View>
  );
};
export default Youtube;