import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Root page component which acts as a layout for child routes
 * @returns React component containing header, footer, and outlet for child routes
 */
const Root = (): React.JSX.Element => {
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
