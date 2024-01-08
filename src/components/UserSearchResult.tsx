import { useParams, Link } from 'react-router-dom';
import { DetailedReactHTMLElement, createElement } from 'react';

// FIXME: Add type for Apollo user query
interface UserSearchResultProps {
  user: any;
}

/**
 * Returns an array containing strings and React components wrapping the
 * passed in search string with the passed in wrapper
 * @param {0} str A string to search through
 * @param {1} substr A substring to search for
 * @param {2} wrapper An HTML element tag name which will wrap each instance of substr
 * @param {3} classes A string with classnames to be added to all React components returned by the function
 */
const findAndWrap = (
  str: string,
  substr: string,
  wrapper: keyof HTMLElementTagNameMap,
  classes: string
): Array<
  string | DetailedReactHTMLElement<{ className: string }, HTMLElement>
> => {
  /**
   * Returns an array of strings containing the substring
   * and all surrounding strings
   * @param {0} str A string to search through
   * @param {1} substr A substring to search for
   */
  const split = (str: string, substr: string): Array<string> => {
    const lcStr = str.toLowerCase();
    const lcSubstr = substr.toLowerCase();
    if (lcStr.includes(lcSubstr)) {
      /**
       * Returns:
       * String before the substring
       * Substring
       * Result of same function on string remaining after substring
       */
      return [
        str.slice(0, lcStr.indexOf(lcSubstr)),
        str.slice(
          lcStr.indexOf(lcSubstr),
          lcStr.indexOf(lcSubstr) + substr.length
        ),
        ...split(
          str.slice(lcStr.indexOf(lcSubstr) + substr.length, str.length),
          substr
        ),
      ];
    } else {
      return [str];
    }
  };

  return split(str, substr).map((e: string, i: number) => {
    // Check if index is even
    if ((i & 1) === 1) {
      // Create a React element with the passed in classes and child string
      return createElement(wrapper, { className: classes, key: i }, e);
    } else {
      return e;
    }
  });
};

/**
 *
 * @param {user}
 */
