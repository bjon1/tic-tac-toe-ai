import { useState } from 'react'
import './App.css'
import Space from './Space';

function App() {
  const [board, setBoard] = useState<string[][]>([]);

  const isWin = (board: string[][], isMax: boolean) => {
    const symbol = isMax ? 'X' : 'O';
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
    || (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol);
  }

  const isTie = (board: string[][]) => { //determines if there is a tie
      for(let i = 0; i < board.length; i++) {
          for(let j = 0; j < board[0].length; j++){
              if(board[i][j] === ' ') return false;
          }
      }
      return true;
  }



  return (
    <>
      {board && board.map((row: string[], rowIndex: number) => {
          return row.map((cell: string, cellIndex: number) => {
            console.log(`Row ${rowIndex}, Cell ${cellIndex}: ${cell}`);
          })
        }
      )}
    </>
  )
}

export default App
