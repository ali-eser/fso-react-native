import {useMutation} from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repository, username, rating, review }) => {
    await mutate({
      variables: {
        ownerName: username,
        repositoryName: repository,
        rating: rating,
        review: review
      }
    });
  }

  return [createReview, result];
}

export default useReview;