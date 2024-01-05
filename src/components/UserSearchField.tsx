import { NavigateFunction, useNavigate } from 'react-router-dom';

const UserSearchField = (): React.JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const search = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // Check if Enter key was pressed
    if (event.key === 'Enter') {
      const element = event.currentTarget;
      navigate(`/search/${element.value}`);
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
