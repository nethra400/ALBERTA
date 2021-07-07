import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


class MyWebComponent extends Component {
  render() {
    const { myUrl } = this.props.route.params;
    return <WebView source={{ uri: myUrl }} />;
  }
}

export default MyWebComponent