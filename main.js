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
  x: [4, 4],
  y: [2, 3],
  xy: [],
}
const snakeV = {
  x: 1,
  y: 1,
}

board.style.width = cellWidth * cellNumberColumns + 'px';
board.style.height = cellHeight * cellNumberRows + 'px';

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

const snake = () => {

  cellsArr.forEach(cell => {
    cell.classList.remove('snake');
    const cellDataArr = cell.dataset.key.split('-');
    if (snakePosition.x.find(x => {

        return x.toString() === cellDataArr[0]
      }) && snakePosition.y.find(y => {
        return y.toString() === cellDataArr[1]
      })) {
      cell.classList.add('snake')
    }

  })
}

const moveSnake = () => {

}
const moveRight = () => {
  // zmieniam pozycje x
  let lastItemX = snakePosition.x[snakePosition.x.length - 1];
  lastItemX++;
  snakePosition.x.push(lastItemX);
  snakePosition.x.shift(0, 1)
  // zmieniam pozycje y
  let lastItemY = snakePosition.y[snakePosition.y.length - 1];
  snakePosition.y.push(lastItemY)
  snakePosition.y.shift(0, 1)
  // rysuje weza
  snake()
}

const move = (e) => {
  if (e.keyCode === 37) {
    if (lastKeyCode === 37) return;
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 38) {
    snakePosition.y--;
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 39) {
    if (lastKeyCode === 39 || lastKeyCode === 37) return;
    moveRight()
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 40) {
    snakePosition.y++;
    lastKeyCode = e.keyCode;
  }
}



const draw = () => {
  drawBoard()
  drawPositionFood()
  food()
  snake()
  setInterval(moveRight, 100)
}

draw()
window.addEventListener('keydown', move)