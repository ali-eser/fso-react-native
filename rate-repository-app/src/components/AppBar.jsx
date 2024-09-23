import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    backgroundColor: "#24292e",
    paddingBottom: Constants.statusBarHeight
  },
  text: {
    color: "whitesmoke"
  }
});

const AppBar = () => {
  return <View style={styles.container}>{
    <Pressable>
        <Text
        color={"primary"}
        fontWeight={"bold"}>
            Repositories
        </Text>
    </Pressable>

  }</View>;
};

export default AppBar;