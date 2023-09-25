import { Link, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Drawer } from "antd";

const NavbarComponent = () => {
  const location = useLocation();
  const watchlist = useSelector((state) => state.movie.watchlist);

  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", title: "Home", active: location.pathname === "/" },
    {
      path: "/search",
      title: "Search",
      active: location.pathname === "/search",
    },
    {
      path: "/watchlist",
      title: `Watchlist(${watchlist?.ids?.length})`,
      active: location.pathname === "/watchlist",
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="hidden fixed top-0 right-0 left-0 z-[999] bg-neutral-800 md:flex h-14 flex-row items-center justify-between lg:px-36 md:px-28 border-b-2 border-neutral-700">
        <Link className="text-4xl text-orange-200 font-extrabold" to={"/"}>
          movies
        </Link>
        <div className="flex flex-row space-x-4 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                item.active ? "text-orange-100" : "hover:text-orange-100"
              }
            >
              <strong className="text-sm">{item.title}</strong>
            </Link>
          ))}
        </div>
      </nav>
      <nav className="flex md:hidden fixed top-0 right-0 left-0 z-[999] h-14 flex-row items-center justify-between px-4 bg-neutral-800 border-b-2 border-neutral-700">
        <Link className="text-4xl text-orange-200 font-extrabold" to={"/"}>
          movies
        </Link>
        <Link onClick={handleOpen}>
          <MenuOutlined className="text-xl" />
        </Link>
      </nav>
      <Drawer
        placement="right"
        onClose={handleClose}
        open={open}
        style={{ backgroundColor: "rgb(64 64 64)" }}
        closeIcon={<strong className="text-xl text-white">X</strong>}
        width={250}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                item.active ? "text-orange-100" : "hover:text-orange-100"
              }
            >
              <strong className="text-xl">{item.title}</strong>
            </Link>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default NavbarComponent;
