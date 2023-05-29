import { useState, useEffect } from 'react';
import Chip from './Chip';
import WinMessage from './components/WinMessage';

let turn = 0;

const Board = () => {

  const [gameResult, setGameResult] = useState(null); //T for tie
  const [winner, setWinner] = useState(null);

  const resetBoard = () => {
    let boardArr = new Array(3);
    for (let i = 0; i < boardArr.length; i++) {
      boardArr[i] = new Array(3).fill(null);
    }
    turn = 0;
    setGameResult(null);
    return boardArr;
  }

  const [board, setBoard] = useState(() => resetBoard());



  /*
    Function checks to see if the current player wins. If a player did not win (Tie or undecided), return false
  */
  const isWin = (simBoard, symbol) => {
    for(let i = 0; i < simBoard.length; i++) { //this i is navigating through the y axis (must keep it in the vertical bounderies)
        let row = 0, col = 0;
        for(let j = 0; j < simBoard[0].length; j++){ //this j is navigating the x axis of the board
            if(simBoard[i][j] == symbol){row++;} 
            if(simBoard[j][i] == symbol){col++;}
        }
        if(row == 3 || col == 3){return true;}
    }
    //hardcoded diagonal checks
    return (simBoard[0][0] === symbol && simBoard[1][1] === symbol && simBoard[2][2] === symbol)
    || (simBoard[0][2] === symbol && simBoard[1][1] === symbol && simBoard[2][0] === symbol);
  }

  /*
    This function will check to see if the board state contains a tie
  */
  const isTie = (simBoard) => { //determines if there is a tie
      for(let i = 0; i < simBoard.length; i++) {
          for(let j = 0; j < simBoard[0].length; j++){
              if(simBoard[i][j] === null) return false;
          }
      }
      return true;
  }

  const makeMove = (rowIndex, cellIndex) => {
    if(turn % 2 === 0 && gameResult === null){
      placeMove(rowIndex, cellIndex); //your move
      setTimeout(function() {
        let nextBestMove = findBestMove(); //AI's move
        placeMove(nextBestMove[0], nextBestMove[1]);
      }, 500);
    }
  }

  const findBestMove = () => {
    let simBoard = [...board];
    let isMax = turn % 2 === 0 ? true : false;
    let bestScore;
    let symbol;

    if(isMax) {
      bestScore = -1000;
      symbol = 'X';
    } else {
      bestScore = 1000;
      symbol = 'O';
    }

    let move;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(simBoard[i][j] === null) {
          simBoard[i][j] = symbol; //simBoard will be our "simulated" board
          let score = minimax(simBoard, !isMax); 
          simBoard[i][j] = null;
          if(!isMax && score < bestScore) {
            bestScore = score;
            move = [i, j];
          } else if(isMax && score > bestScore) {
            bestScore = score;
            move = [i, j];
          }
        }
      }
    }
    return move;
  }

  const minimax = (simBoard, isMax) => {
    let symbol = isMax ? 'X' : 'O';
    
    if(isWin(simBoard, symbol)) {
      return isMax ? 1 : -1;
    }

    if(isTie(simBoard)) {
      return 0;
    }

    let bestScore = isMax ? -1000 : 1000;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++) {
        if(simBoard[i][j] === null) {
          simBoard[i][j] = symbol;
          let score = minimax(simBoard, !isMax);
          simBoard[i][j] = null;
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
    if(board[rowIndex][cellIndex] === null) {
      let symbol = turn % 2 == 0 ? 'X' : 'O';
      let simBoard = [...board];
      simBoard[rowIndex][cellIndex] = symbol;
      setBoard(simBoard);
      console.log("Turn:", turn);
      checkWin();
    }
  }
  
  const checkWin = () => {
    let symbol = turn % 2 === 0 ? 'X' : 'O'
    if(isWin(board, symbol)) {
      setGameResult(symbol);
    } else if(isTie(board)) {
      setGameResult('T');
    } else {
      ++turn;
    }
  }

  return (
    <>

      <WinMessage gameResult={gameResult}/>

      <div className={`board ${gameResult ? 'gray' : ' '}`}>
        {board && board.map((row, rowIndex) => 
          <div className="row">
            {row.map((cellContents, cellIndex) => 
              <Chip rowIndex={rowIndex} cellIndex={cellIndex} symbol={cellContents} makeMove={makeMove} />
            )}
          </div>
        )}

      </div>
      <div className="button" onClick={()=> setBoard(resetBoard)}>
        Reset
      </div>

    </>
  )

}

export default Board;