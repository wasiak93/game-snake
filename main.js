const board = document.querySelector('.board');
const cellHeight = 20;
const cellWidth = 20;
const cellNumberColumns = 15;
const cellNumberRows = 15;
let lastKeyCode = '';

const cellsArr = [];

const foodPosition = {
  x: 5,
  y: 5,
}
const snakePosition = {
  x: [0, 1, 2],
  y: [3, 3, 3],
}


board.style.width = cellWidth * cellNumberColumns + 'px';
board.style.height = cellHeight * cellNumberRows + 'px';

let moveRightIndex = '';
let moveLeftIndex = '';
let moveUpIndex = '';
let moveDownIndex = '';

const drawBoard = () => {
  for (let x = 0; x < cellNumberColumns; x++) {
    for (let y = 0; y < cellNumberRows; y++) {
      cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.height = cellHeight + 'px';
      cell.style.width = cellWidth + 'px';
      cell.style.left = x * cellHeight + 'px';
      cell.style.top = y * cellWidth + 'px';
      cell.dataset.key = `${x}-${y}`
      board.appendChild(cell);
      cellsArr.push(cell)
    }

  }
}

const drawPositionFood = () => {
  foodPosition.x = (Math.floor(Math.random() * cellNumberColumns));
  foodPosition.y = (Math.floor(Math.random() * cellNumberRows));
}

const food = () => {
  cellsArr.forEach(cell => {
    const cellDataArr = cell.dataset.key.split('-');
    if (cellDataArr[0] === foodPosition.x.toString() && cellDataArr[1] === foodPosition.y.toString()) {
      cell.classList.add('food')
    }

  })
}



const eatFood = () => {
  if (snakePosition.x.some((x, i) => {
      return x === foodPosition.x && snakePosition.y.some((y, i_y) => {
        return y === foodPosition.y && i === i_y
      })
    })) {
    // TUTAJ TREBA WSTAWIC ZJADANIE
  }
}

const snake = () => {

  cellsArr.forEach(cell => {
    cell.classList.remove('snake');
    const cellDataArr = cell.dataset.key.split('-');
    if (snakePosition.x.some((x, i) => {
        return x.toString() === cellDataArr[0] && snakePosition.y.some((y, i_y) => {
          return y.toString() === cellDataArr[1] && i === i_y;
        })
      })) {
      cell.classList.add('snake')
    }

  })

}


const moveRight = () => {
  clearTimeout(moveUpIndex);
  clearTimeout(moveDownIndex);
  // zmienia pozycje x
  let lastItemX = snakePosition.x[snakePosition.x.length - 1];
  lastItemX++;
  snakePosition.x.push(lastItemX);
  snakePosition.x.shift()
  // zmienia pozycje y
  let lastItemY = snakePosition.y[snakePosition.y.length - 1];
  snakePosition.y.push(lastItemY)
  snakePosition.y.shift()
  // rysuje weza
  snake()
  eatFood()

}

const moveLeft = () => {

  clearTimeout(moveUpIndex);
  clearTimeout(moveDownIndex);
  // zmienia pozycje x
  let lastItemX = snakePosition.x[snakePosition.x.length - 1];
  lastItemX--;
  snakePosition.x.push(lastItemX);
  snakePosition.x.shift()

  // zmienia pozycje y
  let lastItemY = snakePosition.y[snakePosition.y.length - 1];
  snakePosition.y.push(lastItemY);
  snakePosition.y.shift()
  // rysuje weza
  snake()
  eatFood()
}

const moveDown = () => {
  clearTimeout(moveLeftIndex);
  clearTimeout(moveRightIndex);
  // ustawia pozycje dla x
  let lastItemX = snakePosition.x[snakePosition.x.length - 1];
  snakePosition.x.push(lastItemX);
  snakePosition.x.shift();
  // ustawia pozycje dla y
  let lastItemY = snakePosition.y[snakePosition.y.length - 1];
  lastItemY++;
  snakePosition.y.push(lastItemY);
  snakePosition.y.shift();
  // rysuje weza
  snake()
  eatFood()
}
const moveUp = () => {
  clearTimeout(moveLeftIndex);
  clearTimeout(moveRightIndex);
  // ustawia pozycje dla x
  let lastItemX = snakePosition.x[snakePosition.x.length - 1];
  snakePosition.x.push(lastItemX);
  snakePosition.x.shift()
  // ustawia pozycje dla y
  let lastItemY = snakePosition.y[snakePosition.y.length - 1];
  lastItemY--;
  snakePosition.y.push(lastItemY);
  snakePosition.y.shift();
  // rysuje weza
  snake()
  eatFood()

}



const move = (e) => {

  if (e.keyCode === 37) {
    if (lastKeyCode === 39 || lastKeyCode === 37) return;
    moveLeft()
    moveLeftIndex = setInterval(moveLeft, 500);
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 38) {
    if (lastKeyCode === 38 || lastKeyCode === 40) return;
    moveUp()
    moveUpIndex = setInterval(moveUp, 500);
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 39) {
    if (lastKeyCode === 39 || lastKeyCode === 37) return;
    moveRight()
    moveRightIndex = setInterval(moveRight, 500);
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 40) {
    if (lastKeyCode === 38 || lastKeyCode === 40) return;
    moveDown()
    moveDownIndex = setInterval(moveDown, 500);
    lastKeyCode = e.keyCode;
  }
}




const draw = () => {
  drawBoard()
  drawPositionFood()
  food()
  snake()
}


draw()
window.addEventListener('keydown', move)