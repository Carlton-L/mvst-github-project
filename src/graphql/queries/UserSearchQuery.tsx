import { gql } from "@apollo/client";

const USER_SEARCH_QUERY = gql`
  query UserSearchQuery($query: String!, $cursor: String) {
    search(query: $query, type: USER, first: 10, after: $cursor) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        __typename
      }
      userCount
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
