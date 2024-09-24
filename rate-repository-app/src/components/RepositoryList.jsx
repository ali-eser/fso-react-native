import { FlatList, Image, View, StyleSheet } from 'react-native';
import Text from './Text';

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

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
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