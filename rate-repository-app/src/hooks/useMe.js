import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_ME } from "../graphql/queries";

const useMe = (includeReviews) => {
  const [meData, setMeData] = useState(null);

  const { error, data, loading, refetch } = useQuery(GET_ME, {
    variables: {
      includeReviews: includeReviews
    },
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

  return { meData, loading, error, refetch };
};

export default useMe;
