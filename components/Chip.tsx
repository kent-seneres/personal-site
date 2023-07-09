import React from "react";

type ChipProps = {
  value: string;
  highlighted?: boolean;
  onClick?: () => void | undefined;
};

const Chip: React.FC<ChipProps> = (props) => {
  return props.highlighted && props.onClick ? (
    <button
      onClick={props.onClick}
      className={`w-min px-2 py-1 text-center rounded-lg text-sm text-slate-50 bg-sky-500 hover:bg-sky-400`}
    >
      {props.value}
    </button>
  ) : (
    <button
      onClick={props.onClick}
      className={`w-min px-2 py-1 text-center rounded-lg text-sm text-slate-500 bg-slate-200 hover:bg-slate-300`}
    >
      {props.value}
    </button>
  );
};

export default Chip;
