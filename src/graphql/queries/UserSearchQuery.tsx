import { gql } from "@apollo/client";

const USER_SEARCH_QUERY = gql`
  query UserSearchQuery($query: String!, $cursor: String) {
    search(query: $query, type: USER, first: 10, after: $cursor) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      userCount
      edges {
        node {
          ... on User {
            id
            avatarUrl
            bio
            email
            pronouns
            websiteUrl
            url
            company
            followers {
              totalCount
            }
            location
            login
            name
            repositories {
              totalCount
            }
            status {
              message
              emoji
            }
            socialAccounts(first: 20) {
              nodes {
                displayName
                provider
                url
              }
            }
          }
        }
      }
    }
  }
`;

export { USER_SEARCH_QUERY };
