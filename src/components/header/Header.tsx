import "./Header.scss";

const Header = () => {
  return (
    <div className="header__container">
      <nav className="header__nav">
        <div className="header__nav-left">
          <a href="/#top">Aaron Kennedy</a>
        </div>
        <div className="header__nav-right">
          <a href="/#paddling">Paddling</a>
          <a href="/#running">Running</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
