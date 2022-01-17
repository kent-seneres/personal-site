import React from "react";

type DoneModal = {
  visible: boolean;
  message: string;
  onShare: () => void;
  onDismiss: () => void;
};

const DoneModal: React.FC<DoneModal> = (props) => {
  const [timeRemaining, setTimeRemaining] = React.useState<string>("");
  const ref = React.useRef<HTMLDivElement>(null);

  const [showCopy, setShowCopy] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setAnimate(props.visible), 250);
    return () => clearTimeout(timeout);
  }, [props.visible]);

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
  }, [props]);

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

  const onShare = () => {
    setShowCopy(true);
    setTimeout(() => setShowCopy(false), 2500);

    props.onShare();
  };

  return (
    <div
      className={`${props.visible ? "block" : "hidden"} ${
        animate ? "opacity-100" : "opacity-0"
      } fixed transition-opacity`}
    >
      <div className="fixed z-10 flex flex-col items-center justify-center inset-0 bg-slate-700/60 h-screen w-screen">
        <div
          className={`${
            showCopy ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300  p-4 shadow-xl rounded-lg bg-white m-2`}
        >
          <p className="font-bold">Copied results to clipboard</p>
        </div>
        <div
          ref={ref}
          className={`flex flex-col p-8 shadow-xl rounded-lg bg-white ${
            animate ? "scale-100" : "scale-0"
          } transition-transform`}
        >
          <div className="flex flex-col border-b text-center">
            <p className="pb-8 whitespace-pre-line">{props.message}</p>
            <h2 className="text-xl font-bold">next tortle</h2>
            <p className="text-3xl p-4 tabular-nums">{timeRemaining}</p>
          </div>
          <button
            className="bg-green-600 hover:bg-green-500 text-slate-50 text-lg rounded-lg py-2 px-10 mt-8 mx-auto"
            onClick={onShare}
          >
            share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoneModal;
