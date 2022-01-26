import globals from "@lib/globals";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center w-full p-4">
      <span className="text-sm font-light">
        © {year} • {globals.name}
      </span>
    </footer>
  );
};

export default Footer;
