import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ONE } from '../graphql/queries'

const useSingleRepo = (repoId) => {
  const [singleRepo, setSingleRepo] = useState();

  const { loading, error, data } = useQuery(GET_ONE, {
    fetchPolicy: 'network-only',
    variables: { id: repoId },
  });

  const fetchRepository= async () => {
    if (error) {
      console.log(error);
    }
    setSingleRepo(data.repository);
  };

  useEffect(() => {
    fetchRepository();
  }, [repoId, loading, singleRepo]);

  return { singleRepo, error, loading };
}

export default useSingleRepo;