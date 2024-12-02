import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import { Pressable, StyleSheet, TextInput, View  } from "react-native";
import Text from "./Text";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  repository: yup
    .string()
    .required("You must specify the name of the repository"),
  username: yup
    .string()
    .required("You must specify the owner of the repository"),
  rating: yup
    .number()
    .required("You must enter an integer between 0 and 100"),
  review: yup
    .string()
    .optional()
});

const initialValues = {
  repository: "",
  username: "",
  rating: 0,
  review: ""
};


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

const CreateReview = () => {
  const formik = useFormik({
    initialValues,
    validationSchema
  });

  return (
    <View style={styles.view}>
      <TextInput
        style={[styles.textInput, formik.errors.repository ? styles.textInputError : styles.textInput]}
        placeholder={"Repository owner name"}
      />
      <TextInput
        style={[styles.textInput, formik.errors.username ? styles.textInputError : styles.textInput]}
        placeholder={"Repository name"}
      />
      <TextInput
        style={[styles.textInput, formik.errors.rating ? styles.textInputError : styles.textInput]}
        placeholder={"Rating between 0 and 100"}
      />
      <TextInput
        style={styles.textInput}
        multiline={true}
        placeholder={"Review"}
      />
    </View>
  )
}

export default CreateReview;