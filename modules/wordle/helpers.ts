import { AnswerTile, LetterState } from ".";

export const share = (board: AnswerTile[][], title: string) => {
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

  navigator.clipboard.writeText(`${title}\n\n${results}`);
};
