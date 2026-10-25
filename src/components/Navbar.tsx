import React from "react";

const Navbar = () => {
  return (
    <div className="relative mx-auto flex h-16 w-[97vw] items-center justify-between">
      <div>Logo</div>
      <nav className="nav-links-wrap w-nav-menu">
        <a className="nav-text-body w-nav-link">Home</a>
        <a className="nav-text-body w-nav-link">About</a>
        <a className="nav-text-body w-nav-link">Archive</a>
        <a className="nav-text-body w-nav-link">Contact</a>
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
