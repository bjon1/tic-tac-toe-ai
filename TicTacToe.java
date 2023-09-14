public class TicTacToe { //courtesy to MFreit50 for writing this in Java

    public static int count = 0;
    public static void main(String[] args) {
        System.out.println(game());
    }

    public static String game() {

        //'\0' = is the symbol for null
        char[][] board = new char[3][3];
        
        for(int i = 0; i < 9; i++) {
            boolean turn = i%2 == 0;
            //printBoard(board);
             //if turn is true, it's max and false is mini
            minimax(board, turn);
            System.out.println("Count" + count);
            count = 0;
            char player = turn ? 'X' : 'O';
            if(gameState(board, player)){
                return turn ? "Player 1 won" : "Player 2 won";
            }
        }
        return "Tie";
    }

    public static boolean gameState(char[][] board, char symbol) {
        for(int i = 0; i < board.length; i++) { //this i is navigating through the y axis (must keep it in the vertical bounderies)
			int row = 0, col =0;
			for(int j = 0; j < board[0].length; j++){ //this j is navigating the x axis of the board
				if(board[i][j] == symbol){row++;} 
				if(board[j][i] == symbol){col++;} 
			}
			if(row == 3 || col == 3){return true;}
		}
		//hardcoded diagonal checks
		return (board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol)
		|| (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol);
    }

    public static boolean tie(char[][] board) {
        for(int i = 0; i < board.length; i++) {
            for(int j = 0; j < board[0].length; j++){
                if(board[i][j] == '\0') {
                    return false;
                }
            }
        }
        return true;
    }

    
    public static void minimax(char[][] board, boolean isMax) {//it can have depth, but tictactoe is simple enough to not need it
        char player = isMax ? 'X' : 'O';  //set the symbol of each player
        int bestScore = isMax ? -1000 : 1000; //set the best score given the player's turn
        int[] bestMove = new int[2];
        for(int i = 0; i < board.length; i++ ){ //try out every single combination of board
            for(int j = 0; j < board[0].length; j++){
                if(board[i][j] == '\0') { //if the first index we're accessing is blank...
                    board[i][j] = player; //i,j are 'testing out' a move
                    int score = minimaxHelper(board, !isMax);
                    //System.out.println(score);
                    board[i][j] = '\0';
                    if(isMax && score > bestScore) {
                        bestScore = score;
                        bestMove[0] = i;
                        bestMove[1] = j;
                    } else if(!isMax && score < bestScore) {
                        bestScore = score;
                        bestMove[0] = i;
                        bestMove[1] = j;
                    }
                }
            }
        }
        board[bestMove[0]][bestMove[1]] = player;
    }

    public static int minimaxHelper(char[][] board, boolean isMax){
        count++;
        char player = isMax ? 'X' : 'O';
        //base case would be depth, gamestate, etc
        //gamestate is whenever we win, lose, tie
        if(gameState(board, player)) {
            return isMax ? 1 : -1;
        }

        if(tie(board)) {
            return 0;
        }

        int bestScore = isMax ? -1000 : 1000;
        for(int i = 0; i < board.length; i++){
            for(int j = 0; j < board[0].length; j++){
                if(board[i][j] == '\0') { //if the first index we're accessing is blank...
                    board[i][j] = player; //i,j are 'testing out' a move
                    int score = minimaxHelper(board, !isMax);
                    board[i][j] = '\0';
                    if(isMax && score > bestScore) {
                        bestScore = score;
                    } else if (!isMax && score < bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    }
}
