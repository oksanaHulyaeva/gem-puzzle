/* eslint-disable import/extensions */
import {
  shuffleArray,
  createField,
  getCoordXFromMatrix,
  getCoordYFromMatrix,
} from './js/utils.js';
import initialArray from './js/input.js';

class GemPuzzle {
  constructor() {
    this.initialArray = initialArray;
    this.sideLength = Math.sqrt(initialArray.length);
    this.currentArray = shuffleArray(this.initialArray);
    this.field = createField(this.currentArray, this.sideLength);
    this.emptyPos = {
      X: getCoordXFromMatrix(this.field, 0),
      Y: getCoordYFromMatrix(this.field, 0),
    };
    this.isSolvable = this.checkSolvability(this.currentArray);
    this.steps = 0;
  }

  checkSolvability(arr) {
    let counter = 0;
    for (let i = 1; i < arr.length - 1; i += 1) {
      for (let j = i - 1; j >= 0; j -= 1) {
        if (arr[j] > arr[i]) {
          counter += 1;
        }
      }
    }
    return (counter + this.emptyPos.Y + 1) % 2 === 0;
  }

  drowStaticGame() {
    const container = document.createElement('div');
    const field = document.createElement('div');
    const info = document.createElement('div');
    const status = document.createElement('p');
    const steps = document.createElement('p');

    container.classList.add('container');
    field.classList.add('field');
    info.classList.add('info');
    status.classList.add('status');
    steps.classList.add('steps');

    status.innerHTML = 'Status: ';
    steps.innerHTML = 'Steps: ';

    info.append(status);
    info.append(steps);
    container.append(field);
    container.append(info);

    document.body.append(container);

    this.updateField();
    this.updateStatus();
  }

  updateField() {
    const field = document.querySelector('.field');
    this.currentArray.forEach((item) => {
      const cell = document.createElement('div');
      if (item !== 0) {
        cell.classList.add('cell');
        cell.innerHTML = item;
      } else {
        cell.classList.add('empty-cell');
      }
      field.append(cell);
    });
  }

  updateStatus() {
    const status = document.querySelector('.status');
    const steps = document.querySelector('.steps');

    status.append(`${this.isSolvable ? 'Solvable' : 'No solution'}`);
    steps.append(`${this.steps}`);
  }

  init() {
    this.drowStaticGame();
  }
}

const newPuzzle = new GemPuzzle();
newPuzzle.init();

console.log(newPuzzle.emptyPos);
console.log(newPuzzle.isSolvable);
