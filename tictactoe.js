

//gameboard
const gameboard = (function() {
    let fullboard = ["", "", "", "", "", "", "", "", ""];
    let square = [];
    let playerTurn = 1;
    let victory = false;
    let p1Array = [];
    let p2Array = [];

    
    //winning possibilities
    const victoryCombos = [
        [0,1,2],
        [0,3,6],
        [3,4,5],    
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

//get square elements
    for (i = 0; i < 9; i++) {
        square[i] = document.getElementById(`square-${i}`)
    }

    //render fullboard array contents to gameboard
    function render(gamearray) {
        for (i = 0; i < 9; i++) {
            square[i].textContent = `${fullboard[i]}`;
            }
        
        }        

    //allow players to click empty square to mark and update array each time
    const boardspace = document.querySelectorAll(".board");
    boardspace.forEach((boardspace, index) => {
        boardspace.addEventListener('click', e => {
            if (boardspace.textContent === "") {
                if (playerTurn == 1) {
                    boardspace.textContent = player1.symbol;
                    fullboard[index] = player1.symbol;
                    p1Array[index] = index;
                    checkWin();
                    if (victory === true) {
                        alert(`${(player1.name)} wins!`);
                    }
                    else {
                    playerTurn = 2;
                    }
                }
                else {
                    boardspace.textContent = player2.symbol;
                    fullboard[index] = player2.symbol;
                    p2Array[index] = index;
                    checkWin();
                    if (victory === true) {
                        alert(`${(player2.name)} wins!`);
                    }
                    else {
                    playerTurn = 1;
                    }
                }
            }
        })
    })



    //function to check if game is won
    function checkWin () {
        const arrayMatchValuesplayer1 = [];
        let arrayMatchplayer1 = "";
        victoryCombos.forEach((element, index) => {
            arrayMatchplayer1 = victoryCombos[index].every(element => {
                return p1Array.includes(element);
            })
            arrayMatchValuesplayer1[index] = arrayMatchplayer1;
        })
        const arrayMatchValuesplayer2 = [];
        let arrayMatchplayer2 = "";
        victoryCombos.forEach((element, index) => {
            arrayMatchplayer2 = victoryCombos[index].every(element => {
                return p2Array.includes(element);
            })
            arrayMatchValuesplayer2[index] = arrayMatchplayer2;
        })
 
       if (arrayMatchValuesplayer1.includes(true) || arrayMatchValuesplayer2.includes(true)) {
          victory = true;
      }
    }

    let resetbtn = document.querySelector(".resetbtn");
    resetbtn.addEventListener('click', e => {
        reset();
    })

    function reset() {
        fullboard = ["", "", "", "", "", "", "", "", ""];
        square = [];
        playerTurn = 1;
        victory = false;
        p1Array = [];
        p2Array = [];
        arrayMatchValuesplayer1 = [];
        arrayMatchValuesplayer2 = [];
        arrayMatchplayer1 = "";
        arrayMatchplayer2 = "";

        boardspace.forEach((boardspace, index) => {
            boardspace.textContent = "";
        })
    }


//arrayMatch = victoryCombos.every(element => {
  //  return p1Array.includes(element);
//})
//console.log(arrayMatch);


    return {
        render,
        reset
    }

})();


//factory for player objects
const playerFactory = (name, playerNumber, symbol) => {
    
    return {
        name,
        playerNumber,
        symbol,

    };
}

let player1 = playerFactory("Player 1", 1, "x");
let player2 = playerFactory("Player 2", 2, "o");

let scoreboard = document.querySelector(".scoreboard");


//make player names match input values upon button clicking, hides form and reveals scoreboard after clicking
let submitbtn = document.getElementById("submitbtn");
submitbtn.addEventListener('click', function() {
    player1.name = document.getElementById("player1name").value;
    player2.name = document.getElementById("player2name").value;
    alert(`${player1.name} vs ${player2.name}! ${player1.name} goes first!`)
    document.querySelector(".setup").style.display="none";
    scoreboard.textContent= `Player 1: ${player1.name}    Player 2: ${player2.name}`;
    scoreboard.style.display = "block";
},);


gameboard.render();