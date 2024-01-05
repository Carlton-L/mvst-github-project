import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import UserSearchResult from '../components/UserSearchResult';
import { USER_SEARCH_QUERY } from '../graphql/queries/UserSearchQuery';

const SearchResults = (): React.JSX.Element => {
  const { state } = useLocation();
  const { query, page } = useParams();
  const [searchState, setSearchState] = useState(null);
  const navigate = useNavigate();

  /**
   * Check for state if page parameter exists
   * if there's no state, the user must have navigated here directly
   * in this case, redirect to the top level search page (page 1)
   */
  // NOTE: In the case of the user page there
  useEffect(() => {
    if (page && !state) {
      console.log('redirect trigger');
      navigate(`/search/${query}/`);
    }
  });

  const { loading, error, data } = useQuery(USER_SEARCH_QUERY, {
    variables: { query: query, cursor: page, resultsPerPage: 10 },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data.search.userCount);
  console.log(data.search.totalPages);

  // updateState gets passed a direction by the child component
  // then the parent component uses the direction to redirect
  // the parent component uses
  const navigatePage = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
    } else if (direction === 'previous') {
    }
  };

  return (
    <main className="flex flex-col items-center justify-start grow min-h-full">
      <h3 className="flex mt-3.5 text-xl">
        Users with &nbsp;
        <span className="text-primary inline-block">"{query}"</span>
      </h3>
      <ul>
        {/* TODO: Replace "any" type */}
        {data.search.edges.map((e: object, i: number) => {
          return <UserSearchResult user={e} key={i} />;
        })}
      </ul>
    </main>
  );
};

export default SearchResults;
