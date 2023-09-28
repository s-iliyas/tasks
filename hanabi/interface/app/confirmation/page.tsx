import Link from "next/link";
import { FiCheck } from "react-icons/fi";

const Confirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
      <strong className="text-7xl text-green-400">
        <FiCheck />
      </strong>
      <strong>Success, you can go to homepage.</strong>
      <Link
        href={"/"}
        className="border-sky-300 border text-xl hover:text-sky-300 rounded-md text-center py-1 px-5"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default Confirmation;
