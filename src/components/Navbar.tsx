import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between px-4 py-4">
      <div>Logo</div>
      <nav className="flex flex-row gap-6">
        <a>Home</a>
        <a>About</a>
        <a>Archive</a>
        <a>Contact</a>
      </nav>
      <a>Join Club</a>
      <div className="px-4 absolute inset-x-0 bottom-0 flex flex-col items-stretch justify-between gap-2">
        <div className="static h-px bg-[rgb(61,67,59)]"></div>
        <div className="static h-px bg-[rgb(61,67,59)]"></div>
      </div>
    </div>
  );
};

export default Navbar;
