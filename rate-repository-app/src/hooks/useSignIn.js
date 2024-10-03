import { useMutation } from "@apollo/client";
import { AUTHENTICATION } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATION);

  const signIn = async ({ username, password }) => {
    mutate({
      variables: {
        username: username,
        password: password
      }
    });
  };


  return [signIn, result];
};

export default useSignIn;