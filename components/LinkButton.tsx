import Link from "next/link";

type LinkButtonProps = {
  href: string;
};

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <Link href={{ pathname: props.href }}>
      <a className="p-2 text-center shadow-md w-24 rounded-xl text-slate-50 bg-sky-600 hover:bg-sky-400">
        {props.children}
      </a>
    </Link>
  );
};

export default LinkButton;
