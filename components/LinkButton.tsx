import Link from "next/link";

type LinkButtonProps = {
  href: string;
};

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  return (
    <Link href={{ pathname: props.href }}>
      <a className="p-2 text-center border shadow-sm border-slate-300 w-24 rounded-xl hover:text-sky-500 hover:border-sky-500 focus:text-sky-600">
        {props.children}
      </a>
    </Link>
  );
};

export default LinkButton;
