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

  const [keyState, setKeyState] = React.useState<
    Partial<Record<string, LetterState>>
  >({});

  // map of letter and number of instances of the letter in the answer
  const letterCounts = Array.from(answer).reduce(
    (acc: Record<string, number>, c: string) => {
      return { ...acc, [c]: acc[c] ? acc[c] + 1 : 1 };
    },
    {}
  );

  const submit = () => {
    if (activeRow.length !== answer.length) {
      return;
    }

    const result = activeRow.map((value, index) => {
      const state =
        answer[index] === value
          ? LetterState.CORRECT
          : answer.includes(value)
          ? LetterState.MISPLACED
          : LetterState.INVALID;

      return { value, state };
    });

    // adjust the correct letter counts of the submitted answer
    const answerCounts = { ...letterCounts };
    result.forEach((t) => {
      if (t.state === LetterState.CORRECT) {
        answerCounts[t.value] -= 1;
      }
    });

    // clean up potentially duplicate letters in the row
    result.forEach((t) => {
      if (t.state === LetterState.MISPLACED) {
        if (answerCounts[t.value] === 0) {
          t.state = LetterState.INVALID;
        } else {
          answerCounts[t.value] -= 1;
        }
      }
    });

    // update global key states
    // sort to avoid overriding correct with misplaced state
    [...result]
      .sort((a, b) => a.state - b.state)
      .forEach((t) => {
        const currentState = keyState[t.value] ?? LetterState.UNKNOWN;
        const newState = t.state > currentState ? t.state : currentState;

        setKeyState((current) => ({ ...current, [t.value]: newState }));
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

  return { board, activeRow, done, winner, onKey, keyState };
};

export default useGame;
