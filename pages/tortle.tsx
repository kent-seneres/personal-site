import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Keyboard from "@components/Keyboard";

const enum LetterState {
  UNKNOWN,
  INVALID,
  MISPLACE,
  CORRECT,
}

type TileProps = {
  value: string;
  state: LetterState;
};

const Tile: React.FC<TileProps> = (props) => {
  const color =
    props.state === LetterState.CORRECT
      ? "bg-green-500"
      : props.state === LetterState.INVALID
      ? "bg-slate-600"
      : props.state === LetterState.MISPLACE
      ? "bg-yellow-500"
      : "bg-slate-900";

  return (
    <div
      className={`flex items-center justify-center border-2 border-slate-400 w-16 h-16 m-0.5 ${color}`}
    >
      <span className="text-2xl font-bold text-slate-50">{props.value}</span>
    </div>
  );
};

type AnswerTile = {
  value: string;
  state: LetterState;
};

type BoardProps = {
  size: number;
  board: AnswerTile[][];
  activeRow: string[];

  done: boolean;
};
const Board: React.FC<BoardProps> = (props) => {
  return (
    <div className="flex flex-col my-4">
      {props.board.map((row, i) => (
        <div key={`${row.join()}${i}`} className="flex">
          {row.map((tile, i) => (
            <Tile
              key={`${tile.value}${i}`}
              value={tile.value}
              state={tile.state}
            />
          ))}
        </div>
      ))}
      {!props.done && (
        <div className="flex">
          {Array(props.size)
            .fill("")
            .map((tile, i) => (
              <Tile
                key={`active-${tile.value}${i}`}
                value={props.activeRow[i]}
                state={tile}
              />
            ))}
        </div>
      )}
    </div>
  );
};

type GameProps = {
  answer: string;
  limit: number;
};
const useGame = ({ answer, limit }: GameProps) => {
  const [board, setBoard] = React.useState<AnswerTile[][]>([]);
  const [activeRow, setActiveRow] = React.useState<string[]>([]);

  const [done, setDone] = React.useState(false);
  const [winner, setWinner] = React.useState(false);

  const submit = () => {
    if (activeRow.length !== answer.length) {
      return;
    }

    let result = activeRow.map((value, index) => {
      const state =
        answer[index] === value
          ? LetterState.CORRECT
          : answer.includes(value)
          ? LetterState.MISPLACE
          : LetterState.INVALID;

      return { value, state };
    });

    const correctKeys = result.filter((t) => t.state === LetterState.CORRECT);

    result = result.map((t, i, arr) => {
      if (
        t.state === LetterState.MISPLACE &&
        correctKeys.find((correctTile) => t.value === correctTile.value)
      ) {
        return { ...t, state: LetterState.INVALID };
      }

      if (
        arr
          .slice(0, i)
          .some(
            (previous) =>
              t.value === previous.value && t.state !== LetterState.CORRECT
          )
      ) {
        return { ...t, state: LetterState.INVALID };
      }

      return t;
    });

    const win = result.every((t) => t.state === LetterState.CORRECT);
    setWinner(win);

    if (win || board.length + 1 === limit) {
      setDone(true);
    }

    setBoard((board) => [...board, result]);
    setActiveRow([]);
  };

  const backSpace = () => setActiveRow((b) => b.slice(0, -1));

  const add = (c: string) => {
    if (activeRow.length === answer.length) {
      return;
    }

    setActiveRow((b) => [...b, c]);
  };

  const onKey = (value: string) => {
    if (done) {
      return;
    }

    switch (value) {
      case "enter":
        submit();
        break;
      case "⌫":
      case "backspace":
        backSpace();
        break;
      default:
        add(value);
    }
  };

  return { board, activeRow, done, winner, onKey };
};

type DoneModal = {
  visible: boolean;
  onShare: () => void;
  onDismiss: () => void;
};
const DoneModal: React.FC<DoneModal> = (props) => {
  const [timeRemaining, setTimeRemaining] = React.useState<string>("");

  React.useEffect(() => {
    document.addEventListener("click", props.onDismiss, true);
    return () => {
      document.removeEventListener("click", props.onDismiss, true);
    };
  }, [props.onDismiss]);

  const printTimeRemaining = (): string => {
    const now = new Date();
    const hours = 24 - now.getHours() - 1;
    const minutes = 60 - now.getMinutes() - 1;
    const seconds = 60 - now.getSeconds();

    const padStart = (n: number) => n.toString().padStart(2, "0");
    return [hours, minutes, seconds].map(padStart).join(":");
  };

  React.useEffect(() => {
    if (!props.visible) {
      return;
    }

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
      <div className="fixed z-10 flex items-center justify-center inset-0 bg-gray-700 bg-opacity-50 h-screen w-screen">
        <div className="flex flex-col min-w-[35%] p-4 shadow-xl rounded-lg bg-white">
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

const ANSWER = "tortle";

const Tortle: NextPage = () => {
  const [doneVisible, setDoneVisible] = React.useState(false);

  const { board, activeRow, done, winner, onKey } = useGame({
    answer: ANSWER,
    limit: 1,
  });

  const share = () => {
    const results = board[board.length - 1]
      .map((t) => {
        switch (t.state) {
          case LetterState.CORRECT:
            return "🟩";
          case LetterState.MISPLACE:
            return "🟨";
          default:
            return "⬜";
        }
      })
      .join(" ");

    const title = winner ? `🐢 ${ANSWER} 🐢` : ANSWER;
    navigator.clipboard.writeText(`${title}\n\n${results}`);
  };

  React.useEffect(() => {
    if (done) {
      setDoneVisible(true);
    }
  }, [done]);

  return (
    <div className="flex flex-col m-auto max-w-lg min-h-screen items-center justify-between">
      <Head>
        <title>{ANSWER} - a daily word thing</title>
      </Head>
      <h1 className="text-6xl font-bold border-b p-2 m-4">{ANSWER}</h1>

      <Board
        size={ANSWER.length}
        done={done}
        board={board}
        activeRow={activeRow}
      />
      <Keyboard onKeyPress={onKey} />

      <DoneModal
        visible={doneVisible}
        onShare={() => share()}
        onDismiss={() => setDoneVisible(false)}
      />
    </div>
  );
};

export default Tortle;
