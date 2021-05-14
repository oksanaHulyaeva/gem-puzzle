/* eslint-disable import/extensions */
import {
  shuffleArray,
  createMatrix,
  getCoordXFromMatrix,
  getCoordYFromMatrix,
} from './js/utils.js';
import initialArray from './js/input.js';

class GemPuzzle {
  constructor() {
    this.initialArray = initialArray;
    this.sideLength = Math.sqrt(initialArray.length);
    this.currentArray = shuffleArray(this.initialArray);
    this.matrix = createMatrix(this.currentArray, this.sideLength);
    this.emptyPos = {
      X: getCoordXFromMatrix(this.matrix, 0),
      Y: getCoordYFromMatrix(this.matrix, 0),
    };
    this.isSolvable = this.checkIsSolvable(this.currentArray);
    this.isCompleted = this.checkIsCompleted();
    this.steps = 0;
  }

  checkIsCompleted() {
    return this.currentArray.every((elem, index) => {
      return elem === this.initialArray[index];
    });
  }

  checkIsSolvable(arr) {
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
    const solvability = document.createElement('p');

    const status = document.createElement('p');
    const steps = document.createElement('p');
    const statuslet = document.createElement('span');
    const stepslet = document.createElement('span');
    
    container.classList.add('container');
    field.classList.add('field');
    info.classList.add('info');
    solvability.classList.add('solvability');

    statuslet.classList.add('status');
    stepslet.classList.add('steps');
    
    solvability.append(`Solvability: ${this.isSolvable ? 'Solvable' : 'No solution'}`);
    status.append('Status: ');
    status.append(statuslet);
    steps.append('Steps: ');
    steps.append(stepslet);
   

    info.append(solvability);
    info.append(status);
    info.append(steps);
    container.append(field);
    container.append(info);

    document.body.append(container);

    this.updateField();
    this.updateStatus();

    field.addEventListener('click', (event) => {
      this.moveHandler(event);
    });
  }

  updateField() {
    const field = document.querySelector('.field');
    field.innerHTML = '';
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
    const steps = document.querySelector('.steps');
    steps.innerHTML = `${this.steps}`;
    const status = document.querySelector('.status');
    status.innerHTML = `${this.isCompleted ? 'Completed' : 'Not completed'}`;
  }

  updateCurrentArray(startValue, distValue) {
    const startIndex = this.currentArray.indexOf(startValue);
    const distIndex = this.currentArray.indexOf(distValue);
    [this.currentArray[startIndex], this.currentArray[distIndex]] = 
    [this.currentArray[distIndex], this.currentArray[startIndex]];
  }

  updateMatrix() {
    this.matrix = createMatrix(this.currentArray, this.sideLength);
  }

  updateEmptyCoords(){
    this.emptyPos = {
      X: getCoordXFromMatrix(this.matrix, 0),
      Y: getCoordYFromMatrix(this.matrix, 0),
    };
  }

  checkClosestEmpty(num) {
    for (let i = 0; i < this.currentArray.length; i += 1) {
      if (this.currentArray[i] === num) {
        if(this.currentArray[i - 1] === 0 || this.currentArray[i + 1] === 0) return true;
        if(this.currentArray[i - this.sideLength] === 0 
          || this.currentArray[i + this.sideLength] === 0) return true;
      }
    }
    return false;
  }

  moveHandler(event) {
    if (!event.target.classList.contains('cell')) return;
    const target = +event.target.innerHTML;
    if(!this.checkClosestEmpty(target)) return;
    this.updateCurrentArray(target, 0);
    this.updateMatrix();
    this.updateEmptyCoords();
    this.steps += 1;
    this.updateStatus();
    this.updateField();
  }

  findH() {
    let counter = 0;
    this.currentArray.forEach((elem, index) => {
      if (elem !== index) counter += 1;
    })
    return counter;
  };

  findManhanttanDistance(arr) {
    let totalDist = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== 0) {
        let realPos = this.initialArray.indexOf(arr[i]);
        let realCol = realPos % this.sideLength;
        let realRow = Math.floor(realPos / this.sideLength);
        let col = i % this.sideLength;
        let row = Math.floor(i / this.sideLength);
        totalDist += (Math.abs(realCol - col) + Math.abs(realRow - row));
      }
    }
    return totalDist;
  }

  solver() {
    if(!this.isSolvable) {
      alert('No solution');
      return;
    }

    const H = this.findH();
    const openList = [];
    const hash = {};

  }

  init() {
    this.drowStaticGame();
  }
}

const newPuzzle = new GemPuzzle();
newPuzzle.init();

// console.log(newPuzzle.emptyPos);
// console.log(newPuzzle.isCompleted);



