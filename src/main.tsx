import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Root from './routes/Root.tsx';
import Home from './pages/Home.tsx';
import ErrorPage from './error-page.tsx';
import SearchResults from './pages/SearchResults.tsx';
import UserPage from './pages/UserPage.tsx';

import './index.css';

const host = import.meta.env.VITE_API_HOST;
const token = import.meta.env.VITE_API_TOKEN;

const authLink = setContext((_, { headers }) => {
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
  };
});

const httpLink = createHttpLink({ uri: host });
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      // Type policy map
      SearchResultItemConnection: {
        fields: {
          // Field policy map for the SearchResultItemConnection type
          totalPages: {
            // Field policy for the totalPages field
            read(_, { args, readField }) {
              // The read function for the totalPages field
              const resultCount: number | undefined =
                readField('userCount') || readField('repositoryCount');

              // Total page count is total number of results (max 1000)
              // divided by the number of results per page
              const pageCount: number =
                (resultCount! > 1000 ? 1000 : resultCount!) /
                args!.resultsPerPage;
              return pageCount;
            },
          },
        },
      },
    },
  }),
  link: authLink.concat(httpLink),
});

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search/:query/:page?',
        element: <SearchResults />,
      },
      {
        path: '/user/:id',
        element: <UserPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
