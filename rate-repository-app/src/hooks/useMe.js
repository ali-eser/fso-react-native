import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_ME } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useMe = () => {
  const authStorage = useAuthStorage();
  const [meData, setMeData] = useState(null);
  const [currentAccessToken, setCurrentAccessToken] = useState(null);

  const fetchToken = async () => {
    const accessToken = await authStorage.getAccessToken();
    setCurrentAccessToken(accessToken);
  };

  const { error, data } = useQuery(GET_ME, {
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    fetchToken();
    if (data) {
      setMeData(data.me);
    }

    if (error) {
      console.log(error);
    }
  }, [data, error, currentAccessToken]);

  return [meData];
};

export default useMe;
 