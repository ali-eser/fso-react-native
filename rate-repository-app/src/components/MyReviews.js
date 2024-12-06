import {FlatList, Image, View, Button, StyleSheet, Pressable} from 'react-native';
import useMe from "../hooks/useMe";
import Text from './Text';
import {useEffect} from "react";
import {useNavigate} from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "whitesmoke"
  },
  view : {
    padding: 20,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  }
});

const  MyReviews = () => {
  const { meData, error, refetch, loading } = useMe(true);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const reviewNodes = meData
    ? meData.reviews.edges.map(edge => edge.node)
    : [];

  console.log(reviewNodes.repository);
  const ItemSeparator = () => <View style={styles.separator} />;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item } ) =>
          <View style={styles.view}>
            <Text fontWeight={"bold"}>{`${item.repository.id}`}</Text>
            <Text fontWeight={"bold"}>{`${item.rating}`}</Text>
            <Text>{item.createdAt.slice(0,10)}</Text>
            <Text>{ item.text }</Text>
            <View style={styles.buttonView}>
              <Button
                title={"View repository"}
                color={"blue"}
                onPress={() => navigate(`/repo/${item.repository.id}`)}
              />
              <Button
                title={"Delete repository"}
                color={"red"}
                onPress={() => navigate(`/repo/${item.repository.id}`)}
              />
            </View>
          </View>
        }/>
    </View>
  )
}

export default MyReviews;