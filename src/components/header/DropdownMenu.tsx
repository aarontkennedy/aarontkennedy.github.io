import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DropdownMenu.scss";

// Define the menu item interface
interface MenuItem {
  label: string;
  href?: string;
  to?: string;
  onClick?: () => void;
}

// Dropdown menu component props
interface DropdownMenuProps {
  title: string;
  items: MenuItem[];
  className?: string;
}

const DropdownMenu = ({
  title,
  items,
  className = "",
}: DropdownMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`dropdown ${className}`}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {title}
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="menu" aria-orientation="vertical">
          <div className="dropdown-menu__items" role="none">
            {items.map((item, index) =>
              item.to ? (
                <Link
                  key={index}
                  to={item.to}
                  onClick={() => handleItemClick(item)}
                  className="dropdown-item"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href || "#"}
                  onClick={() => handleItemClick(item)}
                  className="dropdown-item"
                  role="menuitem"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
