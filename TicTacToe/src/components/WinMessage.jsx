import { useEffect, useState } from 'react';

const WinMessage = ({gameResult}) => {

    return(
        <>
            <div className="WinMessage">
                {gameResult === 'T' ? <div>Tie</div> : null}
                {gameResult === 'X' || gameResult == 'O' ? <div>{ gameResult } won </div> : null}
            </div>
        </>
    )

}

export default WinMessage;