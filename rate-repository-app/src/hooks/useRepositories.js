import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repos, setRepos] = useState();

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network"
  });

  const fetchRepositories = async () => {
    if (error) {
			console.log(error);
		}
    setRepos(data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repos, loading, refetch: fetchRepositories };
};

export default useRepositories;