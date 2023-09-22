import { Link } from "react-router-dom";

interface MenuInterface {
  path: string;
  label: string;
  active: boolean;
}

const NavItems = () => {
  const menus: MenuInterface[] = [
    { active: true, path: "/", label: "Solutions" },
    { active: true, path: "/", label: "Services" },
    { active: true, path: "/", label: "About" },
    { active: true, path: "/", label: "Culture" },
  ];

  return (
    <div className="flex flex-col text-start md:flex-row md:space-x-5 text-white text-sm">
      {menus?.map((menu, index) => (
        <Link key={index} to={menu.path} className="hover:opacity-100 opacity-60">
          {menu.label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
