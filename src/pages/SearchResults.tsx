import UserSearchResult from "../components/UserSearchResult";

const SearchResults = () => {
  return (
    <main className="flex flex-col items-center justify-start grow min-h-full">
      <h3 className="flex mt-3.5 text-xl">
        Users with &nbsp;
        <span className="text-primary inline-block">{'"foo"'}</span>
      </h3>
      <ul>
        <UserSearchResult />
      </ul>
    </main>
  );
};

export default SearchResults;
