import { FlatList, Text, View, Image } from "react-native";
import { render, screen, within } from '@testing-library/react-native';

const RepositoryItem = ({ repositories }) => {
  const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

  return (
    <FlatList data={repositoryNodes}
    renderItem={({ item }) => 
      <View testID="repositoryItem">
        <View>
          <View>
              <Image source={{uri: item.uri}}/>
              <View>
                  <Text>{ item.fullName }</Text>
                  <Text>{ item.description }</Text>
                  <Text>{ item.language }</Text>
              </View>
          </View>
          <View>
              <View>
                  <Text fontWeight={"bold"}>{ item.stargazersCount }</Text>
                  <Text>Stars</Text>
              </View>
              <View>
                  <Text fontWeight={"bold"}>{ item.forksCount }</Text>
                  <Text>Forks</Text>
              </View>
              <View>
                  <Text fontWeight={"bold"}>{ item.reviewCount }</Text>
                  <Text>Reviews</Text>
              </View>
              <View>
                  <Text fontWeight={"bold"}>{ item.ratingAverage }</Text>
                  <Text>Rating</Text>
              </View>
          </View>
        </View>
      </View>
    }
    />
  )
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      render(<RepositoryItem repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      expect(within(firstRepositoryItem).getByText('jaredpalmer/formik')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('async-library/react-async')).toBeDefined();
    });
  });
});