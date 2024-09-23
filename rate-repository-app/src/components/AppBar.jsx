import { View, StyleSheet } from 'react-native';
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
    <Text
    color={"primary"}
    fontWeight={"bold"}>
        Repositories
    </Text>
  }</View>;
};

export default AppBar;