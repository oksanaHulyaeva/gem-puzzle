const move = (arr, start, dist) => {
  const arrCopy = arr.slice(0);
  [arrCopy[start], arrCopy[dist]] = [arrCopy[dist], arrCopy[start]];
  return arrCopy;
}

const  isCompleted = (arr, initArr) =>{
  return arr.every((elem, index) => {
    return elem === initArr[index];
  });
}

const getManhDistance = (curArr, initArr, size) => {
	let distance = 0;
     for (let i = 0; i < curArr.length; i++) {
		if (curArr[i] !== 0) {
		   const initPos = initArr.indexOf(curArr[i]);
		   const initCol = initPos % size;
		   const initRow = Math.floor(initPos / size);
		   const currentCol = i % size;
		   const currentRow = Math.floor(i / size);
		   distance += (Math.abs(currentCol - initCol) + Math.abs(currentRow - initRow));
	     }
	}
	return distance;
 }

const getPossibleStates = (arr, size) => {
  const possibleStates = [];
  const emptyPos = arr.indexOf(0);
  const row = Math.floor(emptyPos / size);
  const col = emptyPos % size;

  arr.forEach((item, index) => {
    if (Math.floor(index / size) === row && (index + 1) === emptyPos) {
      const possibleState = move(arr, index, emptyPos);
      possibleStates.push(possibleState);
    }
    if (Math.floor(index / size) === row && (index - 1) === emptyPos) {
      const possibleState = move(arr, index, emptyPos);
      possibleStates.push(possibleState);
    }
    if (index % size === col && index - size === emptyPos) {
      const possibleState = move(arr, index, emptyPos);
      possibleStates.push(possibleState);
    }
    if (index % size === col && index + size === emptyPos) {
      const possibleState = move(arr, index, emptyPos);
      possibleStates.push(possibleState);
    }
  })
  return possibleStates;
}

const pathsHandler = (arr, paths, level, parent, priority) => {
  const key = arr.slice(0).join(' ');
  paths[key] = {
    level: level,
    parent: parent,
    priority: priority,		
  }
}

const aStarSearch = (initialState, state) => {
  const paths = {};
  const openList = [];
  const closedList = [];
  const currentState = state.slice(0);
  openList.push(currentState);
  pathsHandler(currentState, paths, 0, null, getManhDistance(currentState, initialState));

  // while (!isCompleted(currentState, initialState)) {
	
  //   const possibleStates = getPossibleStates(currentState);
  //   possibleStates.forEach(item => {
  //     openList.push(item);
  //     const priority = getManhDistance(item, initialState);
  //     pathsHandler(item, paths, ++level, currentState, priority);
  //     closedList.push(openList.shift());
	//   }); 
	// }  
  // console.log(paths);
}