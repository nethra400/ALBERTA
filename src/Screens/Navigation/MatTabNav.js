
import React,{Component  } from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Items from "../Items";
import Reports from "../Reports";
import Dashboard from "../Dashboard/dashboard";
import Audit from "../Audit";
import Settings from "../Settings";

const Tab = createMaterialBottomTabNavigator();

const MatTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
    //   activeColor="#e91e63"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Items',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="wallet" color='black' size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-pie" color='black' size={26}  />
          ),
        }}
      />
      <Tab.Screen
        name="Audit"
        component={Audit}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color='black' size={26}  />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color='black' size={26}  />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

export default MatTabNav