"use client";

import { Popover, Transition } from "@headlessui/react";
import type { Route } from "next";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import React, { Fragment, useState } from "react";
import clsx from "clsx";

export interface NavItemType {
  id: string;
  name: string;
  href: Route;
  targetBlank?: boolean;
  type?: "dropdown" | "megaMenu" | "none";
  isNew?: boolean;
}

export interface NavigationItemProps {
  children?: ReactNode;
  menuItem: NavItemType;
  changeWidth?: boolean;
  className?: string;
}

const NavigationItem: FC<NavigationItemProps> = ({
  menuItem,
  children,
  changeWidth,
  className = "",
}) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => state.filter((item) => item !== id));
  };

  const renderMainItem = (item: NavItemType) => (
    <div className={clsx("mx-1 flex items-center font-medium", className)}>
      <Link href={item.href || undefined}>
        <span>{item.name}</span>
      </Link>
    </div>
  );

  // ===================== MENU DROPDOWN =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);
    return (
      <Popover
        as="li"
        className="menu-item menu-dropdown relative list-none"
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className={`sub-menu absolute z-10 ${
                  changeWidth ? "w-[670px]" : "w-[300px]"
                } left-0 top-full bg-white shadow-lg border border-orange-500 rounded-md`}
              >
                <div className="relative py-4">{children}</div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  switch (menuItem.type) {
    case "dropdown":
      return renderDropdownMenu(menuItem);
    case "megaMenu":
      return null;
    default:
      return (
        <li className="menu-item shrink-0 list-none">
          {renderMainItem(menuItem)}
        </li>
      );
  }
};

export default NavigationItem;
