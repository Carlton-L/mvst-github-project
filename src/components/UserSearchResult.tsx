const UserSearchResult = () => {
  return (
    <li className="mt-3 flex flex-row">
      <div className="rounded-3xl bg-grey-dark">
        <div className="p-3 flex flex-row">
          <div className="flex rounded-full bg-primary size-16 mr-3 flex-shrink-0"></div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h4 className="font-bold">{"Johnathan Müller"}</h4>
              <h5 className="text-grey">{"foonathan"}</h5>
              <p className="text-sm">
                {
                  "C++, compilers, and programming languages. Library engineer @think-cell."
                }
              </p>
            </div>
            <div className="flex flex-row mt-4">
              <div>Location</div>
              <div className="mx-4">|</div>
              <div>Followers</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserSearchResult;
