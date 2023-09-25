import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

import { ThemeContext } from "../../../contexts/themeProvider";

const Navbar = () => {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const toggleTheme = () => {
    setThemeMode(!themeMode);
  };

  return (
    <div className="h-14 px-4 flex flex-row items-center lg:justify-around justify-between">
      <Link to={"/"}>
        <strong className="text-3xl">events</strong>
      </Link>
      <Link onClick={toggleTheme}>
        {themeMode ? (
          <FiSun className="hover:text-sky-600" />
        ) : (
          <FiMoon className="hover:text-black text-gray-400" />
        )}
      </Link>
    </div>
  );
};

export default Navbar;
