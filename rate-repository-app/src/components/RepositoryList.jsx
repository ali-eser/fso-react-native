import {FlatList, Image, View, StyleSheet, Pressable, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Link } from 'react-router-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import {useState, useEffect, useRef} from "react";

const formatter = (n) => {
    return Math.abs(n) > 999 ? (Math.abs(n) / 1000).toFixed(1) + "k" : n
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "whitesmoke"
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    height: 50,
    margin: 10,
    padding: 10
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

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup
  }, [value, delay]);

  return debouncedValue;
};

const RepositoryList = () => {
  const [order, setOrder] = useState("CREATED_AT");
  const [direction, setDirection] = useState("DESC");
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const { repos, loading, error, refetch } = useRepositories(order, direction, debouncedKeyword);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Re-focus TextInput after re-render
    }
  });

  const repositoryNodes = repos
    ? repos.edges.map(edge => edge.node)
    : [];

  const onSearch = async (value) => {
    setKeyword(value);
  }

  if (error) return <Text>Error: {error}</Text>;

  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
        <>
          <TextInput
            ref={inputRef}
            value={keyword}
            placeholder="Search"
            onChangeText={onSearch}
            style={{ padding: 8, borderColor: "gray", borderWidth: 1 }}
          />
          <Picker
            selectedValue={order}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === "latest") {
                setOrder("CREATED_AT");
                setDirection("DESC");
              } else if (itemValue === "highest") {
                setOrder("RATING_AVERAGE");
                setDirection("DESC");
              } else if (itemValue === "lowest") {
                setOrder("RATING_AVERAGE");
                setDirection("ASC");
              }
            }
            }>
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest" />
            <Picker.Item label="Lowest rated repositories" value="lowest" />
          </Picker>
        </>
        }
        ListEmptyComponent={() => <Text>No repositories found</Text>}
        renderItem={({ item }) =>
          <Pressable>
            <Link to={`repo/${item.id}`}>
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
            </Link>
          </Pressable>
        }
      />
    </>
  );
};

export default RepositoryList;