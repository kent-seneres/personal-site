import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Board, DoneModal, LetterState, useGame } from "@modules/tortle";
import Keyboard from "@components/Keyboard";

const ANSWER = "tortle";
const ATTEMPTS = 1;

const Tortle: NextPage = () => {
  const [doneVisible, setDoneVisible] = React.useState(false);
  const keyboardRef = React.useRef<HTMLDivElement>(null);

  const { board, activeRow, done, winner, onKey } = useGame({
    answer: ANSWER,
    limit: ATTEMPTS,
  });

  const message = winner
    ? "🐢 you got it 🐢"
    : "you did not get it\ntry again tomorrow";

  const share = () => {
    const darkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const results = board[board.length - 1]
      .map((t) => {
        switch (t.state) {
          case LetterState.CORRECT:
            return "🟩";
          case LetterState.MISPLACE:
            return "🟨";
          default:
            return darkMode ? "⬛️" : "⬜";
        }
      })
      .join("");

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
        <h1 className="text-5xl font-bold text-slate-700">{ANSWER}</h1>
      </div>

      <Board
        maxAttempts={ATTEMPTS}
        letterCount={ANSWER.length}
        done={done}
        board={board}
        activeRow={activeRow}
      />

      <Keyboard ref={keyboardRef} onKeyPress={onKey} />

      <DoneModal
        visible={doneVisible}
        title={ANSWER}
        message={message}
        onShare={() => share()}
        onDismiss={() => setDoneVisible(false)}
      />
    </div>
  );
};

export default Tortle;
