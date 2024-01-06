interface PaginationProps {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  callbackFn: (direction: 'next' | 'previous') => void;
  resultsPerPage?: number;
}

/**
 * Pagination component
 *
 * Renders pagination nav buttons, and returns 'next' or 'previous' to the passed
 * in callback function on button click
 *
 * @param {0} props.totalPages Total number of pages
 * @param {1} props.currentPage Current page number
 * @param {2} props.hasNextPage If next page exists ? true : false
 * @param {3} props.hasPreviousPage If previous page exists ? true : false
 * @param {4} props.callbackFn Callback function that accepts an argument with the type of "next" | "previous"
 */
const Pagination = ({
  totalPages,
  currentPage,
  hasNextPage,
  hasPreviousPage,
  callbackFn,
}: PaginationProps): React.JSX.Element => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 md:gap-3 my-3 md:my-5">
      <button
        disabled={!hasPreviousPage}
        aria-disabled={!hasPreviousPage}
        className="stroke-white disabled:stroke-grey text-white bg-grey-dark disabled:text-grey disabled:bg-black flex flex-row gap-2.5 items-center p-3.5 md:p-5 rounded-full font-bold text-base md:text-xl"
        onClick={() => callbackFn('previous')}
      >
        <svg
          className="stroke-inherit"
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 8L7.5 2"
            stroke-width="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.5 8L7.5 14"
            stroke-width="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Prev
      </button>
      {currentPage >= 3 ? <div>...</div> : ''}
      {hasPreviousPage ? (
        <button
          disabled={!hasPreviousPage}
          aria-disabled={!hasPreviousPage}
          className="text-white bg-grey-dark disabled:text-grey disabled:bg-black p-3.5 md:p-5 rounded-full font-bold text-base md:text-xl"
          onClick={() => callbackFn('previous')}
        >
          <div className="w-5 md:w-6"> {currentPage - 1}</div>
        </button>
      ) : (
        ''
      )}
      <button
        disabled
        className="text-white bg-grey-dark border-primary border-solid border p-3.5 md:p-5 rounded-full font-bold text-base md:text-xl"
      >
        <div className="w-5 md:w-6">{currentPage}</div>
      </button>
      {hasNextPage ? (
        <button
          disabled={!hasNextPage}
          aria-disabled={!hasNextPage}
          className="text-white bg-grey-dark disabled:text-grey disabled:bg-black p-3.5 md:p-5 rounded-full font-bold text-base md:text-xl"
          onClick={() => callbackFn('next')}
        >
          <div className="w-5 md:w-6">{currentPage + 1}</div>
        </button>
      ) : (
        ''
      )}
      {totalPages - currentPage >= 2 ? <div>...</div> : ''}
      <button
        disabled={!hasNextPage}
        aria-disabled={!hasNextPage}
        className="stroke-white disabled:stroke-grey text-white bg-grey-dark disabled:text-grey disabled:bg-black flex flex-row gap-2.5 items-center p-3.5 md:p-5 rounded-full font-bold text-base md:text-xl"
        onClick={() => callbackFn('next')}
      >
        Next
        <svg
          className="stroke-inherit"
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 5L1.5 1"
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 5L1.5 9"
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
