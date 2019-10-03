const board = document.querySelector('.board');
const cellHeight = 20;
const cellWidth = 20;
const cellNumberColumns = 30;
const cellNumberRows = 30;

const cellsArr = [];

const foodPosition = {
  x: 5,
  y: 5,
}
const snakePosition = {
  x: [4],
  y: [3],
  xy: [],

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
    const cellDataArr = cell.dataset.key.split('-');
    if (cellDataArr[0] === snakePosition.x.toString() && cellDataArr[1] === snakePosition.y.toString()) {
      cell.classList.add('snake');
      // snakePosition.xy.push(cell.dataset.key)
    }
  })
}

const move = (e) => {
  cellsArr.forEach(cell => {
    cell.classList.remove('snake')
  })
  if (e.keyCode === 37) {
    snakePosition.x--;
  } else if (e.keyCode === 38) {
    snakePosition.y--;
  } else if (e.keyCode === 39) {
    snakePosition.x++;
  } else if (e.keyCode === 40) {
    snakePosition.y++;
  }
  snake()
}

const draw = () => {
  drawBoard()
  drawPositionFood()
  food()
  snake()
}

draw()
window.addEventListener('keydown', move)