import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Board, DoneModal, share, useGame } from "@modules/wordle";
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
        timerMessage={`next ${ANSWER}`}
        message={message}
        onShare={() => share(board, winner ? `🐢 ${ANSWER} 🐢` : ANSWER)}
        onDismiss={() => setDoneVisible(false)}
      />
    </div>
  );
};

export default Tortle;
