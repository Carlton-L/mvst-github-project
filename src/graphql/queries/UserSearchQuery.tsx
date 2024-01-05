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
      }
      edges {
        node {
          ... on User {
            id
            avatarUrl
            bio
            followers {
              totalCount
            }
            location
            login
            name
            repositories {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export { USER_SEARCH_QUERY };
