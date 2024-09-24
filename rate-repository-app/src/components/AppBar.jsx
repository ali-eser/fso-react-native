import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

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
        <Link to={"/"}>
            <Text 
            style={styles.text}
            fontWeight={"bold"}
            >
                Repositories
            </Text>
        </Link>
        <Link to={"/signin"}>
            <Text 
            style={styles.text}
            fontWeight={"bold"}
            >
                Sign in
            </Text>
        </Link>
    </Pressable>

  }</View>;
};

export default AppBar;