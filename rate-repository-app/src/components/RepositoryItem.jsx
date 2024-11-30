import { Image, View, StyleSheet } from 'react-native';
import useSingleRepo from "../hooks/useSingleRepo";
import Text from './Text';

const RepositoryItem = () => {
  const data = useSingleRepo();

  return (
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
  )
}