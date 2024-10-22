import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_ME } from "../graphql/queries";

const useMe = () => {
  const [meData, setMeData] = useState(null);

  const { error, data } = useQuery(GET_ME, {
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (data) {
      setMeData(data.me);
    }

    if (error) {
      console.log(error);
    }
  }, [data, error]);

  return [meData];
};

export default useMe;
