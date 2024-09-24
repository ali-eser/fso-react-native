import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View  } from "react-native";
import Text from "./Text";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required("You must set a username"),
    password: yup
        .string()
        .required("You must set a password")
});

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "grey",
        height: 50,
        margin: 10,
        padding: 10
    },
    textInputError: {
        borderColor: "#d73a4a"
    },
    pressable: {
        backgroundColor: "lightblue",
        borderRadius: 5,
        alignSelf: "center",
        width: "auto",
        padding: 10
    }
});

const onSubmit = (value) => {
    console.log(value);
};

const initialValues = {
    username: "",
    password: ""
};

const SignIn = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <View style={styles.view}>
            <TextInput
                style={[styles.textInput, formik.errors.username ? styles.textInputError : styles.textInput]}
                placeholder="username"
                value={formik.values.username}
                onChangeText={formik.handleChange("username")}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: "#d73a4a", marginLeft: 10 }}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={[styles.textInput, formik.errors.password ? styles.textInputError : styles.textInput]}
                secureTextEntry
                placeholder="password"
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: "#d73a4a", marginLeft: 10 }}>{formik.errors.password}</Text>
            )}
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