import { Link } from "react-router-dom";
import { useState } from "react";
import { FiArrowRight, FiMenu } from "react-icons/fi";

import NavItems from "./navItems";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(!show);
  };

  const contactBtn = (
    <div className="hidden flex-row space-x-1 items-center text-sm lg:flex">
      <Link to={"/"} className="bg-[#181818] rounded-full py-2 px-7">
        Contact Us
      </Link>
      <Link to={"/"} className="bg-[#181818] rounded-full p-[0.6rem] text-sm">
        <FiArrowRight />
      </Link>
    </div>
  );

  return (
    <div className="flex flex-row justify-between h-14 py-10 items-center md:px-36 lg:px-56 sm:px-24 px-3">
      <img src="/logo.png" className="h-12 w-28" />
      <div className="hidden md:block">
        <NavItems />
      </div>
      {contactBtn}
      <button
        className="bg-[#181818] rounded-full p-[0.6rem] text-sm md:hidden relative"
        onClick={handleOpen}
      >
        <FiMenu />
        {show && (
          <div className="absolute top-10 bg-[#181818] rounded-xl p-[0.6rem] right-0">
            <NavItems />
            {contactBtn}
          </div>
        )}
      </button>
    </div>
  );
};

export default Header;
