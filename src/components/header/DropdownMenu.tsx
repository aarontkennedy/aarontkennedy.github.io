import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";

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
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center text-gray-700 hover:text-black focus:outline-none"
      >
        {title}
        {/* <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        /> */}
        +
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {items.map((item, index) =>
              item.to ? (
                <Link
                  key={index}
                  to={item.href || "#"}
                  onClick={() => handleItemClick(item)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href || "#"}
                  onClick={() => handleItemClick(item)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
