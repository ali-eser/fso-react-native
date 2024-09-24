import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "space-around",
    paddingLeft: 10,
    backgroundColor: "#24292e",
    height: Constants.statusBarHeight * 1.2
  },
  text: {
    color: "whitesmoke"
  }
});

const AppBar = () => {
  return <View style={styles.container}>{
    <Pressable>
        <Text 
        style={styles.text}
        fontWeight={"bold"}
        >
            Repositories
        </Text>
    </Pressable>

  }</View>;
};

export default AppBar;