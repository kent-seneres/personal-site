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
      ? "bg-slate-600"
      : props.state === LetterState.MISPLACE
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

type BoardProps = {
  size: number;
  board: AnswerTile[][];
  activeRow: string[];

  done: boolean;
};

const Board: React.FC<BoardProps> = (props) => {
  return (
    <div className="flex flex-col my-4 self-stretch">
      {props.board.map((row, i) => (
        <div key={`${row.join()}${i}`} className="flex justify-center">
          {row.map((tile, i) => (
            <Tile
              key={`${tile.value}${i}`}
              value={tile.value}
              state={tile.state}
            />
          ))}
        </div>
      ))}
      {!props.done && (
        <div className="flex justify-center">
          {Array(props.size)
            .fill("")
            .map((tile, i) => (
              <Tile
                key={`active-${tile.value}${i}`}
                value={props.activeRow[i]}
                state={LetterState.UNKNOWN}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Board;
