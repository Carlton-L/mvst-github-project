interface Props {
  user: any;
}

const UserSearchResult = ({ user }: Props) => {
  return (
    <li className="mt-3 flex flex-row">
      <div className="rounded-3xl bg-grey-dark">
        <div className="p-3 flex flex-row">
          <div className="flex rounded-full bg-primary size-16 mr-3 flex-shrink-0"></div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h4 className="font-bold">{user.node.name}</h4>
              <h5 className="text-grey">{user.node.login}</h5>
              <p className="text-sm">{user.node.bio}</p>
            </div>
            <div className="flex flex-row mt-4">
              <div>Location: {user.node.location}</div>
              <div className="mx-4">|</div>
              <div>Followers: {user.node.followers.totalCount}</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserSearchResult;
