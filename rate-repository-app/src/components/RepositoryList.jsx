import { FlatList, Image, View, StyleSheet } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

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
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repos } = useRepositories();

    const repositoryNodes = repos
        ? repos.edges.map(edge => edge.node)
        : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <View style={styles.view}>
            <View style={styles.imgDesc}>
                <Image source={{uri: item.ownerAvatarUrl}} style={styles.repoImg}/>
                <View>
                    <Text fontWeight={"bold"}>{ item.fullName }</Text>
                    <Text style={{ marginTop: 5 }}>{ item.description }</Text>
                    <Text style={styles.langText}>{ item.language }</Text>
                </View>
            </View>
            <View style={styles.horizontalView}>
                <View style={styles.stats}>
                    <Text fontWeight={"bold"}>{ formatter(item.stargazersCount) }</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.stats}>
                    <Text fontWeight={"bold"}>{ formatter(item.forksCount) }</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.stats}>
                    <Text fontWeight={"bold"}>{ formatter(item.reviewCount) }</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.stats}>
                    <Text fontWeight={"bold"}>{ item.ratingAverage }</Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View>
    }
    />
  );
};

export default RepositoryList;