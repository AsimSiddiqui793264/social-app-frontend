import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Landing page par Header/Footer hide
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Header />}

      {children}

      {!isLandingPage && <Footer />}
    </>
  );
};

export default Layout;