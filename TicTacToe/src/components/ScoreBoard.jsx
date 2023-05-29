import React from 'react'
import { useEffect, useState } from 'react';

const ScoreBoard = ({gameResult}) => {

    const [player, setPlayer] = useState(0);
    const [tie, setTie] = useState(0);
    const [computer, setComputer] = useState(0);

    useEffect(() => {

        switch(gameResult) {
            case 'T':
                setTie(tie + 1);
                break;
            case 'X':
                setPlayer(player + 1);
                break;
            case 'O':
                setComputer(computer + 1);
                break;
            default: 
                break;
        }

    }, [gameResult])


  return (
    <div className="scoreboard">
        <div className="score-item">
            <div className="title">
                PLAYER
            </div>
            <div className="score">
                {player}
            </div>
        </div>
        <div className="score-item">
            <div className="title">
                TIE
            </div>
            <div className="score">
                {tie}
            </div>
        </div>
        <div className="score-item">
            <div className="title">
                COMPUTER
            </div>
            <div className="score">
                {computer}
            </div>
        </div>
    </div>
  )
}

export default ScoreBoard;
