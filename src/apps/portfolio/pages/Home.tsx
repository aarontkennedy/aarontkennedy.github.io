import "../../../App.scss";
import "./Home.scss";
import soraVideo from "../../../images/soraMeCanoeingAndProgramming.mp4";
import LinkedIn from "../assets/linkedin";
import Github from "../assets/github";
import Youtube from "../assets/youtube";

const Home = (): JSX.Element => {
  return (
    <div className="home">
      <header>
        <div className="home__header-left">
          <h1 className="home__name">Aaron Kennedy</h1>
          <h3 className="home__title">Software Engineer</h3>
          <ul className="home__details">
            <li>
              <a href="mailto:aarontkennedy@gmail.com">
                aarontkennedy@gmail.com
              </a>
            </li>
            <li>
              <a href="https://docs.google.com/document/d/1ZOG66OMFQVhvMSm3QChruKMHxk89Hs_cvISfTBNevrg">
                Resumé
              </a>
            </li>
          </ul>
          <ul className="home__social-media">
            <li>
              <a href="http://www.linkedin.com/in/aaron-kennedy-6a221a156">
                <LinkedIn fillColor="black" width={25} />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UC3NtgCyX7qGbdKblxWGRwSw">
                <Youtube fillColor="black" width={25} />
              </a>
            </li>
            <li>
              <a href="https://github.com/aarontkennedy">
                <Github fillColor="black" width={25} />
              </a>
            </li>
          </ul>
          <div className="home__summary">
            <p>
              I&apos;m a software engineer with a lifelong interest in
              technology and a degree in Computer Science. I currently work at
              Lone Wolf, where since 2018 I&apos;ve helped build the Boost real
              estate advertising platform, working across the full stack from
              React to PHP and MySQL.
            </p>
            <p>
              Before moving fully into software development, I worked as a
              teacher, teaching computer classes, coaching robotics, and
              integrating technology into the classroom. When I&apos;m not
              coding, you&apos;ll usually find me outdoors, canoeing or trail
              running.
            </p>
          </div>
        </div>
        <div className="home__header-right">
          <video
            className="header__video"
            autoPlay
            muted
            loop
            src={soraVideo}
          ></video>
        </div>
      </header>
    </div>
  );
};

export default Home;
