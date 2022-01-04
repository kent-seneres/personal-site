import Link from "next/link";

type NavItemProps = {
  destinationPath: string;
  label: string;
};

const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <Link href={{ pathname: props.destinationPath }}>
      <a className="p-2 mx-1 text-center border w-24 rounded-xl hover:text-blue-500 hover:border-blue-500 focus:text-blue-600">
        {props.label}
      </a>
    </Link>
  );
};

export default NavItem;
