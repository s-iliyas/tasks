import Link from "next/link";
import { FiCheck } from "react-icons/fi";

const Confirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
      {/* Display a green checkmark icon using react-icons */}
      <strong className="text-7xl text-green-400">
        <FiCheck />
      </strong>
      {/* Display a success message */}
      <strong>Success, you can go to the homepage.</strong>
      {/* Create a link to the homepage using Next.js's Link component */}
      <Link
        href={"/"} // Specify the URL to navigate to when the link is clicked
        className="border-sky-300 border text-xl hover:text-sky-300 rounded-md text-center py-1 px-5"
        // Define CSS classes for styling the link
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default Confirmation;
