import { AnswerTile, LetterState } from "./types";

type TileProps = {
  value: string;
  state: LetterState;
};

const Tile: React.FC<TileProps> = (props) => {
  const color =
    props.state === LetterState.CORRECT
      ? "bg-green-600"
      : props.state === LetterState.INVALID
      ? "bg-slate-700"
      : props.state === LetterState.MISPLACED
      ? "bg-yellow-500"
      : "bg-slate-900";

  const border = props.state === LetterState.UNKNOWN ? "border-2" : "";

  return (
    <div
      className={`flex flex-1 h-16 max-w-[4rem] items-center justify-center border-slate-400 rounded m-0.5 ${color} ${border}`}
    >
      <span className="text-2xl font-bold text-slate-50">{props.value}</span>
    </div>
  );
};

type RowProps = {
  length: number;
  values: string[] | AnswerTile[];
};

const Row: React.FC<RowProps> = (props) => {
  const padEnd = (
    array: string[] | AnswerTile[],
    minLength: number
  ): string[] | AnswerTile[] => {
    return Object.assign(new Array(minLength).fill(""), array);
  };

  return (
    <div className="flex flex-row justify-center">
      {padEnd(props.values, props.length).map((tile, i) =>
        typeof tile === "string" ? (
          <Tile key={`${tile}${i}`} value={tile} state={LetterState.UNKNOWN} />
        ) : (
          <Tile
            key={`${tile.value}${i}`}
            value={tile.value}
            state={tile.state}
          />
        )
      )}
    </div>
  );
};

type BoardProps = {
  maxAttempts: number;
  letterCount: number;

  board: AnswerTile[][];
  activeRow: string[];

  done: boolean;
};

const Board: React.FC<BoardProps> = (props) => {
  return (
    <div className="flex flex-col my-4 self-stretch">
      {Array(props.maxAttempts)
        .fill(0)
        .map((_, i) => (
          <Row
            key={`row-${i}`}
            length={props.letterCount}
            values={
              i < props.board.length
                ? props.board[i]
                : i === props.board.length
                ? props.activeRow
                : []
            }
          />
        ))}
    </div>
  );
};

export default Board;
