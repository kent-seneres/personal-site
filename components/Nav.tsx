import React from "react";
import { FiXCircle, FiMoreVertical } from "react-icons/fi";
import LinkButton from "@components/LinkButton";

const NavItems: React.FC = () => {
  return (
    <div className="text-sm font-medium">
      <div className="flex flex-col space-y-2 sm:flex-row sm:flex-wrap sm:space-y-0 sm:space-x-2">
        <LinkButton href="/blog">Blog</LinkButton>
        <LinkButton href="/photos">Photos</LinkButton>
        <LinkButton href="/projects">Projects</LinkButton>
        {/* <LinkButton href="/guestbook">Guestbook</LinkButton> */}
        <LinkButton href="/about">About</LinkButton>
      </div>
    </div>
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
      <div className="fixed z-10 flex justify-end items-start inset-0 bg-sky-100/60 h-full w-full">
        <div className="flex m-4 p-4 shadow-lg rounded-lg bg-sky-50">
          <NavItems />
          <button className="self-start ml-4 py-1" onClick={props.onDismiss}>
            <FiXCircle className="h-6 w-6 opacity-60 hover:opacity-100" />
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
        <FiMoreVertical className="h-6 w-6 opacity-60 hover:opacity-100" />
      </button>
      <NavModal
        visible={optionsVisible}
        onDismiss={() => setOptionsVisible(false)}
      />
    </div>
  );
};

export default Nav;
