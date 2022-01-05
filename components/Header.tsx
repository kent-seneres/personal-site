import Link from "next/link";
import globals from "@lib/globals";
import Nav from "@components/Nav";

const Header: React.FC = () => (
  <div className="header flex min-w-full p-4 items-center">
    <Link href={{ pathname: "/" }}>
      <a className="text-center hover:text-blue-500">{globals.name}</a>
    </Link>
    <div className="flex flex-1 justify-end">
      <Nav />
    </div>
  </div>
);

export default Header;
