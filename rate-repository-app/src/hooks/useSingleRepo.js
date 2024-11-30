import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import {GET_ONE} from '../graphql/queries'

const useSingleRepo = (id) => {
  const [singleRepo, setSingleRepo] = useState();

  const { loading, error, data } = useQuery(GET_ONE, {
    fetchPolicy: "cache-and-network",
    variables: { id }
  });

  try {
    if (!error && !loading && data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}

export default useSingleRepo;