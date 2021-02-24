
import React from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { Slider } from 'react-native-elements';
//import Netinfo from './NetInfo'


export default class Splash extends React.Component {

    componentDidMount() {

    
        AsyncStorage.getItem('AUTH').then(
            AUTH => {



                if (AUTH == '1') {



                    AsyncStorage.getItem('AuthPassword').then(
                        save => {
                            if (save) {

                                // this.props.navigation.navigate('FingerPrint')
                                // alert("hello")
                                // this.props.navigation.navigate('login');
                            } else {
                                this.props.navigation.navigate('login');
                            }
                        });

                } else {
                    AsyncStorage.getItem('savedPassword').then(
                        save => {
                            if (save) {
                                this.props.navigation.navigate('saveUsername')

                            } else {
                                this.props.navigation.navigate('login');
                                //alert('hi')
                            }
                        });
                }
            }
        )

    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <ActivityIndicator size="large" color="blue" />

            </View>
        )
    }
}