// utils/generateTable.ts

const vector = [
  "C", "C++", "Java", "JavaScript", "Python", "Ruby", "PHP", "Swift",
  "Go", "Rust", "CSharp", "CSS", "HTML", "MySQL", "R", "Perl", "Node", "React"
];

function countOcurrences(matrix: string[][], value: string): number {
  return matrix.flat().filter((item) => item === value).length;
}

function createMatrix(row: number, col: number): string[][] {
  const matrix: string[][] = [];

  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      let value = "";
      do {
        value = vector[Math.floor(Math.random() * vector.length)];
      } while (countOcurrences(matrix, value) >= 2);
      matrix[i][j] = value;
    }
  }

  return matrix;
}

export const createTableEasy = (): string[][] => {
  return createMatrix(4, 6);
};

export const createTableMedium = (): string[][] => {
  return createMatrix(5, 6);
};

export const createTableHard = (): string[][] => {
  return createMatrix(6, 6);
};

export const getValueInTable = (table: string[][], x: number, y: number): string => {
  return table[x][y];
};
