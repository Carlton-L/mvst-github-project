import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Root from "./routes/Root.tsx";
import ErrorPage from "./error-page.tsx";
import SearchResults from "./pages/SearchResults.tsx";

import "./index.css";

import { MockedProvider } from "@apollo/client/testing";
import { USER_SEARCH_QUERY } from "./graphql/queries/UserSearchQuery.tsx";

const mocks = [
  {
    request: {
      query: USER_SEARCH_QUERY,
      variables: {
        query: "carlton",
      },
      result: {
        data: {
          search: {
            pageInfo: {
              startCursor: "Y3Vyc29yOjE=",
              hasNextPage: true,
              endCursor: "Y3Vyc29yOjEw",
            },
            userCount: 1086,
            edges: [
              {
                node: {
                  id: "MDQ6VXNlcjg2NTc3Nw==",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/865777?v=4",
                  bio: null,
                  followers: {
                    totalCount: 0,
                  },
                  location: null,
                  login: "carlton",
                  name: null,
                  repositories: {
                    totalCount: 0,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjY0Njg2",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/64686?v=4",
                  bio: "Maintainer of things Django 🦄",
                  followers: {
                    totalCount: 1532,
                  },
                  location: "Spain",
                  login: "carltongibson",
                  name: "Carlton Gibson",
                  repositories: {
                    totalCount: 119,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjY0MTI3Njgx",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/64127681?u=4146290bf5262772a6cfbbfd977fd4d51822e03a&v=4",
                  bio: "",
                  followers: {
                    totalCount: 72,
                  },
                  location: null,
                  login: "notcarlton",
                  name: "carlton",
                  repositories: {
                    totalCount: 36,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjE1NjI3NDc2",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/15627476?u=8e08d0fb9f2f7a168a32fbc81d0fba84f317faca&v=4",
                  bio: 'The journey to a great project begins with "Hello World!"',
                  followers: {
                    totalCount: 53,
                  },
                  location: "Kenya",
                  login: "CarltonK",
                  name: "Mark Carlton",
                  repositories: {
                    totalCount: 107,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjI4MzAzNzk=",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/2830379?u=344979d650c10529ac8b45d0b19fd230a64921b7&v=4",
                  bio: "I'm a consulting software engineer helping funded startups get the customer growth they deserve. \r\n\r\nBuilding with TypeScript, Vite, React, and Vue",
                  followers: {
                    totalCount: 129,
                  },
                  location: "Tulsa, Oklahoma",
                  login: "ThatGuySam",
                  name: "Sam Carlton",
                  repositories: {
                    totalCount: 174,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjY0NjIzOTY=",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/6462396?u=e375dec998f7713aeeefc129b1151597cc3ae08e&v=4",
                  bio: "",
                  followers: {
                    totalCount: 25,
                  },
                  location: "San Francisco Bay",
                  login: "CarltonSemple",
                  name: "Carlton Semple",
                  repositories: {
                    totalCount: 72,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjc2NDkxMzQ0",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/76491344?u=ef2d13cf03bc92a9750016da1f9145d3b86096c1&v=4",
                  bio: "Freshman at the University of Southern California with a love for programming.",
                  followers: {
                    totalCount: 99,
                  },
                  location: "Los Angeles, California",
                  login: "31Carlton7",
                  name: "Carlton Aikins",
                  repositories: {
                    totalCount: 12,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjYzNDI4ODc0",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/63428874?u=abb99ffc806501571ca7d06dc35eea81760c2994&v=4",
                  bio: "Junior Fullstack Software Engineer",
                  followers: {
                    totalCount: 12,
                  },
                  location: "London",
                  login: "carltonLND",
                  name: "Carlton Nunes Desouza (CJ)",
                  repositories: {
                    totalCount: 65,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjE0MDU3NDA=",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/1405740?u=1be154a2d8aa1b27e9240024f04349948e0bbdda&v=4",
                  bio: "Yet Another Developer.",
                  followers: {
                    totalCount: 9,
                  },
                  location: "Beijing",
                  login: "carltonf",
                  name: "Carl Xiong",
                  repositories: {
                    totalCount: 75,
                  },
                },
              },
              {
                node: {
                  id: "MDQ6VXNlcjI1NzI3MTky",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/25727192?u=91d94a7c612c64b2f28b0beea1fa69eee81a98dc&v=4",
                  bio: "",
                  followers: {
                    totalCount: 10,
                  },
                  location: null,
                  login: "carltoncolter",
                  name: "Carlton Colter",
                  repositories: {
                    totalCount: 36,
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
];

const host = import.meta.env.VITE_API_HOST;
const token = import.meta.env.VITE_API_TOKEN;

const authLink = setContext((_, { headers }) => {
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

const httpLink = createHttpLink({ uri: host });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "search/:query",
        element: <SearchResults />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider> */}
    <MockedProvider mocks={mocks} addTypename={false}>
      <RouterProvider router={router} />
    </MockedProvider>
  </React.StrictMode>
);
