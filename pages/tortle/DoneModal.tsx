import React from "react";

type DoneModal = {
  visible: boolean;
  onShare: () => void;
  onDismiss: () => void;
};

const DoneModal: React.FC<DoneModal> = (props) => {
  const [timeRemaining, setTimeRemaining] = React.useState<string>("");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        props.onDismiss();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [props.onDismiss]);

  React.useEffect(() => {
    if (!props.visible) {
      return;
    }

    const printTimeRemaining = (): string => {
      const now = new Date();
      const hours = 24 - now.getHours() - 1;
      const minutes = 60 - now.getMinutes() - 1;
      const seconds = 60 - now.getSeconds();

      const padStart = (n: number) => n.toString().padStart(2, "0");
      return [hours, minutes, seconds].map(padStart).join(":");
    };

    let timeout: NodeJS.Timeout;
    const callback = () => {
      setTimeRemaining(printTimeRemaining());
      timeout = setTimeout(() => callback(), 1000);
    };

    callback();

    return () => clearTimeout(timeout);
  }, [props.visible]);

  return (
    <div className={`${props.visible ? "block" : "hidden"} fixed`}>
      <div className="fixed z-10 flex flex-col items-center justify-center inset-0 bg-gray-700 bg-opacity-50 h-screen w-screen">
        <div className="flex flex-col p-4 shadow-xl rounded-lg bg-white m-2">
          <p className="font-bold">Copied results to clipboard</p>
        </div>
        <div
          ref={ref}
          className="flex flex-col p-4 shadow-xl rounded-lg bg-white"
        >
          <div className="flex flex-col m-2 p-2 border-b text-center">
            <h2 className="text-xl font-bold">next tortle</h2>
            <p className="text-3xl p-2 tabular-nums">{timeRemaining}</p>
          </div>
          <button
            className="bg-green-500 text-slate-50 text-lg rounded-lg py-2 px-8 my-2 mx-auto"
            onClick={props.onShare}
          >
            share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoneModal;
