import { useParams } from 'react-router-dom';
import { DetailedReactHTMLElement, createElement } from 'react';

// FIXME: Add type for Apollo user query
interface Props {
  user: any;
}

/**
 * Returns an array containing strings and React components wrapping the
 * passed in search string
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
      console.log(str);
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
      return createElement(wrapper, { className: classes }, e);
    } else {
      return e;
    }
  });
};

const UserSearchResult = ({ user }: Props) => {
  const { query = ' ' } = useParams();
  return (
    <li className="mt-3 flex flex-row rounded-3xl bg-grey-dark w-full">
      <div className="p-3 flex flex-row">
        <div className="flex rounded-full bg-primary size-16 mr-3 flex-shrink-0"></div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h4 className="font-bold text-base lg:text-xl">
              {user.node.name &&
                findAndWrap(user.node.name, query, 'span', 'text-primary')}
            </h4>
            <h5 className="text-grey text-base lg:text-xl">
              {user.node.login &&
                findAndWrap(user.node.login, query, 'span', 'text-primary')}
            </h5>
            <p className="text-sm lg:text-base">
              {user.node.bio &&
                findAndWrap(user.node.bio, query, 'span', 'text-primary')}
            </p>
          </div>
          <div className="flex flex-row mt-4 text-grey text-xs lg:text-base">
            {user.node.location ? (
              <div>Location: {user.node.location}</div>
            ) : (
              ''
            )}
            {user.node.location &&
            user.node.followers &&
            user.node.followers.totalCount ? (
              <div className="mx-4">|</div>
            ) : (
              ''
            )}
            {user.node.followers && user.node.followers.totalCount ? (
              <div>Followers: {user.node.followers.totalCount}</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserSearchResult;
