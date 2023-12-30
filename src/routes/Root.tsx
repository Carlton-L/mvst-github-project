import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

export default Root;
