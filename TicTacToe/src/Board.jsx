import { useState, useEffect } from 'react';
import Chip from './Chip';

let turn = 0;

const Board = () => {

  const resetBoard = () => {
    let boardArr = new Array(3);
    for (let i = 0; i < boardArr.length; i++) {
      boardArr[i] = new Array(3).fill(null);
    }
    turn = 0;
    return boardArr;
  }
  const [board, setBoard] = useState(() => resetBoard());


  /*
    Function checks to see if the current player wins. If a player did not win (Tie or undecided), return false
  */
  const isWin = (newBoard, symbol) => {
    for(let i = 0; i < newBoard.length; i++) { //this i is navigating through the y axis (must keep it in the vertical bounderies)
        let row = 0, col = 0;
        for(let j = 0; j < newBoard[0].length; j++){ //this j is navigating the x axis of the board
            if(newBoard[i][j] == symbol){row++;} 
            if(newBoard[j][i] == symbol){col++;}
        }
        if(row == 3 || col == 3){return true;}
    }
    //hardcoded diagonal checks
    return (newBoard[0][0] === symbol && newBoard[1][1] === symbol && newBoard[2][2] === symbol)
    || (newBoard[0][2] === symbol && newBoard[1][1] === symbol && newBoard[2][0] === symbol);
  }

  /*
    This function will check to see if the board state contains a tie
  */
  const isTie = (newBoard) => { //determines if there is a tie
      for(let i = 0; i < newBoard.length; i++) {
          for(let j = 0; j < newBoard[0].length; j++){
              if(newBoard[i][j] === null) return false;
          }
      }
      return true;
  }

  const makeMove = (rowIndex, cellIndex) => {
    placeMove(rowIndex, cellIndex);
    setTimeout(function() {
      let nextBestMove = findBestMove(); //AI's move
      placeMove(nextBestMove[0], nextBestMove[1]);
    }, 500);
  }

  const findBestMove = () => {
    let bestScore = 1000;
    let move;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(board[i][j] === null) {
          let newBoard = [...board];
          newBoard[i][j] = 'O'; //newBoard will be our "simulated" board
          let score = minimax(newBoard, false); 
          newBoard[i][j] = null;
          if(score < bestScore) {
            bestScore = score;
            move = [ i, j ];
          }
        }
      }
    }
    return move;
  }

  const minimax = (newBoard, isMax) => {
    let symbol = isMax ? 'X' : 'O';
    if(isWin(newBoard, symbol)) {
      return isMax ? 1 : -1;
    }

    if(isTie(newBoard)) {
      return 0;
    }

    let bestScore = isMax ? -1000 : 1000;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++) {
        if(newBoard[i][j] == null) {
          newBoard[i][j] = symbol;
          let score = minimax(newBoard, !isMax);
          newBoard[i][j] = null;
          if(!isMax && score < bestScore) {
            bestScore = score;
          } else if(isMax && score > bestScore) {
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  }

  const placeMove = (rowIndex, cellIndex) => {
    console.log(board);
    if(board[rowIndex][cellIndex] === null) {

      let symbol = turn % 2 == 0 ? 'X' : 'O';
      let newBoard = [...board];
      newBoard[rowIndex][cellIndex] = symbol;
      turn++;
      setBoard(newBoard);
    }
  }

  return (
    <>
      <div className="board">
        {board && board.map((row, rowIndex) => 
          <div className="row">
            {row.map((cellContents, cellIndex) => 
              <Chip rowIndex={rowIndex} cellIndex={cellIndex} symbol={cellContents} makeMove={makeMove} />
            )}
          </div>
        )}

      <div className="button" onClick={()=> setBoard(resetBoard)}>
        Reset
      </div>

      </div>

    </>
  )

}

export default Board;