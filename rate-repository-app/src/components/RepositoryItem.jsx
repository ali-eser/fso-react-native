import { FlatList, Image, View, Button, StyleSheet } from 'react-native';
import {useParams} from "react-router-native";
import useSingleRepo from "../hooks/useSingleRepo";
import Text from './Text';
import {useEffect, useState} from "react";

const formatter = (n) => {
  return Math.abs(n) > 999 ? (Math.abs(n) / 1000).toFixed(1) + "k" : n
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "whitesmoke"
  },
  view : {
    padding: 20,
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  langText: {
    backgroundColor: "lightblue",
    padding: 4,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "flex-start",
    marginTop: 5
  },
  stats: {
    alignItems: "center",
  },
  imgDesc: {
    flexDirection: "row",
    marginBottom: 20
  },
  repoImg: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12
  },
  button: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    alignSelf: "center",
    width: "auto",
    padding: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepoInfo = ({ singleRepo }) => {
  return (
    <View style={styles.view}>
      <View style={styles.imgDesc}>
        <Image source={{uri: singleRepo.ownerAvatarUrl}} style={styles.repoImg}/>
        <View>
          <Text fontWeight={"bold"}>{ singleRepo.fullName }</Text>
          <Text style={{ marginTop: 5 }}>{ singleRepo.description }</Text>
          <Text style={styles.langText}>{ singleRepo.language }</Text>
        </View>
      </View>
      <View style={styles.horizontalView}>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{ formatter(singleRepo.stargazersCount) }</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{ formatter(singleRepo.forksCount) }</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{ formatter(singleRepo.reviewCount) }</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight={"bold"}>{ singleRepo.ratingAverage }</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.button}>
          <Button
            title={"Open in GitHub"}
          />
        </View>
      </View>
    </View>
  )
}

const RepositoryItem = () => {
  let params = useParams();
  const [reviews, setReviews] = useState([]);

  const { singleRepo, fetchMore, loading, error } = useSingleRepo(params.id);

  const reviewNodes = singleRepo
    ? singleRepo.reviews.edges.map(edge => edge.node)
    : [];

  useEffect(() => {
    if (singleRepo) {
      const newReviews = singleRepo.reviews.edges.map((edge) => edge.node);
      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
    }
  }, [singleRepo]);

  const loadMoreReviews = () => {

    fetchMore({
      variables: {
        id: singleRepo.reviews.id,
        first: 10,
        after: singleRepo.reviews.cursor,
      },
    }).then(response => {console.log(response)})
  };

  if (loading || !singleRepo) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <View>
      <FlatList
        data={reviewNodes}
        onEndReached={loadMoreReviews}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={<RepoInfo singleRepo={singleRepo} />}
        renderItem={({ item } ) =>
          <View>
            <Text fontWeight={"bold"}>{`${item.rating} ${item.user.username}`}</Text>
            <Text>{item.createdAt.slice(0,10)}</Text>
            <Text>{ item.text }</Text>
          </View>
      }/>
    </View>
  )
}

export default RepositoryItem;