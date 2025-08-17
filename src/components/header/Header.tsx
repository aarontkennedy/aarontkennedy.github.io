import { Link } from "react-router-dom";
import "./Header.scss";
// import DropdownMenu from "./DropdownMenu";
import logo from "../../images/tenKPaddlesHorizontal.png";

const Header = () => {
  return (
    <div className="header__container">
      <nav className="header__nav">
        <Link to="/">
          <img className="header__logo" src={logo} />
        </Link>
        {/* <DropdownMenu
          title="Fun"
          items={[
            { label: "Paddling", href: "/paddling" },
            { label: "Oshikwanyama", href: "/kwanyama" },
          ]}
        />
        <DropdownMenu
          title="Tools"
          items={[{ label: "Lat/Long Recorder", href: "/latlongrecorder" }]}
        /> */}
      </nav>
    </div>
  );
};

export default Header;
