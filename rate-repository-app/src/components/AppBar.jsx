import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link, useNavigate } from 'react-router-native';

import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "space-around",
    paddingLeft: 10,
    backgroundColor: "#24292e",
    height: Constants.statusBarHeight * 1.2,
  },
  text: {
    color: "whitesmoke",
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center"
  }
});

const AppBar = () => {
  const navigate = useNavigate();
  const [meData] = useMe();
  const [signOut] = useSignOut();
  console.log("meData: ", meData);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
          <Pressable style={styles.pressable}>
              <Link to={"/"}>
                  <Text 
                    style={styles.text}
                    fontWeight={"bold"}
                  >
                    Repositories
                  </Text>
              </Link>
              {!meData && (
                <Link to={"/signin"}>
                  <Text 
                    style={styles.text}
                    fontWeight={"bold"}
                  >
                    Sign in
                  </Text>
                </Link>
              )}
          </Pressable>
          {meData && (
            <Pressable 
              style={styles.pressable}
              onPress={handleSignOut}
            >
              <Text 
                style={styles.text}
                fontWeight={"bold"}
              >
                Sign out
              </Text>
            </Pressable>

          )}
      </ScrollView>
    </View>
  );
};

export default AppBar;