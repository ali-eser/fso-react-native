import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_ME } from "../graphql/queries";



const useMe = (includeReviews) => {
  const [meData, setMeData] = useState();

  const { error, data, loading, refetch } = useQuery(GET_ME, {
    variables: {
      includeReviews: includeReviews
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (data?.me) {
          setMeData(data.me);
        }
      } catch (err) {
        console.error("Error fetching me data:", err);
      }
    }

    fetchMe();
  }, [data]);

  return { meData: meData || null, loading, error, refetch };
};

export default useMe;
