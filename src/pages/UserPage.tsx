import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import { USER_INFO_QUERY } from '../graphql/queries/UserInfoQuery';

import RepositoryBrowser from '../components/RepositoryBrowser';
import { socialAccountProvider } from '../types/socialAccountProvider';
import { socialProviderIcon } from '../types/socialProviderIcon';
import LoadingSpinner from '../components/LoadingSpinner';

interface UserPageState {
  language: string | null;
  query: string | null;
}

/**
 * User detail page which displays user info and repositories
 * @returns React element
 */
const UserPage = (): React.JSX.Element => {
  const { id } = useParams();
  const [state, setState] = useState<UserPageState>({
    language: null,
    query: null,
  });

  const languages: Array<string> = [
    'CSS',
    'JavaScript',
    'HTML',
    'Java',
    'Python',
    'TypeScript',
    'Jupyter Notebook',
    'PHP',
    'Dart',
    'C',
    'C++',
    'C#',
    'Go',
    'Ruby',
    'Rust',
    'Swift',
    'Kotlin',
  ];

  /**
   * Function which updates state with the value of the select input
   * @param event JavaScript event fired by input element
   */
  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const element: EventTarget & HTMLSelectElement = event.target;
    setState({ query: state.query, language: element.value });
  };

  /**
   * Function which updates state with the value entered into the search field
   * @param event JavaScript event fired by input element
   */
  const search = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const element = event.currentTarget;
    setState({ language: state.language, query: element.value });
  };

  const { loading, error, data } = useQuery(USER_INFO_QUERY, {
    variables: { user: id },
  });

  if (loading) {
    return (
      <div className="h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex flex-col gap-4 items-center flex-grow px-5 pt-5">
      <div className="bg-grey-dark p-3 flex flex-col md:flex-row gap-3 md:gap-8 justify-center items-center md:justify-start md:items-start rounded-3xl w-full">
        <img
          src={data.user.avatarUrl}
          alt="user avatar"
          className="rounded-full w-32 md:w-64"
        />
        <div className="flex flex-col gap-3 justify-center items-center md:justify-start md:items-start w-full">
          {data.user.status ? (
            <div className=" order-first md:order-2 flex flex-row gap-3 justify-center items-center text-xl md:text-3xl">
              {data.user.status.emojiHTML
                ? parse(data.user.status.emojiHTML)
                : ''}
              <div className="text-base md:text-xl text-grey">
                {data.user.status.message}
              </div>
            </div>
          ) : (
            <div className="text-grey order-first md:order-2">-</div>
          )}
          <div className="flex flex-col w-full gap-px md:order-1">
            {data.user.name ? (
              <div className="text-xl md:text-3xl font-bold">
                {data.user.name}
              </div>
            ) : (
              ''
            )}
            <div className="text-xl text-grey">{data.user.login}</div>
            {data.user.bio ? (
              <div className="text-base">{data.user.bio}</div>
            ) : (
              ''
            )}
          </div>
          <div className="md:order-3 grid grid-cols-2 auto-cols-max gap-2 w-full">
            {data.user.location ? (
              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  className="shrink-0"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5491 12.8653C14.5392 11.0295 15.1248 9.01039 15.2679 6.93879C15.2679 5.4774 14.6752 4.07585 13.6203 3.04249C12.5654 2.00913 11.1347 1.42859 9.64286 1.42859C8.15101 1.42859 6.72027 2.00913 5.66538 3.04249C4.61049 4.07585 4.01786 5.4774 4.01786 6.93879C4.16093 9.01039 4.74648 11.0295 5.73661 12.8653C3.66786 13.3429 2.14286 14.2306 2.14286 15.5102C2.14286 17.5184 5.91786 18.5714 9.64286 18.5714C13.3679 18.5714 17.1429 17.5184 17.1429 15.5102C17.1429 14.2306 15.6179 13.3429 13.5491 12.8653ZM5.26786 6.93879C5.26786 5.80215 5.72879 4.71206 6.54927 3.90834C7.36974 3.10461 8.48253 2.65308 9.64286 2.65308C10.8032 2.65308 11.916 3.10461 12.7364 3.90834C13.5569 4.71206 14.0179 5.80215 14.0179 6.93879C13.8881 8.9412 13.2893 10.8874 12.2679 12.6265C12.1491 12.8286 12.0304 13.0184 11.8991 13.2021C11.7616 13.4041 11.6179 13.5939 11.4741 13.7653C11.2691 14.0713 10.9996 14.3306 10.6838 14.526C10.3679 14.7214 10.013 14.8482 9.64286 14.898C9.27276 14.8482 8.91783 14.7214 8.60195 14.526C8.28608 14.3306 8.01659 14.0713 7.81161 13.7653C7.66786 13.5939 7.52411 13.4041 7.38661 13.2021C7.25536 13.0184 7.13661 12.8286 7.01786 12.6265C5.99641 10.8874 5.3976 8.9412 5.26786 6.93879ZM9.64286 17.347C5.88661 17.347 3.39286 16.2388 3.39286 15.5102C3.39286 15.0204 4.52411 14.3531 6.41786 13.9735C7.29911 15.2347 8.39911 16.1225 9.64286 16.1225C10.8866 16.1225 11.9866 15.2347 12.8679 13.9735C14.7616 14.3531 15.8929 15.0204 15.8929 15.5102C15.8929 16.2388 13.3991 17.347 9.64286 17.347Z"
                    fill="#7E7E7E"
                  />
                  <path
                    d="M9.64286 4.28571C9.1484 4.28571 8.66506 4.43233 8.25393 4.70703C7.84281 4.98173 7.52238 5.37218 7.33316 5.829C7.14394 6.28581 7.09443 6.78848 7.19089 7.27343C7.28736 7.75838 7.52546 8.20384 7.87509 8.55347C8.22472 8.9031 8.67018 9.1412 9.15513 9.23767C9.64008 9.33413 10.1428 9.28462 10.5996 9.0954C11.0564 8.90618 11.4468 8.58575 11.7215 8.17463C11.9962 7.76351 12.1429 7.28016 12.1429 6.78571C12.1429 6.45738 12.0783 6.13225 11.9527 5.82889C11.8271 5.52554 11.643 5.2499 11.4108 5.01774C11.1787 4.78557 10.903 4.60143 10.5997 4.47582C10.2963 4.35022 9.97119 4.28562 9.64286 4.28571ZM9.64286 8.0357C9.39563 8.0357 9.15396 7.96239 8.94839 7.82504C8.74283 7.68769 8.58262 7.49247 8.48801 7.26406C8.3934 7.03565 8.36864 6.78432 8.41688 6.54184C8.46511 6.29937 8.58416 6.07664 8.75897 5.90182C8.93379 5.72701 9.15652 5.60796 9.39899 5.55972C9.64147 5.51149 9.8928 5.53625 10.1212 5.63086C10.3496 5.72547 10.5448 5.88568 10.6822 6.09124C10.8195 6.2968 10.8929 6.53848 10.8929 6.78571C10.8919 7.11693 10.7599 7.4343 10.5257 7.66851C10.2915 7.90272 9.97408 8.03473 9.64286 8.0357Z"
                    fill="#7E7E7E"
                  />
                </svg>
                <div className="text-grey truncate max-w-64">
                  {data.user.location}
                </div>
              </div>
            ) : (
              ''
            )}
            {data.user.followers ? (
              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  className="shrink-0"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.80251 11.432C5.90421 11.7915 5.66734 12.1582 5.27344 12.251C4.79936 12.3627 4.37936 12.615 4.07938 12.9681C3.77947 13.3212 3.61651 13.7552 3.61607 14.202C3.61613 14.3802 3.69373 14.5511 3.83182 14.6771C3.96996 14.8032 4.15732 14.874 4.35268 14.874C4.75949 14.874 5.08929 15.175 5.08929 15.5463C5.08929 15.9176 4.75949 16.2186 4.35268 16.2186C3.7666 16.2186 3.20452 16.0061 2.7901 15.6278C2.37568 15.2496 2.14286 14.7367 2.14286 14.2018C2.14347 13.457 2.41508 12.733 2.91503 12.1444C3.415 11.5558 4.115 11.1353 4.90513 10.9492C5.29903 10.8563 5.70079 11.0726 5.80251 11.432Z"
                    fill="#7E7E7E"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.03453 3.40213C8.06068 3.77265 7.75278 4.09236 7.34681 4.11624C7.15319 4.12762 6.96395 4.1738 6.78994 4.25212C6.61593 4.33044 6.46059 4.43935 6.33283 4.57261C6.20507 4.70587 6.10741 4.86085 6.04545 5.02865C5.98349 5.19644 5.95847 5.37376 5.9718 5.55041C5.97297 5.56581 5.97354 5.5812 5.97354 5.5966V6.67223C5.97354 6.68769 5.97297 6.70309 5.9718 6.71848C5.95847 6.89509 5.98349 7.07243 6.04545 7.24023C6.10741 7.40803 6.20507 7.56298 6.33283 7.6963C6.46059 7.82954 6.61593 7.93845 6.78994 8.01677C6.96395 8.09509 7.15319 8.14127 7.34681 8.15263C7.75278 8.1765 8.06068 8.49623 8.03453 8.86671C8.00836 9.23727 7.65805 9.51828 7.25207 9.49441C6.86485 9.47162 6.48636 9.37925 6.13834 9.22261C5.79033 9.06598 5.47964 8.84816 5.22412 8.58167C4.9686 8.31512 4.77328 8.0052 4.64937 7.66961C4.52835 7.34181 4.47778 6.99586 4.50034 6.65078V5.61811C4.47778 5.27299 4.52835 4.92707 4.64937 4.5993C4.77328 4.2637 4.9686 3.95374 5.22412 3.68723C5.47964 3.42071 5.79033 3.20288 6.13834 3.04625C6.48636 2.88961 6.86485 2.79726 7.25207 2.77449C7.65805 2.75061 8.00836 3.03162 8.03453 3.40213Z"
                    fill="#7E7E7E"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.56263 14.2017V16.248C6.55729 16.6891 6.71056 17.1197 6.99902 17.4737C7.28844 17.829 7.69853 18.0876 8.16484 18.2094L9.41553 18.5384L9.417 18.5388C11.4028 19.0572 13.5081 19.0572 15.494 18.5388L15.4954 18.5384L16.7462 18.2094L16.7469 18.2092C17.2132 18.0874 17.6226 17.8289 17.912 17.4737C18.2005 17.1197 18.3537 16.6891 18.3484 16.248V14.2017C18.3484 13.3102 17.9603 12.4552 17.2696 11.8249C16.5789 11.1945 15.6421 10.8403 14.6653 10.8403H10.2457C9.26887 10.8403 8.33205 11.1945 7.64137 11.8249C6.95067 12.4552 6.56263 13.3102 6.56263 14.2017Z"
                    fill="#7E7E7E"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.4554 1.42859C10.4213 1.42859 8.77232 2.93352 8.77232 4.78993V6.13447C8.77232 7.99087 10.4213 9.49582 12.4554 9.49582C14.4894 9.49582 16.1384 7.99087 16.1384 6.13447V4.78993C16.1384 2.93352 14.4894 1.42859 12.4554 1.42859Z"
                    fill="#7E7E7E"
                  />
                </svg>
                <div className="text-grey truncate max-w-64">
                  {data.user.followers.totalCount}
                </div>
              </div>
            ) : (
              ''
            )}
            {data.user.company ? (
              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  className="shrink-0"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5416 19.415V15.9636H15.9412V19.415C15.9412 19.7382 16.1984 20 16.5159 20H19.4253C19.7428 20 20 19.7382 20 19.415V0.585519C20.0002 0.262369 19.743 0.000292418 19.4255 5.84215e-05C19.4182 5.84215e-05 19.411 0.000292496 19.4037 0.000526493C19.3869 -0.000175498 19.3701 -0.000175498 19.3533 0.000526493C19.3414 0.00263246 19.3292 0.00497235 19.3175 0.00778031L0.466904 3.56172C0.19495 3.61461 -0.00137209 3.8575 7.22251e-06 4.13923V19.4148C7.22251e-06 19.7379 0.257249 19.9998 0.57472 19.9998H12.9669C13.2844 19.9998 13.5416 19.7379 13.5416 19.415ZM12.7156 5.14846C12.7143 4.84683 12.9382 4.59365 13.2329 4.56346C13.252 4.56253 13.2713 4.56253 13.2903 4.56346H16.092C16.4094 4.56346 16.6667 4.82531 16.6667 5.14846V8.10992C16.6667 8.43307 16.4094 8.69491 16.092 8.69491H13.2903C12.9729 8.69491 12.7156 8.43307 12.7156 8.10992V5.14846ZM7.2846 13.8941C7.2846 14.2172 7.02736 14.4791 6.70989 14.4791H3.91518C3.59771 14.4791 3.34047 14.2172 3.34047 13.8941V10.9326C3.33909 10.631 3.56299 10.3778 3.85771 10.3476C3.87679 10.3467 3.8961 10.3467 3.91518 10.3476H6.70966C7.02713 10.3476 7.28437 10.6095 7.28437 10.9326L7.2846 13.8941ZM7.2846 8.10992C7.2846 8.43307 7.02736 8.69491 6.70989 8.69491H3.91518C3.59771 8.69491 3.34047 8.43307 3.34047 8.10992V5.14846C3.33909 4.84683 3.56299 4.59365 3.85771 4.56346C3.87679 4.56253 3.8961 4.56253 3.91518 4.56346H6.70966C7.02713 4.56346 7.28437 4.82531 7.28437 5.14846L7.2846 8.10992ZM11.9756 13.8941C11.9756 14.2172 11.7184 14.4791 11.4009 14.4791H8.59908C8.28161 14.4791 8.02437 14.2172 8.02437 13.8941V10.9326C8.02299 10.631 8.2469 10.3778 8.54161 10.3476C8.56069 10.3467 8.58 10.3467 8.59908 10.3476H11.4009C11.7184 10.3476 11.9756 10.6095 11.9756 10.9326V13.8941ZM11.9756 8.10992C11.9756 8.43307 11.7184 8.69491 11.4009 8.69491H8.59908C8.28161 8.69491 8.02437 8.43307 8.02437 8.10992V5.14846C8.02299 4.84683 8.2469 4.59365 8.54161 4.56346C8.56069 4.56253 8.58 4.56253 8.59908 4.56346H11.4009C11.7184 4.56346 11.9756 4.82531 11.9756 5.14846V8.10992ZM12.7156 13.8941V10.9326C12.7143 10.631 12.9382 10.3778 13.2329 10.3476C13.252 10.3467 13.2713 10.3467 13.2903 10.3476H16.092C16.4094 10.3476 16.6667 10.6095 16.6667 10.9326V13.8941C16.6667 14.2172 16.4094 14.4791 16.092 14.4791H13.2903C12.9729 14.4791 12.7156 14.217 12.7156 13.8941Z"
                    fill="#7E7E7E"
                  />
                </svg>
                <div className="text-grey truncate max-w-64">
                  {data.user.company}
                </div>
              </div>
            ) : (
              ''
            )}
            {data.user.websiteUrl ? (
              <div className="flex flex-row justify-start items-center gap-2">
                <svg
                  className="shrink-0"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.8696 9.65467L10.2618 0.111036C10.1128 -0.0370483 9.88714 -0.0369614 9.73818 0.110993L0.130403 9.65467C0.00940397 9.77486 -0.032171 9.96531 0.0259163 10.1335C0.0840035 10.3017 0.229712 10.4127 0.392207 10.4127H2.48609V19.5655C2.48609 19.8055 2.66173 20 2.87831 20H7.67049C7.88707 20 8.06271 19.8055 8.06271 19.5655V12.9247H11.9373V19.5655C11.9373 19.8055 12.1129 20 12.3295 20H17.1216C17.3382 20 17.5138 19.8055 17.5138 19.5655V10.4127H19.6078C19.7703 10.4127 19.916 10.3017 19.9741 10.1335C20.0322 9.96531 19.9906 9.77486 19.8696 9.65467Z"
                    fill="#7E7E7E"
                  />
                </svg>
                {/* FIXME: Url without http:// will open as a relative link to a 404 page */}
                <a
                  href={data.user.websiteUrl}
                  className="text-grey underline truncate max-w-64"
                >
                  {data.user.websiteUrl}
                </a>
              </div>
            ) : (
              ''
            )}
            {data.user.socialAccounts
              ? data.user.socialAccounts.nodes.map(
                  (
                    e: {
                      provider: socialAccountProvider;
                      displayName: string;
                      url: string;
                    },
                    i: number
                  ) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-row justify-start items-center gap-2"
                      >
                        {socialProviderIcon[e.provider]}
                        <a
                          href={e.url}
                          className="text-grey underline truncate max-w-64"
                        >
                          {e.displayName}
                        </a>
                      </div>
                    );
                  }
                )
              : ''}
          </div>
        </div>
      </div>
      <a
        href={`https://github.com/${data.user.login}`}
        className="text-primary font-bold text-base flex flex-row gap-1 items-center"
      >
        View on Github{' '}
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8234 2.38253C10.3036 2.38253 9.88203 1.96099 9.88203 1.44116C9.88203 0.921543 10.3036 0.5 10.8234 0.5H15.0588C15.5783 0.5 16 0.921943 16 1.44116V5.67681C16 6.19643 15.5785 6.61797 15.0588 6.61797C14.5392 6.61797 14.1177 6.19643 14.1177 5.67681V3.71321L8.66544 9.16544C8.29794 9.53274 7.70206 9.53274 7.33456 9.16544C6.96726 8.79794 6.96726 8.20206 7.33456 7.83456L12.7868 2.38253H10.8234ZM14.1177 9.44126C14.1177 8.92144 14.5392 8.5001 15.0588 8.5001C15.5785 8.5001 16 8.92144 16 9.44126V15.5588C16 16.0785 15.5785 16.5 15.0588 16.5H0.941165C0.421543 16.5 0 16.0785 0 15.5588V1.44116C0 0.921543 0.421543 0.5 0.941165 0.5H7.05874C7.57856 0.5 8.0001 0.921543 8.0001 1.44116C8.0001 1.96099 7.57856 2.38253 7.05874 2.38253H1.88253V14.6177H14.1177V9.44126Z"
            fill="#E6EDF3"
          />
        </svg>
      </a>
      <div className="border-t border-white pt-4 flex flex-col items-start w-full">
        <div className="flex flex-row gap-2 text-xl font-bold text-white mb-4">
          <div>Repositories</div>
          {/* FIXME: Repository count shows total of public and private repos */}
          <div className="text-grey">{data.user.repositories.totalCount}</div>
        </div>
        <div className="mb-5 pb-5 border-b border-grey text-grey w-full gap-2 flex flex-row flex-wrap items-center">
          {/* TODO: Abstract this element out into its own component */}
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search"
            onKeyDown={search}
            className="bg-grey-dark text-grey focus:text-white focus:outline-primary outline-primary/0 flex grow rounded-full outline outline-1 outline-offset-2 transition-all duration-300 py-2 px-4"
          />
          <div>
            Language:{' '}
            <select
              className="outline-none focus:outline-none py-2 px-4 bg-grey-dark text-grey rounded-3xl appearance-none"
              value={state.language ? state.language : undefined}
              onChange={handleSelectChange}
            >
              <option value="">Any Language</option>
              {languages.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <RepositoryBrowser
        login={data.user.login}
        language={state.language}
        query={state.query}
      />
    </main>
  );
};

export default UserPage;
