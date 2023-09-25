import { Helmet } from "react-helmet";

import FooterComponent from "../footer";
import NavbarComponent from "../navbar";
import Home from "./home";

const HomeComponent = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movies - Iliyas</title>
        <meta
          name="description"
          content="Movies platform to savour your time by wathcing movies from watchlist."
        />
      </Helmet>
      <NavbarComponent />
      <Home />
      <FooterComponent />
    </>
  );
};

export default HomeComponent;
