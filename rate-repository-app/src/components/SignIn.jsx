import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View  } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "grey",
        height: 50,
        margin: 10,
        padding: 10
    },
    pressable: {
        backgroundColor: "lightblue",
        borderRadius: 5,
        alignSelf: "center",
        width: "auto",
        padding: 10
    }
});

const onSubmit = (value) => {
    console.log(value);
};

const initialValues = {
    username: "",
    password: ""
};

const SignIn = () => {
    const formik = useFormik({
        initialValues,
        onSubmit
    });

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.textInput}
                placeholder="username"
                value=""
                onChangeText={formik.handleChange("username")}
            />
            <TextInput
                style={styles.textInput}
                secureTextEntry
                placeholder="password"
                value=""
                onChangeText={formik.handleChange("password")}
            />
            <Pressable 
                onPress={formik.handleSubmit}
                style={styles.pressable}
            >
                <Text>Sign in</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;