// GET RANDOM ARRAY

export const shuffleArray = (arr) => {
  const shuffledArray = arr.slice(0);
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffleArray;
};

// CREATE MATRIX FROM ARRAY

export const createField = (arr, size) => {
  const arrCopy = arr.slice(0);
  const matrix = [];

  for (let i = 0; i < size; i += 1) {
    const row = arrCopy.splice(0, size);
    matrix.push(row);
  }
  return matrix;
};
