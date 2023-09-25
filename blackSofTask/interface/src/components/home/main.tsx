import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

interface ItemsInterface {
  logo: string;
  active: boolean;
}
const Main = () => {
  const items: ItemsInterface[] = [
    { logo: "/logo-1.svg", active: false },
    { logo: "/logo-1.svg", active: false },
    { logo: "/logo-1.svg", active: false },
    { logo: "/logo-1.svg", active: true },
    { logo: "/logo-1.svg", active: false },
    { logo: "/logo-1.svg", active: false },
    { logo: "/logo-1.svg", active: false },
  ];

  return (
    <div className="md:px-24 lg:px-36 sm:px-16 px-3 flex flex-col space-y-10">
      <div className="flex flex-col lg:flex-row md:space-x-3 md:space-y-0 space-y-5 py-5 ">
        <div className="flex flex-col space-y-5 flex-1">
          <p className="p-5 text-5xl font-light">
            Searching for{" "}
            <strong className="font-semibold">Augmented Development</strong>{" "}
            Teams to steer your product towards triumph?"
          </p>
          <div className="flex-wrap flex gap-5 gap-x-10 p-5">
            <div className="flex flex-col">
              <strong>50+</strong>
              <p className="opacity-60 text-xs">Clients</p>
            </div>
            <div className="flex flex-col">
              <strong>80+</strong>
              <p className="opacity-60 text-xs">
                Projects successfully completed
              </p>
            </div>
            <div className="flex flex-col">
              <strong>60%</strong>
              <p className="opacity-60 text-xs">
                of the clients converted into long-term engagement partners
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-t from-neutral-600 to-neutral-200 rounded-xl text-neutral-900 w-full">
          <form className="py-10 px-5 flex-col flex space-y-10 w-full">
            <p>
              <strong className="font-medium text-xl">
                Fill out the form.
              </strong>
              <br />
              Our team will touch base with you within 24 hours.
            </p>
            <div className="flex flex-wrap w-full gap-2 gap-y-10">
              <input
                className="bg-transparent border-b focus:outline-none border-black grow"
                type="text"
                placeholder="Full Name*"
              />
              <input
                className="bg-transparent border-b focus:outline-none border-black grow"
                type="text"
                placeholder="Email ID*"
              />
            </div>
            <div className="flex flex-wrap w-full gap-2 gap-y-10">
              <input
                className="bg-transparent border-b focus:outline-none border-black grow"
                type="text"
                placeholder="Country"
              />
              <input
                className="bg-transparent border-b focus:outline-none border-black grow"
                type="text"
                placeholder="Contact Number"
              />
            </div>
            <input
              className="bg-transparent border-b focus:outline-none border-black w-full"
              type="text"
              placeholder="Tell us your requirements*"
            />
            <div className="flex-row space-x-1 items-center text-sm flex text-white w-full">
              <Link to={"/"} className="bg-[#181818] rounded-full py-2 px-7">
                Submit
              </Link>
              <Link
                to={"/"}
                className="bg-[#181818] rounded-full p-[0.6rem] text-sm"
              >
                <FiArrowRight />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col space-y-3 justify-center items-center py-5">
        <p className="text-white opacity-60">
          Leading the charge for Industries!
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          {items.map((item, index) => (
            <Link
              to={"/"}
              key={index}
              className="px-10 rounded-md bg-white"
              style={{ opacity: item.active ? "100%" : "60%" }}
            >
              <img src={item.logo} className="h-12 w-16" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
