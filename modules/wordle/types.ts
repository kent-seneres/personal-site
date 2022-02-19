export const enum LetterState {
  UNKNOWN,
  INVALID,
  MISPLACED,
  CORRECT,
}

export type AnswerTile = {
  value: string;
  state: LetterState;
};
