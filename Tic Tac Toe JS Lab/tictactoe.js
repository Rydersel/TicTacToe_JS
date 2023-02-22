let playerTurn = true;
let computerMoveTimeout = 0;
let Game_Over = false;
const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {

	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {

			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	let foundEmpty = false;
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

function newGame() {
	// TODO: Complete the function
	clearTimeout();
	Game_Over = false;
	document.getElementById("turnInfo").innerHTML = "Your turn";
	computerMoveTimeout = 0;
	playerTurn = true;
	const buttons = getGameBoardButtons();
	for (let i = 0; i < buttons.length; i++)
	{
		buttons[i].innerHTML = "";
		buttons[i].disabled = false;
	}


}

function boardButtonClicked(button) {
	if (playerTurn === true)
	{
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			button.innerHTML = "X"
			button.classList.add("x");
			button.disabled = true;
			switchTurn();
		}

	}

	// TODO: Complete the function
}

function switchTurn() {
	playerTurn = playerTurn != true;
	if (checkForWinner() === gameStatus.DRAW_GAME) //TODO Find better way to do this
	{
		document.getElementById("turnInfo").innerHTML = "Draw game";
		playerTurn = false;
		Game_Over = true;



	}
	if (checkForWinner() === gameStatus.COMPUTER_WINS)
	{
		document.getElementById("turnInfo").innerHTML = "Computer wins!";
		playerTurn = false;
		Game_Over = true;




	}

	if (checkForWinner() === gameStatus.HUMAN_WINS)
	{
		document.getElementById("turnInfo").innerHTML = "You win!";
		playerTurn = false;
		Game_Over = true;


	}

	if (checkForWinner() === gameStatus.MORE_MOVES_LEFT)
	{
		if (playerTurn === false)
		{
			document.getElementById("turnInfo").innerHTML = "Computer's turn";
			setTimeout(makeComputerMove,1000); //Computer makes move after 1 second

		}
		if (playerTurn === true)
		{
			document.getElementById("turnInfo").innerHTML = "Your turn";
		}

	}
	// TODO: Complete the function
}

function makeComputerMove() {
	const buttons = getGameBoardButtons();
	let rand_num = Math.floor(Math.random() * 10);

	const pos_moves = [];
	let x = 0;
	for (let i = 0; i<buttons.length; i++)
		if (buttons[i].innerHTML === "")
		{
			pos_moves[x] = i;
			x++;
		}
	buttons[pos_moves[1]].innerHTML = "O";
	buttons[pos_moves[1]].classList.add("o");
	buttons[pos_moves[1]].disabled = true;



	boardButtonClicked()
	switchTurn()
	// TODO: Complete the function
}