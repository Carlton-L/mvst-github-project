import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="min-w-screen min-h-screen bg-black text-white px-3">
      <div className="flex flex-col justify-between max-w-screen-lg min-h-screen mx-auto">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Root;
