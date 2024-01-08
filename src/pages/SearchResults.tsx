import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import UserSearchResult from '../components/UserSearchResult';
import { USER_SEARCH_QUERY } from '../graphql/queries/UserSearchQuery';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchResults = (): React.JSX.Element => {
  const {
    state,
  }: {
    state?: { currentPage?: number; startCursor?: string };
  } = useLocation();
  const { query, page } = useParams();
  const navigate = useNavigate();

  /**
   * Check for history state object if page parameter exists
   * if there's no state, the user must have navigated here directly
   * in this case, redirect to the top level search page (page 1)
   */
  useEffect(() => {
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
   * Gets passed a direction by the child component and uses that to
   * navigate to a new page
   *
   * @param {0} direction a string "next" or "previous" indicating the
   * direction of pagination
   */
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
        {/* TODO: Replace "any" type */}
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
