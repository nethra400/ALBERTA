import {StyleSheet, View, Text,AsyncStorage,BackHandler,Alert,StatusBar} from 'react-native';
import React, {Component} from 'react';
import Dashboard from "../Screens/Dashboard/dashboard";


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default class Container extends Component {
 render() {
    return (
      <Tab.Navigator
        BackgroundColor="red"
        activeColor="#3678a2"
        inactiveColor="#ccc"
        barStyle={{
          backgroundColor: '#000',
          borderColor: '#ccc',
          borderWidth: 2,}}>
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Item',
            tabBarIcon: ({color}) => (
              // <MaterialCommunityIcons name="star-four-points-outline" color={color} size={26} />
              <FontAwesome name="search" color={color} size={26} />
            ),
          }}/>
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({color}) => (
            <FontAwesome name="search" color={color} size={26} />
            ),
          }}/>
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Audit',
          tabBarIcon: ({color}) => (
            <FontAwesome name="ticket" color={color} size={26} />
            ),
          }}/>
       <Tab.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <FontAwesome name="dollar" color={color} size={26} />
            ),
          }}/> 
      </Tab.Navigator>
    );
  }
}