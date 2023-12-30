import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <header></header>
      <Outlet />
      <footer></footer>
    </>
  );
};

export default Root;
