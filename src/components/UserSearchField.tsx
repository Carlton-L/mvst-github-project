import { NavigateFunction, useNavigate } from 'react-router-dom';

/**
 * React component which accepts a query for a Github user and navigates to the search page
 * with that query as a param
 * @returns React element
 */
const UserSearchField = (): React.JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  /**
   * Function which navigates to the search page using the input of the search field as the query param
   * @param event JavaScript event fired by the search field input
   */
  const search = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // Check if Enter key was pressed
    if (event.key === 'Enter') {
      const element = event.currentTarget;
      navigate(`/mvst-github-project/search/${element.value}`);
      element.value = '';
      element.blur();
    }
  };

  return (
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Find Users"
      onKeyDown={search}
      className="bg-grey-dark text-grey focus:text-white focus:outline-primary outline-primary/0 flex grow rounded-full outline outline-1 outline-offset-2 transition-all duration-300 py-3.5 px-5"
    />
  );
};

export default UserSearchField;
