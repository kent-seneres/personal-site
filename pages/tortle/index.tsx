import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Keyboard from "@components/Keyboard";

import { LetterState } from "./types";
import useGame from "./useGame";
import Board from "./Board";
import DoneModal from "./DoneModal";

const ANSWER = "tortle";

const Tortle: NextPage = () => {
  const [doneVisible, setDoneVisible] = React.useState(false);
  const keyboardRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    keyboardRef.current?.scrollIntoView();
  }, [board]);

  return (
    <div className="absolute inset-0 flex flex-col m-auto p-4 max-w-lg items-center justify-between">
      <Head>
        <title>{ANSWER} - a daily word thing</title>
      </Head>
      <div className="grid grid-cols-3 self-stretch border-b p-2">
        <div className="flex items-center">
          <Link href={{ pathname: "/" }}>
            <a className="p-2 text-2xl">🐢</a>
          </Link>
        </div>
        <h1 className="text-5xl font-bold">{ANSWER}</h1>
      </div>

      <Board
        size={ANSWER.length}
        done={done}
        board={board}
        activeRow={activeRow}
      />

      <Keyboard ref={keyboardRef} onKeyPress={onKey} />

      <DoneModal
        visible={doneVisible}
        onShare={() => share()}
        onDismiss={() => setDoneVisible(false)}
      />
    </div>
  );
};

export default Tortle;
