export const enum LetterState {
  UNKNOWN,
  INVALID,
  MISPLACE,
  CORRECT,
}

export type AnswerTile = {
  value: string;
  state: LetterState;
};
