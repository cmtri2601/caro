export const genEmptyBoard = (width: number, height: number): string[][] => {
  const tmpArr: string[][] = Array(height);
  for (let i = 0; i < height; i++) {
    tmpArr[i] = Array(width).fill('');
  }
  return tmpArr;
};
