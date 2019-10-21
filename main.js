const board = document.querySelector('.board');
const cellHeight = 20;
const cellWidth = 20;
const cellNumberColumns = 15;
const cellNumberRows = 15;
let lastKeyCode = '';
const time = 300;

const cellsArr = [];

const foodPosition = {
  x: 5,
  y: 5,
}
let snakePosition = {
  x: [0, 1, 2],
  y: [3, 3, 3],
}
let eat = false;


board.style.width = cellWidth * cellNumberColumns + 'px';
board.style.height = cellHeight * cellNumberRows + 'px';

let moveRightIndex = '';
let moveLeftIndex = '';
let moveUpIndex = '';
let moveDownIndex = '';

let lastItemX = "";
let lastItemY = "";

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

const drawFoodPosition = () => {
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
    cellsArr.forEach(cell => {
      cell.classList.remove('food')
    })

    eat = true;
    snake()
    drawFoodPosition()
    food()

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
  clearInterval(moveUpIndex);
  clearInterval(moveDownIndex);
  // zmienia pozycje x
  lastItemX = snakePosition.x[snakePosition.x.length - 1];
  lastItemX++;
  // console.log(lastItemX);


  // snakePosition.x.push(lastItemX);
  // if (!eat) {
  //   snakePosition.x.shift()
  // }

  // zmienia pozycje y
  lastItemY = snakePosition.y[snakePosition.y.length - 1];
  // console.log(lastItemY);

  checkPosition()

  // ustawiam nowa pozycje dla snake
  // x
  snakePosition.x.push(lastItemX);
  if (!eat) {
    snakePosition.x.shift()
  }
  // y
  snakePosition.y.push(lastItemY)
  if (!eat) {
    snakePosition.y.shift()
  } else {
    eat = false;
  }


  // rysuje weza i jedzenie
  // checkPosition()
  eatFood()
  snake()


}


const moveLeft = () => {

  clearTimeout(moveUpIndex);
  clearTimeout(moveDownIndex);
  // zmienia pozycje x
  lastItemX = snakePosition.x[snakePosition.x.length - 1];
  lastItemX--;
  // snakePosition.x.push(lastItemX);
  // if (!eat) {
  //   snakePosition.x.shift()
  // }


  // zmienia pozycje y
  lastItemY = snakePosition.y[snakePosition.y.length - 1];

  checkPosition()

  // ustawiam nowa pozycje dla snake
  // x
  snakePosition.x.push(lastItemX);
  if (!eat) {
    snakePosition.x.shift()
  }
  // y
  snakePosition.y.push(lastItemY);
  if (!eat) {
    snakePosition.y.shift()
  } else {
    eat = false;
  }

  // rysuje weza i jedzenie
  // checkPosition()
  eatFood()
  snake()

}

const moveDown = () => {
  clearInterval(moveLeftIndex);
  clearInterval(moveRightIndex);
  // wyciagam pozycje dla x
  lastItemX = snakePosition.x[snakePosition.x.length - 1];
  // wyciagam pozycje dla y
  lastItemY = snakePosition.y[snakePosition.y.length - 1];
  lastItemY++;

  checkPosition()

  // ustawiam nowa pozycje dla snake
  // x
  snakePosition.x.push(lastItemX);
  if (!eat) {
    snakePosition.x.shift();
  }
  // y
  snakePosition.y.push(lastItemY);
  if (!eat) {
    snakePosition.y.shift();
  } else {
    eat = false;
  }
  // rysuje weza i jedzenie
  eatFood()
  snake()

}
const moveUp = () => {
  clearInterval(moveLeftIndex);
  clearInterval(moveRightIndex);
  // ustawia pozycje dla x
  lastItemX = snakePosition.x[snakePosition.x.length - 1];
  // snakePosition.x.push(lastItemX);
  // if (!eat) {
  //   snakePosition.x.shift()
  // }

  // ustawia pozycje dla y
  lastItemY = snakePosition.y[snakePosition.y.length - 1];
  lastItemY--;
  checkPosition()

  // ustawiam nowa pozycje dla snake
  //  x
  snakePosition.x.push(lastItemX);
  if (!eat) {
    snakePosition.x.shift()
  }
  // y
  snakePosition.y.push(lastItemY);
  if (!eat) {
    snakePosition.y.shift();
  } else {
    eat = false;
  }

  // rysuje weza i jedzenie
  // checkPosition()
  eatFood()
  snake()


}
const checkPosition = () => {
  if (snakePosition.x.some((x, i) => {
      return x === lastItemX && snakePosition.y.some((y, i_y) => {
        return y === lastItemY && i === i_y;
      })
    })) {
    alert('przegrałeś');
    // clearTimeout(moveDownIndex)
    // clearTimeout(moveUpIndex)
    // clearTimeout(moveLeftIndex)
    // clearTimeout(moveRigthIndex)
    // snakePosition = {
    //   x: [0, 1, 2],
    //   y: [3, 3, 3],
    // }
  }
}




const move = (e) => {

  if (e.keyCode === 37) {
    if (lastKeyCode === 39 || lastKeyCode === 37) return;
    moveLeft()
    moveLeftIndex = setInterval(moveLeft, time);
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 38) {
    if (lastKeyCode === 38 || lastKeyCode === 40) return;
    moveUp()
    moveUpIndex = setInterval(moveUp, time);
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 39) {
    if (lastKeyCode === 39 || lastKeyCode === 37) return;
    moveRight()
    moveRightIndex = setInterval(moveRight, time);
    lastKeyCode = e.keyCode;
  } else if (e.keyCode === 40) {
    if (lastKeyCode === 38 || lastKeyCode === 40) return;
    moveDown()
    moveDownIndex = setInterval(moveDown, time);
    lastKeyCode = e.keyCode;
  }
}




const draw = () => {
  drawBoard()
  drawFoodPosition()
  food()
  snake()
}


draw()
window.addEventListener('keydown', move)