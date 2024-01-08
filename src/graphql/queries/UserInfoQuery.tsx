import { gql } from '@apollo/client';

const USER_INFO_QUERY = gql`
  query UserInfoQuery($user: String!) {
    user(login: $user) {
      id
      login
      name
      avatarUrl
      bio
      email
      followers {
        totalCount
      }
      repositories {
        totalCount
      }
      pronouns
      location
      websiteUrl
      url
      status {
        id
        message
        emojiHTML
      }
      company
      socialAccounts(first: 20) {
        nodes {
          displayName
          provider
          url
        }
      }
    }
  }
`;

export { USER_INFO_QUERY };
