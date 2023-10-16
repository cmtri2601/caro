interface ISquare {
  value: string;
  win: boolean;
  onClick: () => void;
}

const Square = ({ value, win, onClick }: ISquare) => {
  return win ? (
    <button className="square square-highlight" onClick={onClick}>
      {value}
    </button>
  ) : (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
