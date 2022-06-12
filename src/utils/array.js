const randomArrayWithUniqueValue = arraySize => {
  const array = Array.from({length: arraySize}, (v, k) => k + 1);
  const shuffled = array.sort(function () {
    return 0.5 - Math.random();
  });

  const randomArray = shuffled.slice(0, arraySize);
  return randomArray;
};

const getMatrix = (arrayValue, matrixSize) => {
  const matrix = [];
  let loopIndex = 0;
  while (matrix.length < matrixSize) {
    matrix.push(arrayValue.slice(loopIndex, matrixSize + loopIndex));
    loopIndex += 10;
  }
  return matrix;
};

export {randomArrayWithUniqueValue, getMatrix};
