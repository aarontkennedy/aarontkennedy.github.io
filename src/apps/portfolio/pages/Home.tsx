import "../../../App.scss";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import "./Home.scss";

const Home = (): JSX.Element => {
  return (
    <div className="home">
      <Header />

      <header>
        <div className="">
          <div className="">
            <h1>Aaron Kennedy</h1>
            <h3>Web Developer</h3>
            <ul>
              <li>
                <b>Home:</b> Minneapolis, MN
              </li>
              <li>
                <b>Email:</b>
                <a href="mailto:aarontkennedy@gmail.com">
                  aarontkennedy@gmail.com
                </a>
              </li>
              <li>
                <b>Resumé:</b>
                <a href="https://docs.google.com/document/d/1ZOG66OMFQVhvMSm3QChruKMHxk89Hs_cvISfTBNevrg">
                  Google Doc
                </a>
              </li>
            </ul>
            <ul className="socialMedia">
              <li>
                <a href="http://www.linkedin.com/in/aaron-kennedy-6a221a156">
                  <i title="LinkedIn" className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UC3NtgCyX7qGbdKblxWGRwSw">
                  <i title="YouTube" className="fab fa-youtube"></i>
                </a>
              </li>
              <li>
                <a href="https://github.com/aarontkennedy">
                  <i title="GitHub" className="fab fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="aboutMe">
        <div>
          <p>
            I have been working with technology in one form or another as long
            as I can remember. I have a degree in Computer Science and worked as
            a software engineer at National Instruments. Even as a teacher, I
            have taught computer classes, coached robotics, and incorporated
            appropriate technology to enhance learning.
          </p>
          <p>
            I love using technology and want to challenge myself as a web
            developer. Currently, I am attending the University of Minnesota as
            part of a web development bootcamp. I look forward to using the
            skills to build some really great sites.
          </p>
        </div>
      </section>

      <section className="workExperience">
        <div>
          <h2>Work Experience</h2>
        </div>
        <ol>
          <li>
            <h4>Lead Engineer</h4>
            <h5>Lone Wolf</h5>
            <h6>September 2018 - Present</h6>
            <p>
              Full stack developmer on the Boost real estate advertising web
              app. Backend work to create ad campaigns via Facebook, Nextdoor
              and display ad apis. Modernized the front end to use React. Lead a
              small team of developers to maintain and build new features.
            </p>
          </li>
          <li>
            <h4>Middle School Math Teacher</h4>
            <h5>Columbia Academy</h5>
            <h6>September 2012 - June 2018</h6>
            <p>
              Middle school math for six years, I also started and coached the
              Columbia Academy FTC Robotics teams for six years.
            </p>
          </li>
          <li>
            <h4>Software Engineer</h4>
            <h5>National Instruments</h5>
            <h6>July 2002 - September 2004</h6>
            <p>
              Engineer the platform abstraction team to enable NI software to
              run on multiple systems. Projects included working on remote
              procedure calls and porting code to the Mac OS X kernel.
            </p>
          </li>
        </ol>
      </section>

      <section className="education">
        <div>
          <h2>Education</h2>
        </div>
        <ol>
          <li>
            <h4>Web Developer Boot Camp</h4>
            <h5>University of Minnesota</h5>
            <h6>Graduating August 2018</h6>
          </li>
          <li>
            <h4>Math Education License</h4>
            <h5>University of Minnesota</h5>
            <h6>Graduated June 2008</h6>
          </li>
          <li>
            <h4>Computer Science BA</h4>
            <h5>University of Minnesota</h5>
            <h6>Graduated May 2002</h6>
          </li>
        </ol>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
