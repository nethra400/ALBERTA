// import React, { Component } from 'react';
// import {
//     Alert,
//     StyleSheet,
//     Text,
//     TouchableHighlight,
//     View,

// } from 'react-native';
// import TouchID from "react-native-touch-id";
// import RNExitApp from 'react-native-exit-app';
// export default class FingerPrint extends Component {
//     constructor() {
//         super()
//         this.state = {
//             biometryType: null
//         };
//     }
//     componentDidMount() {
//         this.pressHandler()
//     }
//     pressHandler() {
//         TouchID.authenticate('', FunObject)
//             .then(success => {
//                 { this.props.navigation.navigate('Set') }
//             })
//             .catch(error => {
//                 Alert.alert(
//                     "",
//                     "Do want to exit the app ?",
//                     [
//                         {
//                             text: "NO",
//                             onPress: () => this.pressHandler(),
//                             style: "NO"
//                         },
//                         {
//                             text: "YES",
//                             onPress: () => RNExitApp.exitApp()
//                         }
//                     ],
//                     {
//                         cancelable: false
//                     }
//                 );

//             });
//     }



//     render() {
//         return (
//             <View>

//             </View>
//         );
//     }
// };

// const FunObject = {
//     title: 'Touch-Id Authentication Required',
//     imageColor: '#e00606',
//     imageErrorColor: '#ff0000',
//     sensorDescription: 'Touch sensor',
//     sensorErrorDescription: 'Failed',
//     cancelText: '',
//     fallbackLabel: '',
//     unifiedErrors: false,
//     passcodeFallback: true,

// };

