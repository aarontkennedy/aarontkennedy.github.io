import "./Header.scss";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const menuItems = [
    { label: "Lat Long Recorder", to: "/latlongrecorder" },
    { label: "Image URL Viewer", to: "/imageurlviewer" },
    { label: "Road Trip Planner", to: "/parks" },
  ];

  return (
    <div className="header__container">
      <nav className="header__nav">
        <div className="header__nav-left">
          <a href="/#top">Aaron Kennedy</a>
        </div>
        <div className="header__nav-right">
          <a href="/#paddling">Paddling</a>
          <a href="/#running">Running</a>
          <DropdownMenu title="+" items={menuItems} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
