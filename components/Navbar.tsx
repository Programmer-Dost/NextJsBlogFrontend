import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-6 bg-white">
      <div className="flex items-center cursor-pointer">
        <Link href="/">
          <div className="flex items-center">
            <Image src="https://res.cloudinary.com/dkv7cimyy/image/upload/v1684947640/LOGO_mvvenp.png" alt="Logo" height={35} width={40} />
            <span className="font-bold ml-2 text-primary">Next.js Blog</span>
          </div>
        </Link>
      </div>

      <div className="md:hidden">
        <button
          className={`p-2 text-primary-dark transition duration-1000 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          onClick={toggleNavbar}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`md:flex ${
          isOpen ? "flex" : "hidden"
        } items-center justify-center mt-4 transition-all duration-300`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-4">
          <li className="my-2 md:my-0 ">
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-dark transition-colors"
            >
              Products
            </a>
          </li>
          <li className="my-2 md:my-0 ">
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-dark transition-colors"
            >
              Pricing
            </a>
          </li>
          <li className="my-2 md:my-0 ">
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-dark transition-colors"
            >
              Docs
            </a>
          </li>
          <li className="my-2 md:my-0 ">
            <a
              href="#"
              className="block text-gray-600 hover:text-primary-dark transition-colors"
            >
              Company
            </a>
          </li>
          <li className="my-2 md:my-0 ">
            {" "}
            {/* <div className="ml-4"> */}
            <a
              href="#"
              className="  md:bg-primary md:py-2 md:px-4 md:text-white text-primary rounded-sm font-medium hover:bg-primary-dark transition-all"
            >
              Sign up
            </a>{" "}
          </li>
          {/* </div> */}
          {/* <div className="ml-4"> */}
          <li className="my-2 md:my-0 ">
            <a
              href="#"
              className="text-primary hover:text-primary-dark font-medium"
            >
              Log in?
            </a>
            {/* </div> */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
