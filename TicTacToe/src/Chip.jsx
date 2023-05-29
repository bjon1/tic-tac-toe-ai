
const Chip = ({ rowIndex, cellIndex, symbol, makeMove }) => {

    const handleClick = () => {
        console.log("Row: " + rowIndex + " Cell: " + cellIndex);
        makeMove(rowIndex, cellIndex);
    }

    const determineSquareProperties = () => {
        switch(symbol) {
            case 'X':
                return 'X taken';
            case 'O':
                return 'O taken';
            default:
                break;
        }
    }
  
    return (
        <div
            className="cell"
            onClick={handleClick}>

            <div className={`symbol ${symbol} ${symbol ? 'taken' : null}`}>
                {symbol}
            </div>
        </div>
    )
  
  }
  
  export default Chip;
  