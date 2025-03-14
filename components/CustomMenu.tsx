import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};

const CustomMenu = ({ filters, setState, state, title }: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>
      <Menu as="div" className={"self-start relative"}>
        <div>
          <MenuButton className={"flexCenter custom_menu-btn"}>
            {state || "Select a category"}
            <Image
              src={"/arrow-down.svg"}
              width={10}
              height={5}
              alt="arrow-down"
            />
          </MenuButton>
        </div>
        <MenuItems className={"flexStart custom_menu-items"}>
          {filters.map((tag) => (
            <MenuItem key={tag}>
              <button
                type="button"
                value={tag}
                className="custom_menu-item"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default CustomMenu;
