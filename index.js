window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile')); //Array
    const turn = document.querySelector('.player-turn');
    const resetButton = document.querySelector('#reset');
    const subHeader = document.querySelector('.display-turn');
    const announcer = document.querySelector('.display-announce'); //will be updated when winner is declared
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
                announceWin();
                break;
            }
        }

        checkTie();
    }

    function checkTie(){
        if(!board.includes('')){
            announceWin();
        }
    }

    function announceWin() {
        console.log(gameWon);
        if(gameWon == true){
            if(turn.innerHTML == 'X'){
                subHeader.innerHTML = "<h1>Player X Won</h1>";
            } else {
                subHeader.innerHTML = "<h1>Player O Won</h1>";
            }
        } else {
            subHeader.innerHTML = "<h1>Tie</h1>";
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
    }

});