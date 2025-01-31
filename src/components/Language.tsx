"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import clsx from "clsx";

const languages = ["English", "Français", "Español"];

interface LanguageProps {
  className?: string;
}

const Language: React.FC<LanguageProps> = ({ className = "" }) => {
  const [language, setLanguage] = useState("English");

  return (
    <div className={clsx("font-medium", className)}>
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 rounded-md transition duration-300 hover:bg-white hover:text-orange-500">
          <span>{language}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-orange-500 text-orange-500 transition duration-300 hover:border-orange-500 hover:bg-white hover:text-orange-500">
            <MdKeyboardArrowDown className="text-lg" />
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-white shadow-lg border border-orange-500 focus:outline-none">
            <div className="flex flex-col">
              {languages.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className="w-full px-3 py-2 text-left text-gray-900 transition duration-300 hover:bg-orange-500 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Language;
