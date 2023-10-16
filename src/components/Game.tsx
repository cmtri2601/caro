import { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../logic/calculateWinner';
import { genEmptyBoard } from '../logic/genEmptyBoard';

const defaultWidth = 10;
const defaultHeight = 10;
const minSize = 5;
const maxSize = 25;

export interface IWinner {
  val: string;
  x: number;
  y: number;
  direction: 'ToRight' | 'ToDown' | 'ToRightDown' | 'ToLeftDown';
}

interface ILocation {
  x: number;
  y: number;
}

interface IHistory {
  squares: string[][];
  location: ILocation | null;
}

const Game = () => {
  // state
  const [inputWidth, setInputWidth] = useState<number>(defaultWidth);
  const [inputHeight, setInputHeight] = useState<number>(defaultHeight);
  const [width, setWidth] = useState<number>(defaultWidth);
  const [height, setHeight] = useState<number>(defaultHeight);
  const [history, setHistory] = useState<IHistory[]>([
    {
      squares: genEmptyBoard(defaultWidth, defaultHeight),
      location: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [isDescending, setIsDescending] = useState<boolean>(true);

  // function
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const handleClick = (i: number, j: number) => {
    // get latest state of board
    const latestBoard = history.slice(0, stepNumber + 1);
    // get previous step
    const previousBoard = latestBoard[stepNumber];
    // create new board
    const squares = previousBoard?.squares?.slice();
    // copy previous board to new board
    previousBoard?.squares?.map((row, idx) => {
      if (squares?.[idx]) {
        squares[idx] = row.slice();
      }
      return true;
    });
    // set state of current step
    if (!calculateWinner(squares) && !squares?.[i]?.[j]) {
      squares[i][j] = xIsNext ? 'X' : 'O';
    } else {
      return;
    }
    // set state
    setHistory(pre => pre.concat({ squares: squares, location: { x: i, y: j } }));
    setStepNumber(pre => ++pre);
    setXIsNext(pre => !pre);
  };

  const sort = () => {
    setIsDescending(state => !state);
  };

  const playAgain = () => {
    setHistory([{ squares: genEmptyBoard(width, height), location: null }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInputWidth(val);
    if (val >= minSize && val <= maxSize) {
      setWidth(val);
      setHistory([{ squares: genEmptyBoard(val, height), location: null }]);
      setStepNumber(0);
      setXIsNext(true);
    }
  };
  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInputHeight(val);
    if (val >= minSize && val <= maxSize) {
      setHeight(val);
      setHistory([{ squares: genEmptyBoard(width, val), location: null }]);
      setStepNumber(0);
      setXIsNext(true);
    }
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let moves = history.map((step, move) => {
    const desc = move
      ? 'Go to move #' + move + ' (' + step.location?.x + ',' + step.location?.y + ')'
      : 'Go to game start';
    return stepNumber === move ? (
      <li key={move}>
        <button className="btn-bold" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    ) : (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  if (isDescending) {
    moves = moves.reverse();
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner.val;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const arrow = isDescending ? '↓' : '↑';

  return (
    <div className="content">
      <div className="game-config">
        <span className="fixed-size">Chiều rộng:</span>
        <input
          type="number"
          placeholder="Chiều rộng"
          value={inputWidth}
          onChange={handleChangeWidth}
        />
        <br />
        <span className="fixed-size">Chiều cao:</span>
        <input
          type="number"
          placeholder="Chiều cao"
          value={inputHeight}
          onChange={handleChangeHeight}
        />
        <br />
        <button onClick={playAgain}>Chơi lại!</button>
      </div>
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={handleClick} winner={winner} />
        </div>
        <div className="game-info">
          <div>
            <button onClick={sort}>Thứ tự bước {arrow}</button>
          </div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default Game;
