import React from "react";
import { AnswerTile, LetterState } from "./types";

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

export default useGame;
