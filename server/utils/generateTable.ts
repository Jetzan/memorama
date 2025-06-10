// utils/generateTable.ts

const vector = [
  "C", "CPP", "Java", "JavaScript", "Python", "Ruby", "PHP", "Swift",
  "Go", "Rust", "CSharp", "CSS", "HTML", "MySQL", "R", "Perl", "Node", "React"
];

function countOcurrences(matrix: string[][], value: string): number {
  return matrix.flat().filter((item) => item === value).length;
}
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createMatrix(row: number, col: number): string[][] {
  const total = row * col;
  if (total % 2 !== 0) throw new Error("El total de celdas debe ser par");

  const numPairs = total / 2;
  const selected = shuffleArray(vector).slice(0, numPairs);
  const duplicated = shuffleArray([...selected, ...selected]); // pares

  const matrix: string[][] = [];
  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      matrix[i][j] = duplicated[i * col + j];
    }
  }

  return matrix;
}


export const createTableEasy = (): string[][] => {
  return createMatrix(4, 3);
};

export const createTableMedium = (): string[][] => {
  return createMatrix(5, 4);
};

export const createTableHard = (): string[][] => {
  return createMatrix(7, 4);
};

export const getValueInTable = (table: string[][], x: number, y: number): string => {
  return table[x][y];
};