const UserSearchResult = ({
  user,
}: UserSearchResultProps): React.JSX.Element => {
  const { query = ' ' } = useParams();
  return (
    <li
      key={user.id}
      className="mt-3 flex flex-row rounded-3xl bg-grey-dark w-full justify-stretch"
    >
      <div className="p-3 flex flex-row flex-grow">
        <img
          src={user.node.avatarUrl}
          className="flex rounded-full bg-primary size-16 mr-3 flex-shrink-0"
        />
        <div className="flex flex-col">
          <div className="flex flex-col">
            <Link
              to={`/user/${user.node.login}`}
              className="font-bold text-base md:text-xl hover:underline"
            >
              {user.node.name &&
                findAndWrap(user.node.name, query, 'span', 'text-primary')}
            </Link>
            <Link
              to={`/user/${user.node.login}`}
              className="text-grey text-base md:text-xl hover:underline"
            >
              {user.node.login &&
                findAndWrap(user.node.login, query, 'span', 'text-primary')}
            </Link>
            <p className="text-sm md:text-base">
              {user.node.bio &&
                findAndWrap(user.node.bio, query, 'span', 'text-primary')}
            </p>
          </div>
          <div className="flex flex-row mt-4 text-grey text-xs md:text-base">
            {user.node.location ? (
              <div className="flex flex-row gap-1 items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5491 12.8653C14.5392 11.0294 15.1248 9.01037 15.2678 6.93878C15.2678 5.47738 14.6752 4.07584 13.6203 3.04247C12.5654 2.00911 11.1347 1.42857 9.64282 1.42857C8.15098 1.42857 6.72024 2.00911 5.66535 3.04247C4.61045 4.07584 4.01782 5.47738 4.01782 6.93878C4.16089 9.01037 4.74644 11.0294 5.73657 12.8653C3.66782 13.3429 2.14282 14.2306 2.14282 15.5102C2.14282 17.5184 5.91782 18.5714 9.64282 18.5714C13.3678 18.5714 17.1428 17.5184 17.1428 15.5102C17.1428 14.2306 15.6178 13.3429 13.5491 12.8653ZM5.26782 6.93878C5.26782 5.80214 5.72876 4.71205 6.54923 3.90832C7.3697 3.10459 8.4825 2.65306 9.64282 2.65306C10.8031 2.65306 11.9159 3.10459 12.7364 3.90832C13.5569 4.71205 14.0178 5.80214 14.0178 6.93878C13.8881 8.94118 13.2893 10.8874 12.2678 12.6265C12.1491 12.8286 12.0303 13.0184 11.8991 13.202C11.7616 13.4041 11.6178 13.5939 11.4741 13.7653C11.2691 14.0712 10.9996 14.3306 10.6837 14.526C10.3679 14.7214 10.0129 14.8482 9.64282 14.898C9.27272 14.8482 8.91779 14.7214 8.60192 14.526C8.28604 14.3306 8.01655 14.0712 7.81157 13.7653C7.66782 13.5939 7.52407 13.4041 7.38657 13.202C7.25532 13.0184 7.13657 12.8286 7.01782 12.6265C5.99637 10.8874 5.39756 8.94118 5.26782 6.93878ZM9.64282 17.3469C5.88657 17.3469 3.39282 16.2388 3.39282 15.5102C3.39282 15.0204 4.52407 14.3531 6.41782 13.9735C7.29907 15.2347 8.39907 16.1225 9.64282 16.1225C10.8866 16.1225 11.9866 15.2347 12.8678 13.9735C14.7616 14.3531 15.8928 15.0204 15.8928 15.5102C15.8928 16.2388 13.3991 17.3469 9.64282 17.3469Z"
                    fill="#7E7E7E"
                  />
                  <path
                    d="M9.64282 4.28572C9.14837 4.28572 8.66502 4.43234 8.2539 4.70705C7.84278 4.98175 7.52234 5.3722 7.33312 5.82901C7.14391 6.28583 7.0944 6.78849 7.19086 7.27345C7.28732 7.7584 7.52543 8.20386 7.87506 8.55349C8.22469 8.90312 8.67015 9.14122 9.1551 9.23768C9.64005 9.33415 10.1427 9.28464 10.5995 9.09542C11.0563 8.9062 11.4468 8.58577 11.7215 8.17465C11.9962 7.76352 12.1428 7.28017 12.1428 6.78572C12.1429 6.45739 12.0783 6.13226 11.9527 5.82891C11.8271 5.52555 11.643 5.24992 11.4108 5.01775C11.1786 4.78559 10.903 4.60144 10.5996 4.47584C10.2963 4.35023 9.97115 4.28563 9.64282 4.28572ZM9.64282 8.03572C9.3956 8.03572 9.15392 7.96241 8.94836 7.82506C8.7428 7.68771 8.58258 7.49248 8.48797 7.26407C8.39336 7.03567 8.36861 6.78433 8.41684 6.54186C8.46507 6.29938 8.58412 6.07665 8.75894 5.90184C8.93376 5.72702 9.15648 5.60797 9.39896 5.55974C9.64144 5.51151 9.89277 5.53626 10.1212 5.63087C10.3496 5.72548 10.5448 5.8857 10.6822 6.09126C10.8195 6.29682 10.8928 6.53849 10.8928 6.78572C10.8918 7.11694 10.7598 7.43432 10.5256 7.66853C10.2914 7.90274 9.97404 8.03475 9.64282 8.03572Z"
                    fill="#7E7E7E"
                  />
                </svg>
                {user.node.location}
              </div>
            ) : (
              ''
            )}
            {user.node.location &&
            user.node.followers &&
            user.node.followers.totalCount ? (
              <div className="mx-2">&#x2022;</div>
            ) : (
              ''
            )}
            {user.node.followers && user.node.followers.totalCount ? (
              <div className="flex flex-row gap-1 items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.80247 11.432C5.90417 11.7915 5.6673 12.1582 5.2734 12.251C4.79932 12.3627 4.37932 12.615 4.07935 12.9681C3.77943 13.3212 3.61647 13.7552 3.61604 14.2019C3.6161 14.3802 3.6937 14.5511 3.83178 14.6771C3.96992 14.8032 4.15728 14.874 4.35264 14.874C4.75946 14.874 5.08925 15.175 5.08925 15.5463C5.08925 15.9176 4.75946 16.2185 4.35264 16.2185C3.76656 16.2185 3.20449 16.0061 2.79006 15.6278C2.37564 15.2496 2.14282 14.7367 2.14282 14.2017C2.14343 13.4569 2.41504 12.733 2.915 12.1444C3.41496 11.5557 4.11497 11.1353 4.9051 10.9492C5.299 10.8563 5.70076 11.0725 5.80247 11.432Z"
                    fill="#7E7E7E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.03453 3.40215C8.06069 3.77267 7.75279 4.09238 7.34682 4.11626C7.1532 4.12764 6.96396 4.17382 6.78995 4.25214C6.61594 4.33046 6.4606 4.43937 6.33284 4.57263C6.20507 4.70588 6.10742 4.86086 6.04546 5.02866C5.9835 5.19646 5.95848 5.37378 5.97181 5.55043C5.97298 5.56582 5.97355 5.58122 5.97355 5.59661V6.67224C5.97355 6.68771 5.97298 6.7031 5.97181 6.7185C5.95848 6.8951 5.9835 7.07245 6.04546 7.24024C6.10742 7.40804 6.20507 7.563 6.33284 7.69631C6.4606 7.82955 6.61594 7.93846 6.78995 8.01678C6.96396 8.0951 7.1532 8.14129 7.34682 8.15265C7.75279 8.17651 8.06069 8.49624 8.03453 8.86673C8.00837 9.23729 7.65806 9.51829 7.25208 9.49443C6.86485 9.47164 6.48637 9.37927 6.13835 9.22263C5.79034 9.06599 5.47965 8.84818 5.22413 8.58169C4.96861 8.31513 4.77329 8.00522 4.64938 7.66962C4.52836 7.34182 4.47779 6.99587 4.50034 6.6508V5.61813C4.47779 5.273 4.52836 4.92708 4.64938 4.59932C4.77329 4.26371 4.96861 3.95376 5.22413 3.68724C5.47965 3.42072 5.79034 3.20289 6.13835 3.04626C6.48637 2.88963 6.86485 2.79727 7.25208 2.7745C7.65806 2.75062 8.00837 3.03163 8.03453 3.40215Z"
                    fill="#7E7E7E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.56263 14.2017V16.248C6.55729 16.6891 6.71056 17.1196 6.99902 17.4737C7.28844 17.829 7.69853 18.0876 8.16484 18.2094L9.41553 18.5384L9.417 18.5387C11.4028 19.0572 13.5081 19.0572 15.494 18.5387L15.4954 18.5384L16.7462 18.2094L16.7469 18.2092C17.2132 18.0874 17.6226 17.8289 17.912 17.4737C18.2005 17.1196 18.3537 16.6891 18.3484 16.248V14.2017C18.3484 13.3102 17.9603 12.4552 17.2696 11.8249C16.5789 11.1945 15.6421 10.8403 14.6653 10.8403H10.2457C9.26887 10.8403 8.33205 11.1945 7.64137 11.8249C6.95067 12.4552 6.56263 13.3102 6.56263 14.2017Z"
                    fill="#7E7E7E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4554 1.42857C10.4213 1.42857 8.77234 2.9335 8.77234 4.78992V6.13446C8.77234 7.99086 10.4213 9.4958 12.4554 9.4958C14.4894 9.4958 16.1384 7.99086 16.1384 6.13446V4.78992C16.1384 2.9335 14.4894 1.42857 12.4554 1.42857Z"
                    fill="#7E7E7E"
                  />
                </svg>{' '}
                {user.node.followers.totalCount}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {/* TODO: Fix or disable this link or handle the error for cases where an Org is returned instead of a user */}
      <Link
        to={`/user/${user.node.login}`}
        className="flex flex-col flex-shrink-0 justify-center items-center self-stretch gap-2 rounded-3xl text-black bg-primary w-20 md:w-32 text-base md:text-xl"
      >
        <svg
          className="w-7 h-7 md:w-12 md:h-12"
          width="48"
          height="48"
          viewBox="0 0 28 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_261_156)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.37025 2.5C4.95663 2.5 3 4.48028 3 6.92308V21.0769C3 23.5197 4.95663 25.5 7.37025 25.5H8.2443C8.72704 25.5 9.11835 25.104 9.11835 24.6154C9.11835 24.1268 8.72704 23.7308 8.2443 23.7308H7.37025C5.92208 23.7308 4.7481 22.5426 4.7481 21.0769C4.7481 20.0771 5.29433 19.2065 6.10123 18.754C6.44537 18.5746 6.86313 18.4532 7.37025 18.4231H22.2291V23.7308H20.481C19.9983 23.7308 19.6069 24.1268 19.6069 24.6154C19.6069 25.104 19.9983 25.5 20.481 25.5H23.1031C23.5859 25.5 23.9772 25.104 23.9772 24.6154V17.6181C24.0285 17.2644 23.9772 16.8308 23.9772 16.8308V5.15385C23.9772 3.68817 22.8033 2.5 21.355 2.5H7.37025Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 21.375C11 20.8917 11.3917 20.5 11.875 20.5H17.125C17.6083 20.5 18 20.8917 18 21.375V26.625C18 26.9477 17.8224 27.2442 17.5379 27.3965C17.2534 27.5487 16.9082 27.532 16.6396 27.3531L14.5 25.9267L12.3604 27.3531C12.0918 27.532 11.7466 27.5487 11.4621 27.3965C11.1776 27.2442 11 26.9477 11 26.625V21.375Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_261_156">
              <rect
                width="48"
                height="48"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        {/* NOTE: This check is required because sometimes the API returns an Organization instead of a user, as an empty object */}
        {user.node.repositories ? user.node.repositories.totalCount : 0}
      </Link>
    </li>
  );
};

export default UserSearchResult;
