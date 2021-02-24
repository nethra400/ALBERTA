/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import welcome from './src/Screens/login/welcome';
import 'react-native-gesture-handler';
import Splash from "./src/Screens/splashscreen";
import login from './src/Screens/login/login';
import Dashboard from "./src/Screens/Dashboard/dashboard";
import Container from "./src/Screens/container";

import saveUsername from "./src/Screens/login/usePassword";
import TabNav from "./src/Screens/Navigation/TabNav";
// import MatTabNav from "./src/Screens/Navigation/MatTabNav";
// import FingerPrint from "./src/Screens/login/faceId";
// import Logo from './src/assets/logo/Logo';
// import login from './src/Screens/Login/login';



const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      
        <Stack.Screen
       
          name="Home"
          component={welcome}
          options={{ title: null,
          // headerTitle: () => <Logo />,
        // headerStyle:{
        //   backgroundColor: '#3386D6',
        //   shadowColor: 'transparent',
        //   shadowRadius: 0,
        //   shadowOffset: {
        //     height: 0,
        // }
        // },
        // headerTintColor: '#3386D6',
        // headerTitleStyle: {
        //   fontWeight: null,
        // },
        headerShown:false
       }
        }
      
        />
        <Stack.Screen name="Splash" component={ Splash }
        options={{title:null,headerShown:false}} />
   
         <Stack.Screen name="login" component={login }
        options={{title:null,headerShown:false}} />
        <Stack.Screen name="saveUsername" component={ saveUsername }
        options={{title:null,headerShown:false}} />
      
       
        <Stack.Screen name="Container" component={Container} />
         <Stack.Screen name="Dashboard" component={TabNav}
        options={{title:null,headerShown:false}} />
        
       
        {/* <Stack.Screen name="FingerPrint" component={ FingerPrint }
        options={{title:null,headerShown:false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeScreen({ navigation }) {
  return (
    <Button
      title="Go to Jane's profile"
      // onPress={() =>
      //   navigation.navigate('login', { name: '' })
      // }
    />
  );
}





export default MyStack;