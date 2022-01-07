import Image from "next/image";
import globals from "@lib/globals";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center w-full h-16">
      <span className="text-sm">
        © {year} {globals.name} • Powered by{" "}
      </span>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="h-4 w-16 ml-1 relative">
          <Image src="/vercel.svg" alt="Vercel Logo" layout="fill" />
        </div>
      </a>
    </footer>
  );
};

export default Footer;
