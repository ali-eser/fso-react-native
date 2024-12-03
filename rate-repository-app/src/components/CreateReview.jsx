import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import { Pressable, StyleSheet, TextInput, View  } from "react-native";
import Text from "./Text";
import * as yup from "yup";

import useReview from "../hooks/useReview";

const validationSchema = yup.object().shape({
  repository: yup
    .string()
    .required("You must specify the name of the repository"),
  username: yup
    .string()
    .required("You must specify the owner of the repository"),
  rating: yup
    .number()
    .required("You must enter an integer between 0 and 100")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating cannot exceed 100"),
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
  const navigate = useNavigate();
  const [ createReview ] = useReview();

  const onSubmit = async (values) => {
    const { repository, username, rating, review } = values;
    try {
      const { data } = await createReview({ repository, username, rating: parseInt(rating), review });
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
    <View style={styles.view}>
      <TextInput
        style={[styles.textInput, formik.errors.repository ? styles.textInputError : styles.textInput]}
        value={formik.values.repository}
        onChangeText={formik.handleChange("repository")}
        placeholder={"Repository name"}
      />
      <TextInput
        style={[styles.textInput, formik.errors.username ? styles.textInputError : styles.textInput]}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        placeholder={"Repository owner name"}
      />
      <TextInput
        style={[styles.textInput, formik.errors.rating ? styles.textInputError : styles.textInput]}
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        placeholder={"Rating between 0 and 100"}
      />
      <TextInput
        style={styles.textInput}
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        multiline={true}
        placeholder={"Review"}
      />
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.pressable}
      >
        <Text>Create Review</Text>
      </Pressable>
    </View>
  )
}

export default CreateReview;