

const Space: React.FC<{ value: string }> = ({ value }) => {

    const handleClick = () => {
        placeMove(columnIndex);
    }

    return (
        <div
            className="board"
            onClick={handleClick}
        />
    )

}

export default Space;