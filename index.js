import { shuffleArray, createField } from './js/utils';
import initialArray from './js/input';

class GemPuzzle {
  constructor(arr) {
    this.initialArray = arr;
    this.sideLength = Math.sqrt(arr.length);
    this.currentArray = shuffleArray(this.initialArray);
    this.field = createField(this.shuffledArray, this.sideLength);
    // this.isSolvable = this.checkSolvability(this.currentArray);
  }

  static checkSolvability(arr) {
    let counter = 0;
    // const emptyPos = arr.indexOf(0);
    for (let i = 1; i < arr.length - 1; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        if (arr[j] > arr[i]) {
          counter += 1;
        }
      }
    }
    return counter;
  }
}

const newPuzzle = new GemPuzzle(initialArray);
