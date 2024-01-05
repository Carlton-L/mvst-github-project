import { DetailedReactHTMLElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
/**
 * I know the following:
 * userCount (Int) - up to 1,000
 * The number per page (10)
 * startCursor (string)
 * endCursor (string)
 * hasNextPage (bool)
 * hasPreviousPage (bool)
 *
 * If there's >= 1000 userCount, the number of pages is always the same (100)
 * startCursor and endCursor need to be in state
 * hasNextPage and hasPreviousPage also need to be in state
 * total number of pages should be in state
 * current page can't be used for much but should be in state
 *
 * Need to calculate the total number of pages
 *
 * Make a search query OR directly go to url /search/:query
 * Someone could type /search/:query/:page
 * in this case I need to check that currentPage matches the slug
 * When going to the next page, I update the currentPage in the state
 * if navigating directly, state object should be empty
 *
 * Pagination needs to trigger SearchResults.tsx to reload the page with a new slug
 * Pagination also needs to trigger UserPage.tsx to reload only the repositories
 * component without reloading the page
 *
 * So pagination should tell it's parent component what to set as the state
 * Parent component needs to know:
 * Whether the user wants to navigate to the next page or the previous page
 *
 * ONLY OPTIONS ARE NEXT OR PREVIOUS
 *
 * State: {
 *  page
 * }
 */

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  callbackFn: (direction: string) => void;
  resultsPerPage?: number;
}

/**
 * Pagination component
 *
 * @param {0} props.totalPages Total number of pages
 * @param {1} props.currentPage Current page number
 * @param {2} props.hasNextPage If next page exists ? true : false
 * @param {3} props.hasPreviousPage If previous page exists ? true : false
 * @param {4} props.callbackFn Function that accepts an argument with the type of "next" | "previous"
 * @param {5} [props.resultsPerPage=10] Number of results displayed per page
 */
const Pagination = ({
  totalPages,
  currentPage,
  hasNextPage,
  hasPreviousPage,
  callbackFn,
  resultsPerPage = 10,
}: PaginationProps): React.JSX.Element => {
  const { state } = useLocation();
  return (
    <div className="">
      <button
        disabled={!hasPreviousPage}
        aria-disabled={!hasPreviousPage}
        className="disabled:text-grey disabled:bg-black"
        onClick={() => callbackFn('previous')}
      >
        Prev
      </button>
      {/* TODO: Render this div component if the value of the first link is more than 1 */}
      <div>...</div>
      {currentPage > 1}
      <Link to={}>1</Link>
      <Link to={}>2</Link>
      <Link to={}>3</Link>
      {/* TODO: Render this div component if the value of the last link is less than the total number of pages */}
      <div>...</div>
      <button
        disabled={!hasNextPage}
        aria-disabled={!hasNextPage}
        className=""
        onClick={callbackFn('next')}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
