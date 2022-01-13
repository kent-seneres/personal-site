import React from "react";

type KeyProps = {
  value: string;
  onClick: (key: string) => void;
};

const Key: React.FC<KeyProps> = (props) => {
  return (
    <button
      className="flex flex-1 h-12 items-center justify-center bg-slate-400 rounded-md m-0.5"
      onClick={() => props.onClick(props.value)}
    >
      <span
        className={`text-md text-slate-50 py-2 ${
          props.value.length > 0 ? "px-2" : ""
        }`}
      >
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

const Keyboard = React.forwardRef<HTMLDivElement, KeyboardProps>(
  (props, ref) => {
    React.useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (/^[a-zA-Z]$|\b(Enter|Backspace)\b/.test(e.key)) {
          props.onKeyPress(e.key.toLowerCase());
        }
      };

      document.addEventListener("keydown", onKeyDown, true);
      return () => {
        document.removeEventListener("keydown", onKeyDown, true);
      };
    }, [props]);

    const mapToKey = (k: string) => (
      <Key key={k} value={k} onClick={props.onKeyPress} />
    );

    return (
      <div
        ref={ref}
        className="flex flex-col self-stretch items-stretch align-items-center"
      >
        <div className="flex">{ROW_1.map(mapToKey)}</div>
        <div className="flex mx-6">{ROW_2.map(mapToKey)}</div>
        <div className="flex">{ROW_3.map(mapToKey)}</div>
      </div>
    );
  }
);

Keyboard.displayName = "Keyboard";

export default Keyboard;
