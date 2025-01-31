import React from "react";
import { topNavLinks } from "@/data/content";
import Language from "../Language";
import NavigationItem from "../NavItem";

const TopNav = () => {
  return (
    <div className="hidden lg:block bg-white py-3 shadow-md border-b-2 border-orange-500">
      <div className="container flex items-center justify-between text-sm text-gray-900">
        {/* Navigation Links */}
        <div className="flex items-center space-x-2">
          {topNavLinks.map((item) => (
            <NavigationItem
              key={item.id}
              menuItem={item}
              className="px-2 py-1 border-orange-500 rounded-md transition duration-300 hover:bg-orange-500 hover:text-white"
            />
          ))}
        </div>

        {/* Language Selector */}
        <Language className="px-2 py-1 border-orange-500 rounded-md transition duration-300 " />
      </div>
    </div>
  );
};

export default TopNav;
