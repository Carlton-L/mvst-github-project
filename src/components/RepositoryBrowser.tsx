import { useQuery } from '@apollo/client';
import { useState } from 'react';

import Repository from './Repository';

import { USER_REPOS_QUERY } from '../graphql/queries/UserReposQuery';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

interface RepositoryBrowserProps {
  login: string;
  language: string | null;
  query: string | null;
}

interface RepositoryBrowserState {
  cursor: string | null;
  direction: 'next' | 'previous' | null;
  currentPage: number;
}

/**
 * Displays user repositories and pagination
 * @param props Prop object containing the user login and optional
 * language and query strings
 */
const RepositoryBrowser = ({
  login,
  language,
  query,
}: RepositoryBrowserProps) => {
  const [state, setState] = useState<RepositoryBrowserState>({
    cursor: null,
    direction: null,
    currentPage: 1,
  });

  const { loading, error, data } = useQuery(USER_REPOS_QUERY, {
    variables: {
      query: `owner:${login}${query ? ` ${query}` : ''}${
        language ? ` language:${language}` : ''
      } sort:updated`,
      prevCursor: state.direction === 'previous' ? state.cursor : null,
      nextCursor: state.direction === 'next' ? state.cursor : null,
      resultsPerPage: 10,
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  /**
   * Gets passed a direction by the child component and uses that to
   * update the state with a new pagination cursor and direction
   *
   * @param {0} direction a string "next" or "previous" indicating the
   * direction of pagination
   */
  const paginate = (direction: 'next' | 'previous'): void => {
    if (direction === 'next') {
      setState({
        cursor: data.search.pageInfo.endCursor,
        direction,
        currentPage: state.currentPage + 1,
      });
    } else if (direction === 'previous') {
      setState({
        cursor: data.search.pageInfo.startCursor,
        direction,
        currentPage: state.currentPage - 1,
      });
    }
  };

  return (
    <>
      <ul className="w-full flex flex-col gap-3">
        {data.search.edges.map((e: object, i: number) => {
          return <Repository repository={e} user={login} key={i} />;
        })}
      </ul>
      <Pagination
        totalPages={data.search.totalPages}
        currentPage={state.currentPage ? state.currentPage : 1}
        hasNextPage={data.search.pageInfo.hasNextPage}
        hasPreviousPage={data.search.pageInfo.hasPreviousPage}
        callbackFn={paginate}
      />
    </>
  );
};

export default RepositoryBrowser;
