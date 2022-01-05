import Link from "next/link";
import Image from "next/image";
import globals from "@lib/globals";
import Nav from "@components/Nav";

import profile from "data/images/profile.jpg";

const Header: React.FC = () => (
  <div className="header flex min-w-full p-4 items-center">
    <Image
      src={profile}
      alt="Picture of the author"
      width={36}
      height={36}
      placeholder="blur"
      className="rounded-2xl"
    />
    <Link href={{ pathname: "/" }}>
      <a className="text-center hover:text-blue-500 mx-2">{globals.name}</a>
    </Link>
    <div className="flex flex-1 justify-end">
      <Nav />
    </div>
  </div>
);

export default Header;
