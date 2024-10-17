import { useFormik } from "formik";
import { Text, TextInput, View, Pressable } from "react-native";
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("You must set a username"),
  password: yup
    .string()
    .required("You must set a password")
});

const SignInContainer = () => {

  const onSubmit = (values) => {
    const { username, password } = values;
    onSubmit({ username, password });
  };

  const initialValues = {
    username: "",
    password: ""
  };

  const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit
  });

  return (
    <View>
      <TextInput
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "#d73a4a", marginLeft: 10 }}>{formik.errors.password}</Text>
      )}
      <Pressable
        onPress={formik.onSubmit}
      >
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
}

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      render(<SignInContainer />)

      fireEvent.changeText(screen.getByPlaceholderText('username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});