
const Chip = ({ rowIndex, cellIndex, symbol, placeMove }) => {

    const handleClick = () => {
        console.log("Row: " + rowIndex + " Cell: " + cellIndex);

        placeMove(rowIndex, cellIndex);
    }
  
    return (
        <div
            className="cell"
            onClick={handleClick}
        >
            <div className={`symbol ${symbol ? 'taken' : ''}`}>
                {symbol}
            </div>
        </div>
    )
  
  }
  
  export default Chip;
  