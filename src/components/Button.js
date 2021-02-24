import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
// import COLORS from '../../consts/colors';

const PrimaryButton = ({color ,title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SecondaryButton = props => {
    
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <View style={{...style.btnContainer, ...{backgroundColor: props.bgcolor}}}>
        <Text style={{...style.title, ...{color: props.titlecolor}}}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};



const style = StyleSheet.create({
  title: {color: "#fff", fontSize: 18},
  btnContainer: {
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {PrimaryButton, SecondaryButton};