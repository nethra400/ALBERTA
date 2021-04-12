
import React,{Component  } from "react";
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Items from "../Items";
import Reports from "../Reports";
import Dashboard from "../Dashboard/dashboard";
import Audit from "../Audit";
import Settings from "../Settings";
import LinearGradient from 'react-native-linear-gradient';
// import { white } from "react-native-paper/lib/typescript/styles/colors";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <LinearGradient 
       colors={['#16A0DB', '#16A0DB', '#16A0DB', '#286FB7', '#286FB7']}
         style={{ width: 70, height: 70, borderRadius: 35 }}>
          {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

 const TabNav = () => {


  return (
    <Tab.Navigator
        // activeColor="#3678a2"
        // inactiveColor="#ccc"
        initialRouteName = "Dashboard"
        barStyle={{
          backgroundColor: '#000',
          borderColor: '#ccc',
          borderWidth: 2,}}>
      <Tab.Screen
        name="Items"
        component={Items}
        options={{
          tabBarLabel: 'Items',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="wallet" color={color} size={26} />
            ),
          }}/>
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({color}) => (
            <FontAwesome name="pie-chart" color={color} size={26} />
            ),
          }}/>

<Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: () => (
            // <FontAwesome name="pie-chart" color={"#fff"} size={26} />
            <Image
            source={require('../../assets/images/Alberta_Logo1.png')}
            style={{width: '100%', height: 50, resizeMode: 'contain'}}
          />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />


      <Tab.Screen
        name="Audit"
        component={Audit}
        options={{
          tabBarLabel: 'Audit',
          tabBarIcon: ({color}) => (
            <FontAwesome name="book" color={color} size={26} />
            ),
          }}/>
       <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <FontAwesome name="user" color={color} size={26} />
            ),
          }}/> 
      </Tab.Navigator>
  );
}

export default TabNav