import { Link } from "react-router-dom";
import "./Header.scss";
// import DropdownMenu from "./DropdownMenu";
import logo from "../../images/tenKPaddlesHorizontal.png";

const Header = () => {
  return (
    <div className="header__container">
      <nav className="header__nav">
        <div className="header__nav-left">
          <Link to="/">
            <img className="header__logo" src={logo} />
          </Link>
        </div>
        {/* <div className="header__nav-right">
          <DropdownMenu
          title="Fun"
          items={[
            { label: "Paddling", href: "/paddling" },
            { label: "Oshikwanyama", href: "/kwanyama" },
          ]}
        /> 
          <DropdownMenu
            title="Tools"
            items={[{ label: "Lat/Long Recorder", href: "/latlongrecorder" }]}
          />
        </div> */}
      </nav>
    </div>
  );
};

export default Header;
