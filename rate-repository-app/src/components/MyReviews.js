import { FlatList, Image, View, Button, StyleSheet } from 'react-native';
import useMe from "../hooks/useMe";
import Text from './Text';
import {useEffect} from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "whitesmoke"
  }
});

const  MyReviews = () => {
  const { meData, error, refetch, loading } = useMe(true);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const reviewNodes = meData
    ? meData.reviews.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item } ) =>
          <View>
            <Text fontWeight={"bold"}>{`${item.rating}`}</Text>
            <Text>{item.createdAt.slice(0,10)}</Text>
            <Text>{ item.text }</Text>
          </View>
        }/>
    </View>
  )
}

export default MyReviews;