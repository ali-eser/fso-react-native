import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import { Pressable, StyleSheet, TextInput, View  } from "react-native";
import Text from "./Text";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(30)
    .required("You must set a username between 5 and 30 characters"),
  password: yup
    .string()
    .min(5)
    .max(30)
    .required("You must set a password between 5 and 30 characters"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Passwords should match")
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

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: ""
};

const SignUp = () => {
  const navigate = useNavigate();
  const [ signUp ] = useSignUp();
  const [ signIn ] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    const user = { username, password };
    console.log(user);
    try {
      await signUp({ user });
      await signIn({ username, password });
      navigate("/");
    } catch (err) {
      console.log("ONSUBMIT ERROR: ", err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View>
      <TextInput
        style={[styles.textInput, formik.errors.username ? styles.textInputError : styles.textInput]}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        placeholder={"Username"}
      />
      <TextInput
        style={[styles.textInput, formik.errors.password ? styles.textInputError : styles.textInput]}
        value={formik.values.password}
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        placeholder={"Password"}
      />
      <TextInput
        style={[styles.textInput, formik.errors.passwordConfirmation ? styles.textInputError : styles.textInput]}
        value={formik.values.passwordConfirmation}
        secureTextEntry
        onChangeText={formik.handleChange("passwordConfirmation")}
        placeholder={"Password again"}
      />
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.pressable}
      >
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  )
}

export default SignUp;