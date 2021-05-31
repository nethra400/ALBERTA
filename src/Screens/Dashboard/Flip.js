import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Image
} from "react-native";
import AntDesignn from "react-native-vector-icons/FontAwesome";
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid
} from "react-native-youtube";

export default class ReactNativeYouTubeExample extends React.Component {
//   static navigationOptions = {
//     Title: "Home",
//     headerTitle: (
//       <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
//         <Image
//           source={require("../images/poslogo.jpg")}
//           style={{
//             height: 80,
//             width: 80,
//             marginRight: 20,
//             resizeMode: "contain"
//           }}
//         />
//       </View>
//     )
//   };

  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null
  };

  render() {
    const { myUrl } = this.props.route.params;
    const myurl = myUrl;
    // const myurl = navigation.getParam("myUrl", "");
    return (
      <View style={styles.Maincontainer}>
        <View style={styles.container}>
          <YouTube
            videoId={myurl}
            play={this.state.isPlaying}
            hidden={false}
            fullscreen={true}
            apiKey="AIzaSyACYsi89__kdN2FzZ3XJHrvlmKMAqZ3oug"
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{
              alignSelf: "stretch",
              height: 250,
              backgroundColor: "black",
              margin: 10
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff"
  },
  Maincontainer: {
    flex: 1,

    backgroundColor: "#fff"
  }
});