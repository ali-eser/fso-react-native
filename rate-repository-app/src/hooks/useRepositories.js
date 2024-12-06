import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, direction, keyword) => {

  const [repos, setRepos] = useState();

  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: order,
      orderDirection: direction,
      searchKeyword: keyword
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        if (data?.repositories) {
          setRepos(data.repositories);
        }
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };

    fetchRepositories();
  }, [data]);

  return { repos: repos || null, loading, error, refetch };
};

export default useRepositories;