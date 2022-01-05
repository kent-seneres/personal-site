import Image from "next/image";
import globals from "@lib/globals";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer flex items-center justify-center w-full h-16">
      <p className="text-sm">
        © {year} {globals.name} • Powered by{" "}
      </p>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="h-4 w-16 ml-1 relative">
          <Image src="/vercel.svg" alt="Vercel Logo" layout="fill" />
        </div>
      </a>
    </div>
  );
};

export default Footer;
