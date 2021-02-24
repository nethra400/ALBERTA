
import React,{Component  } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Items from "../Items";
import Reports from "../Reports";
import Dashboard from "../Dashboard/dashboard";
import Audit from "../Audit";
import Settings from "../Settings";

const Tab = createBottomTabNavigator();

 const TabNav = () => {
  return (
    <Tab.Navigator
        // activeColor="#3678a2"
        // inactiveColor="#ccc"
        barStyle={{
          backgroundColor: '#000',
          borderColor: '#ccc',
          borderWidth: 2,}}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
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