import { useMutation } from "@apollo/client";
import { AUTHENTICATION } from "../graphql/mutations";

import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATION);

  const signIn = async ({ username, password }) => {
    const {data} = await mutate({
      variables: {
        username: username,
        password: password
      }
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };


  return [signIn, result];
};

export default useSignIn;