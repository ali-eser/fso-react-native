import {useMutation} from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ user }) => {
    await mutate({
      variables: {
        user
      }
    });
  }

  return [signUp, result];
}

export default useSignUp;