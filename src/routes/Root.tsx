import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-black text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
