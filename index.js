window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile')); //Array
    const turn = document.querySelector('.player-turn');
    const resetButton = document.querySelector('.reset');
    const subHeader = document.querySelector('.display-turn');
    const announcer = document.querySelector('.display-announce'); //will be updated when winner is declared
    const crosses = Array.from(document.querySelectorAll('.cross'));
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let board = ['','','','','','','','',''];
    let gameWon = false;

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => takeAction(tile, index));
    });

    resetButton.addEventListener('click', () => resetBoard());

    function takeAction(tile, index) {
        if(isValidMove(tile) && gameWon == false){
            updateBoard(tile, index);
            changePlayer();
        }
    }

    function isValidMove(tile) {
        if(tile.innerHTML == 'X' || tile.innerHTML == 'O'){
            return false;
        }
        return true;
    }

    function updateBoard(tile, index) {
        board[index] = turn.innerHTML;
        tile.innerHTML = board[index];
        tile.classList.add(`player-style`); //adds a class to the tile so the css can take effect
        checkWin();
    }

    function changePlayer() {
        if(turn.innerHTML == 'X'){
            turn.innerHTML = 'O';
        } else {
            turn.innerHTML = 'X';
        }
    }

    function checkWin() {
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                gameWon = true;
                announceWin(i);
                break;
            }
        }
        checkTie();
    }

    function checkTie(){
        if(!board.includes('') && gameWon == false){
            announceWin(-1);
        }
    }

    /*
    announceWin() takes in a parameter from 0-7
    The value of this parameter will determine which winning condition has been validated
    which will determine which cross should be displayed.
    If code == -1, then that means there is a tie
    */
    function announceWin(code) {
        if(gameWon == true){
            document.querySelector('.container').style.color = "gray";
            if(turn.innerHTML == 'X'){
                subHeader.innerHTML = "<h1>Player X Won</h1>";
            } else {
                subHeader.innerHTML = "<h1>Player O Won</h1>";
            }
        }

    /*
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    */
        switch(code){
            case 0:
                document.querySelector('.cross-row1').style.visibility = "visible";
                break;
            case 1:
                document.querySelector('.cross-row2').style.visibility = "visible";
                break;
            case 2:
                document.querySelector('.cross-row3').style.visibility = "visible";
                break;
            case 3:
                document.querySelector('.cross-col1').style.visibility = "visible";
                break;
            case 4:
                document.querySelector('.cross-col2').style.visibility = "visible";
                break;
            case 5:
                document.querySelector('.cross-col3').style.visibility = "visible";
                break;
            case 6:
                document.querySelector('.cross-diag1').style.visibility = "visible";
                break;
            case 7:    
                document.querySelector('.cross-diag2').style.visibility = "visible";
                break;
            default:
                subHeader.innerHTML = "<h1>Tie</h1>";
                document.querySelector('.container').style.color = "gray";
                break;
        }
    }

    function resetBoard() {
        board = ['','','','','','','','',''];
        turn.innerHTML = 'X';
        subHeader.innerHTML = "<h1>Player X's turn</h1>";
        tiles.forEach(tile => {
            tile.innerHTML = '';            
        });
        gameWon = false;
        document.querySelector('.container').style.color = "white";
        crosses.forEach((cross) => {
            cross.style.visibility = "hidden";
        });
    }

});