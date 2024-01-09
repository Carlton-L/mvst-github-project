# MVST Github User Repository Browser

GitHub user search utility and repository browser - search for a user and filter through their repositories by search query and/or primary language.

## :rocket: How to Run

`npm install`
`npm run dev`

### You will need to un-comment the following line in `.env` and replace with your own personal access token:

`VITE_API_TOKEN=<YOUR PERSONAL ACCESS TOKEN>`

Note that your personal access token does not require any permissions.

## :space_invader: Tech Stack

<details open>
  <summary>Frontend</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js / Javascript</a></li>
    <li><a href="https://emotion.sh/">TailwindCSS / CSS Library</a></li>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
    <li><a href="https://www.apollographql.com/">Apollo / GraphQL</a></li>
    <li><a href="https://www.figma.com/">Figma / UI/UX Prototyping</a></li>
  </ul>
</details>

## :calendar: Future Improvements

1. Deploy - Deploy page to Netlify or Heroku
3. Testing - Add a testing library such as Jest
4. Storybook - Add Storybook for component library management
5. Github user login - Incorporate GitHub user login to fetch personalized token (requires backend)
6. Astro - Try integrating Astro into the project

## :beetle: Bugs and TODOs

1. Add missing GraphQL query types
2. Handle error case for Organization returned instead of User from search query
3. Create React components for SVG elements instead of using inline SVGs
4. Update navigatePage function in SearchResults.tsx to use cursor based reverse pagination
5. Fix Url for user webpage in UserPage.tsx for cases where url does not include "https://"
6. Fix repository count including both public and private repositories but repository browser displays only public repositories
7. Create components for repository search field and language filter
8. Create type for socialProviderIcon.tsx
9. Add mocks for all queries in mock version of main.tsx
10. Pagination component does not display ellipses correctly when there are only 3 pages and the user is on the first page
