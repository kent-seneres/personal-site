import Link from "next/link";
import Image from "next/image";
import globals from "@lib/globals";
import Nav from "@components/Nav";

import profile from "public/images/profile.jpg";

const Header: React.FC = () => (
  <header className="flex min-w-full p-4 items-center">
    <Link href={{ pathname: "/" }}>
      <a className="flex hover:text-sky-500 items-center">
        <Image
          src={profile}
          alt="Picture of the author"
          width={36}
          height={36}
          className="rounded-2xl"
        />
        <span className="mx-2">{globals.name}</span>
      </a>
    </Link>
    <div className="flex flex-1 justify-end">
      <Nav />
    </div>
  </header>
);

export default Header;
