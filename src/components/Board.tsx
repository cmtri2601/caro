import { IWinner } from './Game';
import Row from './Row';

interface IBoard {
  squares: string[][];
  winner?: IWinner;
  onClick: (i: number, j: number) => void;
}

const Board = ({ squares, winner, onClick }: IBoard) => {
  // renderSquare(i) {
  //   return (
  //     <Square
  //       value={this.props.squares[i]}
  //       onClick={() => this.props.onClick(i)}
  //     />
  //   );
  // }
  const board = squares.map((row, idx) => {
    const k = 'r' + idx;
    return <Row winner={winner} rowIdx={idx} row={row} onClick={onClick} key={k} />;
  });

  return <>{board}</>;
};

export default Board;
