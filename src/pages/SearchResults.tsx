import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import UserSearchResult from '../components/UserSearchResult';
import { USER_SEARCH_QUERY } from '../graphql/queries/UserSearchQuery';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Displays paginated user search results
 * @returns React element containing the page content
 */
const SearchResults = (): React.JSX.Element => {
  const {
    state,
  }: {
    state?: { currentPage?: number; startCursor?: string };
  } = useLocation();
  const { query, page } = useParams();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    /**
     * Check for history state object if page parameter exists
     * if there's no state, the user must have navigated here directly
     * in this case, redirect to the top level search page (page 1)
     */
    if (page && state === null) {
      navigate(`/search/${query}/`);
    }
  });

  const { loading, error, data } = useQuery(USER_SEARCH_QUERY, {
    variables: {
      query: query,
      cursor: state !== null ? state!.startCursor : null,
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
   * Navigates to a new page using the passed in direction param
   * @param {0} direction a string "next" or "previous" indicating the
   * direction of pagination
   */
  // TODO: Update navigatePage function with cursor reverse pagination similar to User page
  const navigatePage = (direction: 'next' | 'previous'): void => {
    if (direction === 'next') {
      if (state) {
        const nextPage: string = (Number(state!.currentPage!) + 1).toString();
        navigate(`../${nextPage}`, {
          state: {
            currentPage: nextPage,
            startCursor: data.search.pageInfo.endCursor,
          },
          relative: 'path',
        });
      } else {
        // If state object doesn't exist, the user is on the first page of results
        navigate('2', {
          state: {
            currentPage: 2,
            startCursor: data.search.pageInfo.endCursor,
          },
        });
      }
    } else if (direction === 'previous') {
      // Navigate backwards in the history stack
      navigate(-1);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start grow min-h-full">
      <h3 className="flex mt-3.5 text-xl">
        Users with &nbsp;
        <span className="text-primary inline-block">"{query}"</span>
      </h3>
      <ul className="w-full">
        {data.search.edges.map((e: object, i: number) => {
          return <UserSearchResult user={e} key={i} />;
        })}
      </ul>
      <Pagination
        totalPages={data.search.totalPages}
        currentPage={state ? Number(state.currentPage) : 1}
        hasNextPage={data.search.pageInfo.hasNextPage}
        hasPreviousPage={data.search.pageInfo.hasPreviousPage}
        callbackFn={navigatePage}
      />
    </main>
  );
};

export default SearchResults;
