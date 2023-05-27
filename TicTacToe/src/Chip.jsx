
const Chip = ({ rowIndex, cellIndex }) => {

    const handleClick = () => {
        console.log("clicked"); //call to place move
    }
  
    return (
        <div
            className="cell"
            onClick={handleClick}
        >

            

        </div>
    )
  
  }
  
  export default Chip;
  