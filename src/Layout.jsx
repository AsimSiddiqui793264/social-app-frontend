import { useLocation } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

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