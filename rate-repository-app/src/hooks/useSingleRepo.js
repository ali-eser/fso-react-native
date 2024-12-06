import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ONE } from '../graphql/queries'

const useSingleRepo = (repoId) => {
  const [singleRepo, setSingleRepo] = useState();

  const { loading, error, data } = useQuery(GET_ONE, {
    fetchPolicy: 'network-only',
    variables: { id: repoId },
  });

  useEffect(() => {
    const fetchRepository= async () => {
      try {
        if (data?.repository) {
          setSingleRepo(data.repository);
        }
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };

    fetchRepository();
  }, [data]);

  return { singleRepo: singleRepo || null, error, loading };
}

export default useSingleRepo;