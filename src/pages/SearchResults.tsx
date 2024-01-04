import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import UserSearchResult from "../components/UserSearchResult";
import { USER_SEARCH_QUERY } from "../graphql/queries/UserSearchQuery";

const SearchResults = () => {
  const { query } = useParams();

  const { loading, error, data } = useQuery(USER_SEARCH_QUERY, {
    variables: { query: query, cursor: null },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

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
