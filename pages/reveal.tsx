import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  Board,
  DoneModal,
  LetterState,
  useGame,
  useGetWord,
} from "@modules/wordle";
import Keyboard from "@components/Keyboard";

const TITLE = "reveal";
const ATTEMPTS = 6;

const Reveal: NextPage = () => {
  const [doneVisible, setDoneVisible] = React.useState(false);
  const keyboardRef = React.useRef<HTMLDivElement>(null);

  const { data: answer, loading, error } = useGetWord();

  const { board, activeRow, done, winner, onKey, keyState } = useGame({
    answer: answer,
    limit: ATTEMPTS,
  });

  const keyColor: Partial<Record<string, string>> = {};
  Object.keys(keyState).forEach((key) => {
    const state = keyState[key];
    let color: string | undefined = undefined;
    switch (state) {
      case LetterState.CORRECT:
        color = "bg-green-600";
        break;
      case LetterState.MISPLACED:
        color = "bg-yellow-500";
        break;
      case LetterState.INVALID:
        color = "bg-slate-800";
        break;
    }

    keyColor[key] = color;
  });

  const message = winner
    ? "⭐️ you got it ⭐️"
    : "you did not get it\ntry again tomorrow";

  const share = () => {
    const darkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const results = board
      .map((row) =>
        row
          .map((t) => {
            switch (t.state) {
              case LetterState.CORRECT:
                return "🟩";
              case LetterState.MISPLACED:
                return "🟨";
              default:
                return darkMode ? "⬛️" : "⬜";
            }
          })
          .join("")
      )
      .join("\n");

    const title = winner ? `⭐️ ${TITLE} ⭐️` : TITLE;
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
        <title>{TITLE}</title>
      </Head>
      <div className="grid grid-cols-3 self-stretch border-b p-2">
        <div className="flex items-center">
          <Link href={{ pathname: "/" }}>
            <a className="p-2 text-2xl">⭐️</a>
          </Link>
        </div>
        <h1 className="text-5xl font-bold text-slate-700">{TITLE}</h1>
      </div>

      {!loading && (
        <Board
          maxAttempts={ATTEMPTS}
          letterCount={answer.length}
          done={done}
          board={board}
          activeRow={activeRow}
        />
      )}

      <Keyboard ref={keyboardRef} onKeyPress={onKey} colorMap={keyColor} />

      <DoneModal
        visible={doneVisible}
        title={TITLE}
        message={message}
        onShare={() => share()}
        onDismiss={() => setDoneVisible(false)}
      />
    </div>
  );
};

export default Reveal;
