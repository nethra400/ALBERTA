import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default class Logo extends Component {

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require('../images/poslogo.jpg')}
                    style={styles.imageView}
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
        imageView: {
        width: 100,
        height: 40
    }
})