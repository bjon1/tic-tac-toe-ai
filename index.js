window.addEventListener('DOMContentLoaded', () => {

    const tiles = Array.from(document.querySelectorAll('.tile')); //Array
    const turn = document.querySelector('.player-turn');
    const resetButton = document.querySelector('#reset');
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

    let board = ['','','','','','','','','',''];

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => takeAction(tile, index));
    });

    resetButton.addEventListener('click', () => resetBoard());

    function takeAction(tile, index) {
        if(isValidMove(tile)){
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
        /*
            use winningConditions to check the win
        */
    }

    function announceWin() {
        /* Implement announcerWin by displaying who has won and graying out the game */
    }

    function resetBoard() {
        console.log("reset");
        board = ['','','','','','','','','',''];
        turn.innerHTML = 'X';
        /* must reset ANNOUNCER */
        tiles.forEach(tile => {
            tile.innerHTML = '';            
        });
        
    }

});