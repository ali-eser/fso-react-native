import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import { Pressable, StyleSheet, TextInput, View  } from "react-native";
import Text from "./Text";
import * as yup from "yup";

const CreateReview = () => {
  return (
    <View>
      <TextInput
        placeholder={"Repository owner name"}
      />
      <TextInput
        placeholder={"Repository name"}
      />
      <TextInput
        placeholder={"Rating between 0 and 100"}
      />
      <TextInput
        placeholder={"Review"}
      />
    </View>
  )
}

export default CreateReview;