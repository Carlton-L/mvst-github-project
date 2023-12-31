import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

import UserSearchResult from "../components/UserSearchResult";
import { USER_SEARCH_QUERY } from "../graphql/queries/UserSearchQuery";

const useQueryParam = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const SearchResults = () => {
  let query = useQueryParam();

  const { loading, error, data } = useQuery(USER_SEARCH_QUERY, {
    variables: { query: "foo", cursor: null },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex flex-col items-center justify-start grow min-h-full">
      <h3 className="flex mt-3.5 text-xl">
        Users with &nbsp;
        <span className="text-primary inline-block">{query.get("search")}</span>
      </h3>
      <ul>
        {/* TODO: Replace "any" type */}
        {data.search.edges.map((e: any, i: number) => {
          return <UserSearchResult user={e} key={i} />;
        })}
      </ul>
    </main>
  );
};

export default SearchResults;
