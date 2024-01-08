import { gql } from '@apollo/client';
// NOTE: For some reason using the "last" argument for the search query works for
// both forward and backward pagination, but using the "first" argument does not.
const USER_REPOS_QUERY = gql`
  query UserReposQuery(
    $query: String!
    $nextCursor: String
    $prevCursor: String
    $resultsPerPage: Int!
  ) {
    search(
      query: $query
      type: REPOSITORY
      last: $resultsPerPage
      after: $nextCursor
      before: $prevCursor
    ) {
      totalPages(resultsPerPage: $resultsPerPage) @client
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            createdAt
            name
            description
            pushedAt
            forkCount
            stargazerCount
            licenseInfo {
              name
            }
            primaryLanguage {
              id
              name
              color
            }
            url
            languages(first: 10) {
              totalCount
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                id
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;
export { USER_REPOS_QUERY };
