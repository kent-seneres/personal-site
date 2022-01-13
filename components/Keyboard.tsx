import React from "react";

type KeyProps = {
  value: string;
  onClick: (key: string) => void;
};

const Key: React.FC<KeyProps> = (props) => {
  return (
    <button
      className="flex flex-1 items-center justify-center bg-slate-300 rounded-md m-0.5"
      onClick={() => props.onClick(props.value)}
    >
      <span className={`text-xl py-2 ${props.value.length > 0 ? "px-2" : ""}`}>
        {props.value}
      </span>
    </button>
  );
};

const ROW_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const ROW_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const ROW_3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "⌫"];

type KeyboardProps = {
  onKeyPress: (value: string) => void;
};

const Keyboard: React.FC<KeyboardProps> = (props) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (/^[a-zA-Z]$|\b(Enter|Backspace)\b/.test(e.key)) {
      props.onKeyPress(e.key.toLowerCase());
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [props.onKeyPress]);

  const mapToKey = (k: string) => (
    <Key key={k} value={k} onClick={props.onKeyPress} />
  );

  return (
    <div className="flex p-4 flex-col self-stretch items-stretch align-items-center">
      <div className="flex">{ROW_1.map(mapToKey)}</div>
      <div className="flex mx-6">{ROW_2.map(mapToKey)}</div>
      <div className="flex">{ROW_3.map(mapToKey)}</div>
    </div>
  );
};

export default Keyboard;
