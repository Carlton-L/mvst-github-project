import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
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

const host = import.meta.env.VITE_API_HOST;
const token = import.meta.env.VITE_API_TOKEN;

const authLink = setContext((_, { headers }) => {
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

const httpLink = createHttpLink({ uri: host });
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
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
