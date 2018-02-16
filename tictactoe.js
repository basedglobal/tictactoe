//// set up the board by creating the necessary HTML in JS
// create table
let playground = '<table cellspacing="0">';
//create 3 rows
for (i = 0; i < 3; i++) {
  playground += '<tr>';
  // create 3 columns
  for (j = 0; j < 3; j++) {
    // assign unique id's of the form ROW_COLUMN to each field
    // assign onclick function to have something happen on click, pass row and column as parameters
    playground += `<td id="${i}_${j}" onclick="tictac(${i},${j})"></td>`;
  }
  // close row
  playground += '</tr>';
}
// close table
playground += '</table>';
// append the created HTML to the content of the body
document.getElementsByTagName('body')[0].innerHTML += playground;

// take the outer edges off the table for style
for (i = 0; i < 3 ; i++) {
  document.getElementById(`0_${i}`).classList.add('top');
  document.getElementById(`2_${i}`).classList.add('bottom');
  document.getElementById(`${i}_0`).classList.add('left');
  document.getElementById(`${i}_2`).classList.add('right');
}


//// set up game logic
// program should know who's turn it is
let player = 'X';
// 2d array (a list of lists) to represent the board
// think of this as being a list of the three rows, which in turn are lists of their respective 3 columns
const field = [ [], [], [] ];
// program should now if game has ended
let hasEnded = false;

// on clicking a field:
function tictac(i,j) {
  // if the game has not ended and the field has nothing in it
  if (!hasEnded && !field[i][j]) {
    // update the game state: store who filled this field, player X or O
    field[i][j] = player;
    // display it
    document.getElementById(`${i}_${j}`).innerHTML = player;
    // next player
    // if it was X's turn, next player is O
    if (player === 'X') {
      player = 'O';
    // if it was not X's turn, it is now
    } else {
      player = 'X';
    }
    // if-else-clauses can be shortened using the ternary operator:
    // condition ? this if true : this if false
    // player = player === 'X' ? 'O' : 'X';

    // check if someone just won
    checkGameState();
  }
}

// did someone win?
function checkGameState() {
  // check rows
  for (i = 0; i < 3; i++) {
    if (
      // if all fields in a row are filled
      field[i][0] && field[i][1] && field[i][2] &&
      // and they are all filled with the same thing
      field[i][0] === field[i][1] && field[i][0] === field[i][2]
    ) {
      // color the row
      document.getElementById(`${i}_0`).style.color = '#00ce01';
      document.getElementById(`${i}_1`).style.color = '#00ce01';
      document.getElementById(`${i}_2`).style.color = '#00ce01';
      // let the program know the game has ended
      hasEnded = true;
      // terminate the loop execution:
      // if a row is won, there can't be another row that also is, so no point checking
      break;
    }
  }

  // check columns
  for (j = 0; j < 3; j++) {
    if (
      // if all fields in a column are filled
      field[0][j] && field[1][j] && field[2][j] &&
      // and they are all filled with the same thing
      field[0][j] === field[1][j] && field[0][j] === field[2][j]
    ) {
      document.getElementById(`0_${j}`).style.color = '#00ce01';
      document.getElementById(`1_${j}`).style.color = '#00ce01';
      document.getElementById(`2_${j}`).style.color = '#00ce01';
      hasEnded = true;
      break;
    }
  }

  // check diagonals
  // center filled? checking forst for efficiency: if the center isn't filled, no point in checking the diagonals
  if (field[1][1]) {
    if (
      // top left to bottom right
      // filled?
      field[0][0] && field [2][2] &&
      // with the same thing?
      field [0][0] === field [1][1] && field[0][0] === field[2][2]
    ) {
      document.getElementById('0_0').style.color = '#00ce01';
      document.getElementById('1_1').style.color = '#00ce01';
      document.getElementById('2_2').style.color = '#00ce01';
      hasEnded = true;
    }
    if (
      // top right to bottom left
      field[0][2] && field [2][0] &&
      field [0][2] === field [1][1] && field[0][2] === field[2][0]
    ) {
      document.getElementById('0_2').style.color = '#00ce01';
      document.getElementById('1_1').style.color = '#00ce01';
      document.getElementById('2_0').style.color = '#00ce01';
      hasEnded = true;
    }
  }
}