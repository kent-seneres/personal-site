import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  Board,
  DoneModal,
  LetterState,
  share,
  useGame,
  useGetWord,
} from "@modules/wordle";
import Keyboard from "@components/Keyboard";
import Confetti from "@components/Confetti";

const TITLE = "reveal";
const DEFAULT_LIMIT = 5;

const Reveal: NextPage = () => {
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT);
  const [doneVisible, setDoneVisible] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const keyboardRef = React.useRef<HTMLDivElement>(null);

  const {
    data: answer,
    loading,
    error,
  } = { data: "test", loading: false, error: undefined };

  const { board, activeRow, done, winner, onKey, keyState } = useGame({
    answer: answer,
    limit: limit,
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
    ? `⭐️ you got it ⭐️${limit === DEFAULT_LIMIT ? "" : "\n\n(first try)"}`
    : "you did not get it\ntry again tomorrow";

  const [previousDone, setPreviousDone] = React.useState(done);
  if (done != previousDone) {
    setDoneVisible(done);
    setPreviousDone(done);

    if (done) {
      if (winner) {
        setDoneVisible(true);
      } else {
        // increase limit, so there are no losers
        setLimit((prev) => prev + 1);
      }
    }
  }

  React.useEffect(() => {
    keyboardRef.current?.scrollIntoView();
  }, [board]);

  const [previousWinner, setPreviousWinner] = React.useState(winner);
  if (winner != previousWinner && winner) {
    setPreviousWinner(winner);
    setShowConfetti(winner);
  }

  /**
   * Effect to show confetti on winning and hide after timeout
   */
  React.useEffect(() => {
    const timeout = setTimeout(() => setShowConfetti(false), 30000);
    return () => clearTimeout(timeout);
  }, [winner]);

  return (
    <div>
      {showConfetti && <Confetti />}
      <div className="absolute inset-0 flex flex-col m-auto p-1 max-w-lg items-center justify-between">
        <Head>
          <title>{TITLE}</title>
        </Head>
        <div className="grid grid-cols-3 self-stretch border-b p-2">
          <div className="flex items-center">
            <Link href={{ pathname: "/" }} className="p-2 text-2xl">
              ⭐️
            </Link>
          </div>
          <h1 className="text-5xl font-bold text-slate-700">{TITLE}</h1>
        </div>

        {!loading && (
          <Board
            maxAttempts={limit}
            letterCount={answer.length}
            done={done}
            board={board}
            activeRow={activeRow}
          />
        )}

        <Keyboard ref={keyboardRef} onKeyPress={onKey} colorMap={keyColor} />

        <DoneModal
          visible={doneVisible}
          message={message}
          timerMessage={winner ? undefined : "next reveal"}
          onShare={() => share(board, winner ? `⭐️ ${TITLE} ⭐️` : TITLE)}
          onDismiss={() => setDoneVisible(false)}
        />
      </div>
    </div>
  );
};

export default Reveal;
