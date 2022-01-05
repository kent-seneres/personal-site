import Link from "next/link";
import React from "react";
import { FiXCircle, FiMoreVertical } from "react-icons/fi";

type NavItemProps = {
  href: string;
};

const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <Link href={{ pathname: props.href }}>
      <a className="p-2 text-center border border-slate-300 w-24 rounded-xl hover:text-sky-500 hover:border-sky-500 focus:text-sky-600">
        {props.children}
      </a>
    </Link>
  );
};

const NavItems: React.FC = () => {
  return (
    <nav className="text-sm font-medium">
      <ul className="flex flex-col space-y-2 sm:flex-row sm:flex-wrap sm:space-y-0 sm:space-x-2">
        <NavItem href="/blog">Blog</NavItem>
        <NavItem href="/pictures">Pictures</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/about">About</NavItem>
      </ul>
    </nav>
  );
};

type NavModalProps = {
  visible: boolean;
  onDismiss: () => void;
};

const NavModal: React.FC<NavModalProps> = (props) => {
  React.useEffect(() => {
    document.addEventListener("click", props.onDismiss, true);
    return () => {
      document.removeEventListener("click", props.onDismiss, true);
    };
  }, [props.onDismiss]);

  return (
    <div className={`${props.visible ? "block" : "hidden"}`}>
      <div className="fixed z-10 flex justify-end items-start inset-0 bg-gray-600 bg-opacity-50 h-full w-full">
        <div className="flex m-4 p-4 shadow-lg rounded-lg bg-white">
          <NavItems />
          <button className="self-start ml-4 py-1" onClick={props.onDismiss}>
            <FiXCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

type NavProps = {
  alwaysVisible?: boolean;
};

const Nav: React.FC<NavProps> = (props) => {
  const [optionsVisible, setOptionsVisible] = React.useState(false);

  if (props.alwaysVisible) {
    return <NavItems />;
  }

  return (
    <div>
      <div className="hidden sm:block">
        <NavItems />
      </div>
      <button
        className="block sm:hidden p-1"
        onClick={() => setOptionsVisible(true)}
      >
        <FiMoreVertical className="h-6 w-6" />
      </button>
      <NavModal
        visible={optionsVisible}
        onDismiss={() => setOptionsVisible(false)}
      />
    </div>
  );
};

export default Nav;
