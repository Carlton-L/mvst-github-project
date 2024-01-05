import UserSearchField from './UserSearchField';

const Header = () => {
  return (
    <header className="border-b border-white p-4 flex gap-5 justify-between items-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_6_379)">
          <path
            d="M24 0.593994C10.74 0.593994 0 11.34 0 24.594C0 35.2 6.876 44.194 16.41 47.364C17.61 47.59 18.05 46.848 18.05 46.21C18.05 45.64 18.03 44.13 18.02 42.13C11.344 43.578 9.936 38.91 9.936 38.91C8.844 36.14 7.266 35.4 7.266 35.4C5.092 33.912 7.434 33.942 7.434 33.942C9.844 34.11 11.11 36.414 11.11 36.414C13.25 40.084 16.728 39.024 18.1 38.41C18.316 36.858 18.934 35.8 19.62 35.2C14.29 34.6 8.688 32.536 8.688 23.34C8.688 20.72 9.618 18.58 11.158 16.9C10.888 16.294 10.078 13.854 11.368 10.548C11.368 10.548 13.378 9.90399 17.968 13.008C19.888 12.474 21.928 12.21 23.968 12.198C26.008 12.21 28.048 12.474 29.968 13.008C34.528 9.90399 36.538 10.548 36.538 10.548C37.828 13.854 37.018 16.294 36.778 16.9C38.308 18.58 39.238 20.72 39.238 23.34C39.238 32.56 33.628 34.59 28.288 35.18C29.128 35.9 29.908 37.372 29.908 39.62C29.908 42.832 29.878 45.412 29.878 46.192C29.878 46.822 30.298 47.572 31.528 47.332C41.13 44.184 48 35.184 48 24.594C48 11.34 37.254 0.593994 24 0.593994Z"
            fill="#E6EDF3"
          />
          <path
            d="M25.5866 40.5015L26.6224 39.4658L25.5866 40.5015C21.4681 36.3827 21.473 29.7026 25.5901 25.5853C29.7094 21.4657 36.3792 21.4752 40.4956 25.5919C43.5371 28.6336 44.3209 33.0718 42.8774 36.8368L48.2461 42.2058C49.9134 43.8733 49.9214 46.5772 48.2494 48.2493C46.5774 49.9213 43.8735 49.9136 42.206 48.246L36.8482 42.8879C33.0419 44.3775 28.628 43.5431 25.5866 40.5015ZM35.8092 35.805C37.3353 34.2788 37.3352 31.8044 35.8092 30.2784C34.2832 28.7523 31.8091 28.7523 30.2832 30.2784C28.7572 31.8045 28.7572 34.2789 30.2832 35.805C31.8092 37.331 34.2832 37.331 35.8092 35.805Z"
            fill="#E6EDF3"
            stroke="#181717"
            stroke-width="3"
          />
        </g>
        <defs>
          <clipPath id="clip0_6_379">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="flex grow">
        <UserSearchField />
      </div>
    </header>
  );
};

export default Header;
