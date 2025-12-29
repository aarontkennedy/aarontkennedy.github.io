import Home from "../apps/portfolio/pages/Home";
import Paddling from "../apps/canoe/pages/Paddling";
import Running from "../apps/running/pages/Running";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const SinglePage = (): JSX.Element => {
  return (
    <div id="top">
      <Header />

      <main>
        <section id="software">
          <Home />
        </section>

        <section id="paddling">
          <Paddling />
        </section>

        <section id="running">
          <Running />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SinglePage;
