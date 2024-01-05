import { gql } from '@apollo/client';

const USER_SEARCH_QUERY = gql`
  query UserSearchQuery(
    $query: String!
    $cursor: String
    $resultsPerPage: Int!
  ) {
    search(query: $query, type: USER, first: $resultsPerPage, after: $cursor) {
      totalPages(resultsPerPage: $resultsPerPage) @client
      userCount
      pageInfo {
        startCursor
        hasNextPage
        hasPreviousPage
        endCursor
        __typename
      }
      edges {
        node {
          ... on User {
            id
            avatarUrl
            bio
            followers {
              totalCount
              __typename
            }
            location
            login
            name
            repositories {
              totalCount
              __typename
            }
            __typename
          }
        }
      }
      __typename
    }
  }
`;

export { USER_SEARCH_QUERY };
