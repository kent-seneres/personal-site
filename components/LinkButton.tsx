import Link from "next/link";

type LinkButtonProps = {
  href: string;
};

const LinkButton: React.FC<React.PropsWithChildren<LinkButtonProps>> = (
  props,
) => {
  return (
    <Link
      className="p-2 text-center shadow-lg w-24 rounded-xl text-slate-50 bg-sky-700 hover:bg-sky-500"
      href={{ pathname: props.href }}
    >
      {props.children}
    </Link>
  );
};

export default LinkButton;
