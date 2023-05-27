import { useState, useEffect } from 'react';
import Chip from './Chip';

const Board = () => {

  const [board, setBoard] = useState(() => 
  {
    let boardArr = new Array(3);
    for (let i = 0; i < boardArr.length; i++) {
      boardArr[i] = new Array(3).fill(null);
    }
    return boardArr;
  });

  const [turns, setTurns] = useState(0);

  /*
    Function checks to see if the current player wins. If a player did not win (Tie or undecided), return false
  */
  const isWin = (board, symbol) => {
    for(let i = 0; i < board.length; i++) { //this i is navigating through the y axis (must keep it in the vertical bounderies)
        let row = 0, col = 0;
        for(let j = 0; j < board[0].length; j++){ //this j is navigating the x axis of the board
            if(board[i][j] == symbol){row++;} 
            if(board[j][i] == symbol){col++;}
        }
        if(row == 3 || col == 3){return true;}
    }
    //hardcoded diagonal checks
    return (board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol)
     (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol);
  }

  /*
    This function will check to see if the board state contains a tie
  */
  const isTie = (board) => { //determines if there is a tie
      for(let i = 0; i < board.length; i++) {
          for(let j = 0; j < board[0].length; j++){
              if(board[i][j] === ' ') return false;
          }
      }
      return true;
  }

  const placeMove = (rowIndex, cellIndex) => {
    console.log(board);
    if(board[rowIndex][cellIndex] === null) {
      let newBoard = [...board];
      newBoard[rowIndex][cellIndex] = (turns % 2 == 0 ? 'X' : 'O');
      setBoard(newBoard);
      setTurns(turns + 1);
    }
  }



  return (
    <>
      <div className="board">
        {board && board.map((row, rowIndex) => 
          <div className="row">
            {row.map((cellContents, cellIndex) => 
              <Chip rowIndex={rowIndex} cellIndex={cellIndex} symbol={cellContents} placeMove={placeMove} />
            )}
          </div>
        )}
      </div>
    </>
  )

}

export default Board;