import Link from "next/link";
import Image from "next/image";
import globals from "@lib/globals";
import Nav from "@components/Nav";

import profile from "public/images/profile.jpg";

const Header: React.FC = () => (
  <header className="flex min-w-full p-4 items-center">
    <Link href={{ pathname: "/" }}>
      <a className="flex hover:text-sky-600 items-center">
        <div className="h-9 w-9">
          <Image
            src={profile}
            alt="Picture of the author"
            className="rounded-xl"
          />
        </div>
        <span className="mx-2">{globals.name}</span>
      </a>
    </Link>
    <div className="flex flex-1 justify-end">
      <Nav />
    </div>
  </header>
);

export default Header;
