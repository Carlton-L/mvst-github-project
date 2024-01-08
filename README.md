# MVST Github User Repository Browser

GitHub user search utility and repository browser - search for a user and filter through their repositories by search query and/or primary language.

## How to Run

`npm install`
`npm run dev`

## Future Improvements

1. Github user login - currently the app uses my own personal access token
2. Testing - there is currently no testing library
3. Storybook - Storybook can be used for component library

## Bugs and TOOOs

1. Add GraphQL types
2. Handle error case for Organization returned instead of User from search query
3. Update navigatePage function in SearchResults.tsx to use cursor based reverse pagination
4. Fix Url for user webpage in UserPage.tsx for cases where url does not include "https://"
5. Fix repository count including both public and private repositories but repository browser displays only public repositories
6. Create components for repository search field and language filter
7. Create type for socialProviderIcon.tsx
8. Add mocks for all queries in mock version of main.tsx
