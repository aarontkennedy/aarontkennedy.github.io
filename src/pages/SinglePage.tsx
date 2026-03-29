import { useEffect } from "react";
import Home from "../apps/portfolio/pages/Home";
import Paddling from "../apps/canoe/pages/Paddling";
import Running from "../apps/running/pages/Running";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./SinglePage.scss";

const HorizontalRule = () => <hr className="singlepage__horizontal-rule" />;

const SinglePage = (): JSX.Element => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView();
    }
  }, []);

  return (
    <div id="top">
      <Header />

      <main>
        <section id="software">
          <Home />
        </section>
        <HorizontalRule />

        <section id="paddling">
          <Paddling />
        </section>
        <HorizontalRule />

        <section id="running">
          <Running />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SinglePage;
