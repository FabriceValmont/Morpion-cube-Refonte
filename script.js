//Variables du jeu
const body = document.getElementById("body")
const gameMenu = document.getElementById("gameMenu")
const twoPlayerGame = document.getElementById("twoPlayerGame")
const gameContaint = document.getElementById("game")
const playButton = document.getElementById("play")
const reloadMenu = document.getElementById("reloadMenu")
const reload = document.getElementById("reload")
const message = document.getElementById("message");
const Joueur1 = document.getElementById("joueur1")
const Joueur2 = document.getElementById("joueur2")
const Joueur3 = document.getElementById("joueur3")
const timerIDJoueur1 = document.getElementById("timerJoueur1")
const timerIDJoueur2 = document.getElementById("timerJoueur2")
const timerIDJoueur3 = document.getElementById("timerJoueur3")
const cells = document.querySelectorAll(".cell");
const cells1 = document.querySelectorAll(".cell1");
const cells2 = document.querySelectorAll(".cell2");
const cells3 = document.querySelectorAll(".cell3");
const cells4 = document.querySelectorAll(".cell4");
const cells5 = document.querySelectorAll(".cell5");

const buttonRightUp = document.getElementById("buttonRightUp")
const buttonRightMiddle = document.getElementById("buttonRightMiddle")
const buttonRightDown = document.getElementById("buttonRightDown")

const buttonLeftUp = document.getElementById("buttonLeftUp")
const buttonLeftMiddle = document.getElementById("buttonLeftMiddle")
const buttonLeftDown = document.getElementById("buttonLeftDown")

const buttonUpLeft = document.getElementById("buttonUpLeft")
const buttonUpMiddle = document.getElementById("buttonUpMiddle")
const buttonUpRight = document.getElementById("buttonUpRight")

const buttonDownLeft = document.getElementById("buttonDownLeft")
const buttonDownMiddle = document.getElementById("buttonDownMiddle")
const buttonDownRight = document.getElementById("buttonDownRight")

const selectNumberOfPlayer = document.getElementById("numberOfPlayerList")
const selectMemory = document.getElementById("memoryList")
const selectTimer = document.getElementById("timerList")
const selectNumberOfRound = document.getElementById("numberOfRoundList")

let currentPlayer = "X";
let gameOver = false;
let winPlayer1 = 0
let winPlayer2 = 0
let winPlayer3 = 0
let roundTotal = winPlayer1 + winPlayer2 + winPlayer3
let buttonRightUpBlock = false
let buttonRightMiddleBlock = false
let buttonRightDownBlock = false
let buttonLeftUpBlock = false
let buttonLeftMiddleBlock = false
let buttonLeftDownBlock = false
let buttonUpRightBlock = false
let buttonMiddleRightBlock = false
let buttonDownRightBlock = false
let buttonUpLeftBlock = false
let buttonMiddleLeftBlock = false
let buttonDownLeftBlock = false

let twoPlayer = true
let memory = false
let timer = "infini"
let round = "1"

let startCompteur
let timerJoueur1 = -1
let timerJoueur2 = -1
let timerJoueur3 = -1
let timerEnd1 = false
let timerEnd2 = false
let timerEnd3 = false

//Programme menu du jeu
playButton.addEventListener("click", () => {
    gameMenu.style.display = "none"
    twoPlayerGame.style.display = "block"
    if(memory == false){
      body.className = "bg-black bg-contain bg-no-repeat bg-center h-full w-full text-white"
      body.style = "background-image: url(Image/grid_0.png);"
      gameContaint.className = "h-full w-[45rem] flex justify-center ml-auto mr-auto"
    }
    else{
      body.className = "bg-black bg-cover bg-no-repeat bg-center h-full w-full text-white"
      body.style = "background-image: url(Image/grid_0.png);"
      gameContaint.className = "h-full w-full flex justify-center ml-auto mr-auto"
    }
    
    if(timer != "infini"){
      startTimer()
    }
})

//initialisation des options
selectNumberOfPlayer.value = "two"
selectMemory.value = "false"
selectTimer.value = "infini"
selectNumberOfRound.value = "one"

selectNumberOfPlayer.addEventListener("change", () => {
  let selectValue = selectNumberOfPlayer.value
  if(selectValue == "three"){
    twoPlayer = false
    document.getElementById("joueur3").style.display = "block"
  }else{
    twoPlayer = true
    document.getElementById("joueur3").style.display = "none"
    }
})

selectMemory.addEventListener("change", () => {
  let selectValue = selectMemory.value
  if(selectValue == "true"){
    //ATTENTION le style.visibility = "visible"/"hidden" ne permet pas de garder en mémoire les symboles des joueurs
    memory = true
    document.getElementById("board1").style.display = "none"
    document.getElementById("board2").style.display = "none"
    document.getElementById("board3").style.display = "none"
    document.getElementById("board4").style.display = "none"
    document.getElementById("board5").style.display = "none"
    document.getElementById("titleBoardSecondary").style.display = "none"
  }else{
    memory = false
    document.getElementById("board1").style.display = "grid"
    document.getElementById("board2").style.display = "grid"
    document.getElementById("board3").style.display = "grid"
    document.getElementById("board4").style.display = "grid"
    document.getElementById("board5").style.display = "grid"
    document.getElementById("titleBoardSecondary").style.display = "block"
    }
})

selectTimer.addEventListener("change", () => {
  let selectValue = selectTimer.value
  if(selectValue == "thirtySeconds"){
    if(twoPlayer == true){
      timerJoueur1 = 30
      timerIDJoueur1.innerText = timerJoueur1
      timerJoueur2 = 30
      timerIDJoueur2.innerText = timerJoueur2
    }else{
      timerJoueur1 = 30
      timerIDJoueur1.innerText = timerJoueur1
      timerJoueur2 = 30
      timerIDJoueur2.innerText = timerJoueur2
      timerJoueur3 = 30
      timerIDJoueur3.innerText = timerJoueur3
    }
    timer = "thirtySeconds"
  }else if (selectValue == "sixtySeconds"){
    if(twoPlayer == true){
      timerJoueur1 = 60
      timerIDJoueur1.innerText = timerJoueur1
      timerJoueur2 = 60
      timerIDJoueur2.innerText = timerJoueur2
    }else{
      timerJoueur1 = 60
      timerIDJoueur1.innerText = timerJoueur1
      timerJoueur2 = 60
      timerIDJoueur2.innerText = timerJoueur2
      timerJoueur3 = 60
      timerIDJoueur3.innerText = timerJoueur3
      }
      timer = "sixtySeconds"
    }else{
      timer = "infini"
      timerIDJoueur1.innerText = ""
      timerIDJoueur2.innerText = ""
      timerIDJoueur3.innerText = ""
    }
     
})

selectNumberOfRound.addEventListener("change", () => {
  let selectValue = selectNumberOfRound.value
  if(selectValue == "three"){
    round = "3"

  }else if(selectValue == "five"){
    round = "5"

  }else{
    round = "1"

    }
})

//Programme jeu
const init = () => {
  board = ["","","","","","","","",""];
  board1 = ["","","","","","","","",""];
  board2 = ["","","","","","","","",""];
  board3 = ["","","","","","","","",""];
  board4 = ["","","","","","","","",""];
  board5 = ["","","","","","","","",""];

  currentPlayer = "X"
  gameOver = false
  message.innerText = ""
  winPlayer1 = 0
  winPlayer2 = 0
  winPlayer3 = 0
  timerEnd1 = false
  timerEnd2 = false
  timerEnd3 = false
  Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1} `
  Joueur2.innerHTML = `Joueur 2 (O) <br> manche ${winPlayer2} `
  Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3} `
  Joueur1.style.color = "#E708FF";
  Joueur2.style.color = "";
  Joueur3.style.color = "";

  if(twoPlayer == true){
    if(timer == "thirtySeconds"){
    timerJoueur1 = 30
    timerJoueur2 = 30
    timerIDJoueur1.innerText = timerJoueur1
    timerIDJoueur2.innerText = timerJoueur2
  }else if(timer == "sixtySeconds"){
    timerJoueur1 = 60
    timerJoueur2 = 60
    timerIDJoueur1.innerText = timerJoueur1
    timerIDJoueur2.innerText = timerJoueur2
  }else{
    timerIDJoueur1.innerText = ""
    timerIDJoueur2.innerText = ""
  }
  }else{
    if(timer == "thirtySeconds"){
      timerJoueur1 = 30
      timerJoueur2 = 30
      timerJoueur3 = 30
      timerIDJoueur1.innerText = timerJoueur1
      timerIDJoueur2.innerText = timerJoueur2
      timerIDJoueur3.innerText = timerJoueur3
    }else if(timer == "sixtySeconds"){
      timerJoueur1 = 60
      timerJoueur2 = 60
      timerJoueur3 = 60
      timerIDJoueur1.innerText = timerJoueur1
      timerIDJoueur2.innerText = timerJoueur2
      timerIDJoueur3.innerText = timerJoueur3
    }else{
      timerIDJoueur1.innerText = ""
      timerIDJoueur2.innerText = ""
      timerIDJoueur3.innerText = ""
    }
  }
  
  if(gameMenu.style.display == "none"){
    stopTimer()
    startTimer()
  }
  cleanCellule()
}

const handleClick = (event) => {

  if (gameOver == false){
    const cell = event.target;
  
    const index = Array.from(cells).indexOf(cell);

    if (cell.innerText == ""){
      cell.innerText = currentPlayer;
      board[index] = currentPlayer;

      buttonRightUpBlock = false
      buttonRightMiddleBlock = false
      buttonRightDownBlock = false
      buttonLeftUpBlock = false
      buttonLeftMiddleBlock = false
      buttonLeftDownBlock = false
      buttonUpRightBlock = false
      buttonMiddleRightBlock = false
      buttonDownRightBlock = false
      buttonUpLeftBlock = false
      buttonMiddleLeftBlock = false
      buttonDownLeftBlock = false

      checkWin()
      
      if (gameOver == false){
      changePlayer()
      }
    }
  }
}

//Permet de cliquer sur une cellule du tableau
cells.forEach((cell, index) => {

  cell.addEventListener("click", handleClick);

});

const changePlayer = () => {

  if (twoPlayer == true){
    if(gameOver == false) {
      if (currentPlayer === "X") {
        currentPlayer = "O";
        Joueur1.style.color = "";
        Joueur2.style.color = "#E708FF";
      }else {
        currentPlayer = "X";
        Joueur1.style.color = "#E708FF";
        Joueur2.style.color = "";
      }
     }else {
      
      }
  }else{
    if(gameOver == false) {

      if(timer == "infini"){
        if(currentPlayer === "X") {
          currentPlayer = "O";
          Joueur1.style.color = "";
          Joueur2.style.color = "#E708FF";
          Joueur3.style.color = "";
        }else if(currentPlayer === "O") {
          currentPlayer = "H";
          Joueur1.style.color = "";
          Joueur2.style.color = "";
          Joueur3.style.color = "#E708FF";
        }else{
          currentPlayer = "X";
          Joueur1.style.color = "#E708FF";
          Joueur2.style.color = "";
          Joueur3.style.color = "";
        }

      }else{
        if(currentPlayer === "X"){
          if(timerJoueur2 > 0){
            currentPlayer = "O";
            Joueur1.style.color = "";
            Joueur2.style.color = "#E708FF";
            Joueur3.style.color = "";
          }
          else{
            currentPlayer = "H";
            Joueur1.style.color = "";
            Joueur2.style.color = "";
            Joueur3.style.color = "#E708FF";
          }
        }else if(currentPlayer === "O"){
          if (timerJoueur3 > 0){
            currentPlayer = "H";
            Joueur1.style.color = "";
            Joueur2.style.color = "";
            Joueur3.style.color = "#E708FF";
          }
          else{
            currentPlayer = "X";
            Joueur1.style.color = "#E708FF";
            Joueur2.style.color = "";
            Joueur3.style.color = "";
          }
          
        }else if(currentPlayer === "H"){
          if(timerJoueur1 > 0){
            currentPlayer = "X";
            Joueur1.style.color = "#E708FF";
            Joueur2.style.color = "";
            Joueur3.style.color = "";
          }else{
            currentPlayer = "O";
            Joueur1.style.color = "";
            Joueur2.style.color = "#E708FF";
            Joueur3.style.color = "";
          }
          
        }
      }
    } 
    else {
    
    }
  }
}

// Fonctions qui permet de faire bouger les éléments du tableau vers les autres tableau

const changeLineRight = (verifRightMove) => {

    verifRightMove.forEach((position) => {
      const [a, b, c] = position;
      let memoryBoardEnd = board2[a]
      let memoryBoardEnd1 = board2[b]
      let memoryBoardEnd2 = board2[c]
      let memoryGameEnd = Array.from(cells2)[a].innerText
      let memoryGameEnd1 = Array.from(cells2)[b].innerText
      let memoryGameEnd2 = Array.from(cells2)[c].innerText

      board2[a] = board3[a]
      board2[b] = board3[b]
      board2[c] = board3[c]
      Array.from(cells2)[a].innerText = Array.from(cells3)[a].innerText
      Array.from(cells2)[b].innerText = Array.from(cells3)[b].innerText
      Array.from(cells2)[c].innerText = Array.from(cells3)[c].innerText

      board3[a] = board4[a]
      board3[b] = board4[b]
      board3[c] = board4[c]
      Array.from(cells3)[a].innerText = Array.from(cells4)[a].innerText
      Array.from(cells3)[b].innerText = Array.from(cells4)[b].innerText
      Array.from(cells3)[c].innerText = Array.from(cells4)[c].innerText

      board4[a] = board[a]
      board4[b] = board[b]
      board4[c] = board[c]
      Array.from(cells4)[a].innerText = Array.from(cells)[a].innerText
      Array.from(cells4)[b].innerText = Array.from(cells)[b].innerText
      Array.from(cells4)[c].innerText = Array.from(cells)[c].innerText

      board[a] = memoryBoardEnd
      board[b] = memoryBoardEnd1
      board[c] = memoryBoardEnd2
      Array.from(cells)[a].innerText = memoryGameEnd 
      Array.from(cells)[b].innerText = memoryGameEnd1
      Array.from(cells)[c].innerText = memoryGameEnd2

      checkWin()
      changePlayer()
  })
}

const changeLineLeft = (verifLeftMove) => {

  verifLeftMove.forEach((position) => {
    const [a, b, c] = position;
    let memoryBoardEnd = board4[a]
    let memoryBoardEnd1 = board4[b]
    let memoryBoardEnd2 = board4[c]
    let memoryGameEnd = Array.from(cells4)[a].innerText
    let memoryGameEnd1 = Array.from(cells4)[b].innerText
    let memoryGameEnd2 = Array.from(cells4)[c].innerText

    board4[a] = board3[a]
    board4[b] = board3[b]
    board4[c] = board3[c]
    Array.from(cells4)[a].innerText = Array.from(cells3)[a].innerText
    Array.from(cells4)[b].innerText = Array.from(cells3)[b].innerText
    Array.from(cells4)[c].innerText = Array.from(cells3)[c].innerText

    board3[a] = board2[a]
    board3[b] = board2[b]
    board3[c] = board2[c]
    Array.from(cells3)[a].innerText = Array.from(cells2)[a].innerText
    Array.from(cells3)[b].innerText = Array.from(cells2)[b].innerText
    Array.from(cells3)[c].innerText = Array.from(cells2)[c].innerText

    board2[a] = board[a]
    board2[b] = board[b]
    board2[c] = board[c]
    Array.from(cells2)[a].innerText = Array.from(cells)[a].innerText
    Array.from(cells2)[b].innerText = Array.from(cells)[b].innerText
    Array.from(cells2)[c].innerText = Array.from(cells)[c].innerText

    board[a] = memoryBoardEnd
    board[b] = memoryBoardEnd1
    board[c] = memoryBoardEnd2
    Array.from(cells)[a].innerText = memoryGameEnd 
    Array.from(cells)[b].innerText = memoryGameEnd1
    Array.from(cells)[c].innerText = memoryGameEnd2

    checkWin()
    changePlayer()
})
}

const changeLineUp = (verifUpMove) => {

  verifUpMove.forEach((position) => {
    const [a, b, c] = position;
    let memoryBoardEnd = board5[a]
    let memoryBoardEnd1 = board5[b]
    let memoryBoardEnd2 = board5[c]
    let memoryGameEnd = Array.from(cells5)[a].innerText
    let memoryGameEnd1 = Array.from(cells5)[b].innerText
    let memoryGameEnd2 = Array.from(cells5)[c].innerText
    console.log(board)
    console.log(memoryBoardEnd1)
    console.log(memoryBoardEnd2)
    console.log(Array.from(cells)[a])
    console.log(Array.from(cells)[b].innerText)
    console.log(Array.from(cells)[c].innerText)
  
    board5[a] = board3[a]
    board5[b] = board3[b]
    board5[c] = board3[c]
    Array.from(cells5)[a].innerText = Array.from(cells3)[a].innerText
    Array.from(cells5)[b].innerText = Array.from(cells3)[b].innerText
    Array.from(cells5)[c].innerText = Array.from(cells3)[c].innerText
  
    board3[a] = board1[a]
    board3[b] = board1[b]
    board3[c] = board1[c]
    Array.from(cells3)[a].innerText = Array.from(cells1)[a].innerText
    Array.from(cells3)[b].innerText = Array.from(cells1)[b].innerText
    Array.from(cells3)[c].innerText = Array.from(cells1)[c].innerText
  
    board1[a] = board[a]
    board1[b] = board[b]
    board1[c] = board[c]
    Array.from(cells1)[a].innerText = Array.from(cells)[a].innerText
    Array.from(cells1)[b].innerText = Array.from(cells)[b].innerText
    Array.from(cells1)[c].innerText = Array.from(cells)[c].innerText
  
    board[a] = memoryBoardEnd
    board[b] = memoryBoardEnd1
    board[c] = memoryBoardEnd2
    Array.from(cells)[a].innerText = memoryGameEnd 
    Array.from(cells)[b].innerText = memoryGameEnd1
    Array.from(cells)[c].innerText = memoryGameEnd2

    checkWin()
    changePlayer()
  })
}

const changeLineDown = (verifDownMove) => {

  verifDownMove.forEach((position) => {
  const [a, b, c] = position;
  let memoryBoardEnd = board1[a]
  let memoryBoardEnd1 = board1[b]
  let memoryBoardEnd2 = board1[c]
  let memoryGameEnd = Array.from(cells1)[a].innerText
  let memoryGameEnd1 = Array.from(cells1)[b].innerText
  let memoryGameEnd2 = Array.from(cells1)[c].innerText

  board1[a] = board3[a]
  board1[b] = board3[b]
  board1[c] = board3[c]
  Array.from(cells1)[a].innerText = Array.from(cells3)[a].innerText
  Array.from(cells1)[b].innerText = Array.from(cells3)[b].innerText
  Array.from(cells1)[c].innerText = Array.from(cells3)[c].innerText

  board3[a] = board5[a]
  board3[b] = board5[b]
  board3[c] = board5[c]
  Array.from(cells3)[a].innerText = Array.from(cells5)[a].innerText
  Array.from(cells3)[b].innerText = Array.from(cells5)[b].innerText
  Array.from(cells3)[c].innerText = Array.from(cells5)[c].innerText

  board5[a] = board[a]
  board5[b] = board[b]
  board5[c] = board[c]
  Array.from(cells5)[a].innerText = Array.from(cells)[a].innerText
  Array.from(cells5)[b].innerText = Array.from(cells)[b].innerText
  Array.from(cells5)[c].innerText = Array.from(cells)[c].innerText

  board[a] = memoryBoardEnd
  board[b] = memoryBoardEnd1
  board[c] = memoryBoardEnd2
  Array.from(cells)[a].innerText = memoryGameEnd 
  Array.from(cells)[b].innerText = memoryGameEnd1
  Array.from(cells)[c].innerText = memoryGameEnd2

  checkWin()
  changePlayer()
})
}

const rightUp = () => {
  const verifRightMove = [[0,1,2]]

  if(buttonRightUpBlock == false){
    changeLineRight(verifRightMove)

    buttonRightMiddleBlock = false
    buttonRightDownBlock = false
    buttonLeftUpBlock = true
    buttonLeftMiddleBlock = false
    buttonLeftDownBlock = false
    buttonUpRightBlock = false
    buttonMiddleRightBlock = false
    buttonDownRightBlock = false
    buttonUpLeftBlock = false
    buttonMiddleLeftBlock = false
    buttonDownLeftBlock = false
  }
    
}
  
const rightMiddle = () => {
  const verifRightMove = [[3,4,5]]

  if(buttonRightMiddleBlock == false){
  changeLineRight(verifRightMove)

  buttonRightUpBlock = false
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = true
  buttonLeftDownBlock = false
  buttonUpRightBlock = false
  buttonMiddleRightBlock = false
  buttonDownRightBlock = false
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = false
  }
}

const rightDown = () => {
  const verifRightMove = [[6,7,8]]

  if(buttonRightDownBlock == false){
  changeLineRight(verifRightMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = true
  buttonUpRightBlock = false
  buttonMiddleRightBlock = false
  buttonDownRightBlock = false
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = false
  }
} 

const leftUp = () => {
  const verifLeftMove = [[0,1,2]]

  if(buttonLeftUpBlock == false){
  changeLineLeft(verifLeftMove)

  buttonRightUpBlock = true
  buttonRightMiddleBlock = false
  buttonRightDownBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = false
  buttonUpRightBlock = false
  buttonMiddleRightBlock = false
  buttonDownRightBlock = false
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = false
  }
}
  
const leftMiddle = () => {
  const verifLeftMove = [[3,4,5]]

  if(buttonLeftMiddleBlock == false){
  changeLineLeft(verifLeftMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = true
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftDownBlock = false
  buttonUpRightBlock = false
  buttonMiddleRightBlock = false
  buttonDownRightBlock = false
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = false
  }
}

const leftDown = () => {
  const verifLeftMove = [[6,7,8]]

  if(buttonLeftUpBlock == false){
  changeLineLeft(verifLeftMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonRightDownBlock = true
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonUpRightBlock = false
  buttonMiddleRightBlock = false
  buttonDownRightBlock = false
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = false
  }
}

const upLeft = () => {
  const verifUpMove = [[0,3,6]]

  if(buttonUpRightBlock == false){
  changeLineUp(verifUpMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = false
  buttonMiddleRightBlock = false
  buttonDownRightBlock = false
  buttonUpLeftBlock = true
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = false
  }
}

const upMiddle = () => {
  const verifUpMove = [[1,4,7]]

  if(buttonMiddleRightBlock == false){
  changeLineUp(verifUpMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = false
  buttonUpRightBlock = false
  buttonDownRightBlock = false
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = true
  buttonDownLeftBlock = false
  }
}

const upRight = () => {
  const verifUpMove = [[2,5,8]]

  if(buttonDownRightBlock == false){
  changeLineUp(verifUpMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = false
  buttonUpRightBlock = false
  buttonMiddleRightBlock = false
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = true
  }
}

const downLeft = () => {
  const verifDownMove = [[0,3,6]]

  if(buttonUpLeftBlock == false){
  changeLineDown(verifDownMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = false
  buttonUpRightBlock = true
  buttonMiddleRightBlock = false
  buttonDownRightBlock = false
  buttonMiddleLeftBlock = false
  buttonDownLeftBlock = false
  }
} 
    
const downMiddle = () => {
  const verifDownMove = [[1,4,7]]

  if(buttonMiddleLeftBlock == false){
  changeLineDown(verifDownMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = false
  buttonUpRightBlock = false
  buttonMiddleRightBlock = true
  buttonDownRightBlock = false
  buttonUpLeftBlock = false
  buttonDownLeftBlock = false
  }
}

const downRight = () => {
  const verifDownMove = [[2,5,8]]

  if(buttonDownLeftBlock == false){
  changeLineDown(verifDownMove)

  buttonRightUpBlock = false
  buttonRightMiddleBlock = false
  buttonRightDownBlock = false
  buttonLeftUpBlock = false
  buttonLeftMiddleBlock = false
  buttonLeftDownBlock = false
  buttonUpRightBlock = false
  buttonMiddleRightBlock = false
  buttonDownRightBlock = true
  buttonUpLeftBlock = false
  buttonMiddleLeftBlock = false
  }
}

buttonRightUp.addEventListener("click", rightUp);
buttonRightMiddle.addEventListener("click", rightMiddle);
buttonRightDown.addEventListener("click", rightDown);

buttonLeftUp.addEventListener("click", leftUp);
buttonLeftMiddle.addEventListener("click", leftMiddle);
buttonLeftDown.addEventListener("click", leftDown);

buttonUpLeft.addEventListener("click", upLeft);
buttonUpMiddle.addEventListener("click", upMiddle);
buttonUpRight.addEventListener("click", upRight);

buttonDownLeft.addEventListener("click", downLeft);
buttonDownMiddle.addEventListener("click", downMiddle);
buttonDownRight.addEventListener("click", downRight);

//Programmation des timers
const startTimer = () => {
  startCompteur = setInterval(incrementTimer, 1000);
}

const incrementTimer = () => {
  
  if(currentPlayer == "X" && timerJoueur1 > 0){
    timerJoueur1--;
    timerIDJoueur1.innerText = timerJoueur1
  }else if(currentPlayer == "O" && timerJoueur2 > 0){
    timerJoueur2--;
    timerIDJoueur2.innerText = timerJoueur2
  }else if(currentPlayer == "H" && timerJoueur3 > 0){
    timerJoueur3--;
    timerIDJoueur3.innerText = timerJoueur3
  }

  if(timerJoueur1 == 0 && timerEnd1 == false){
    changePlayer()
    timerEnd1 = true
  }
  if(timerJoueur2 == 0 && timerEnd2 == false){
    changePlayer()
    timerEnd2 = true
  }
  if(timerJoueur3 == 0 && timerEnd3 == false){
    changePlayer()
    timerEnd3 = true
  }

  checkWinTimer()
}

const stopTimer = () => {
  clearInterval(startCompteur);
}

const checkWinTimer = () => {

  if(twoPlayer == true){
    if(timerJoueur1 == 0 || timerJoueur2 == 0){
      if(round == "1"){
        gameOver = true;
        stopTimer()
        if (timerJoueur1 == 0) {
          message.innerText = `Le joueur "O" a gagné !`;
          winPlayer2 += 1
          Joueur2.innerHTML = `Joueur 2 (0) <br> manche ${winPlayer2} `
        }
        else if (timerJoueur2 == 0){
          message.innerText = `Le joueur "X" a gagné !`;
          winPlayer1 += 1
          Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1} `
        }
      }
      else if (round == "3"){
        if (timerJoueur1 == 0) {
          message.innerText = `Le joueur "O" a gagné la manche!`;
          winPlayer2 += 1
          Joueur2.innerHTML = `Joueur 2 (0) <br> manche ${winPlayer2}`
          gameOver = true;
          stopTimer()
        }
        else if (timerJoueur2 == 0){
          message.innerText = `Le joueur "X" a gagné la manche !`;
          winPlayer1 += 1
          Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1}`
          
          gameOver = true;
          stopTimer()
        }
    
          roundTotal = winPlayer1 + winPlayer2 + winPlayer3
    
          if(winPlayer1 < 2 && winPlayer2 < 2 && winPlayer3 < 2){
            setTimeout(initRound, 3000)
          }
    
          if(winPlayer1 == 2){
            gameOver = true;
            message.innerText = `Le joueur "X" a gagné !`;
            stopTimer()
          }
          else if (winPlayer2 == 2){
            gameOver = true;
            message.innerText = `Le joueur "O" a gagné !`;
            stopTimer()
          }
      }
      else if (round == "5"){
        if (timerJoueur1 == 0) {
          message.innerText = `Le joueur "O" a gagné la manche!`;
          winPlayer2 += 1
          Joueur2.innerHTML = `Joueur 2 (0) <br> manche ${winPlayer2}`
          gameOver = true;
          stopTimer()
        }
        else if (timerJoueur2 == 0){
          message.innerText = `Le joueur "X" a gagné la manche !`;
          winPlayer1 += 1
          Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1}`
          gameOver = true;
          stopTimer()
        }

        roundTotal = winPlayer1 + winPlayer2 + winPlayer3

        if(winPlayer1 < 3 && winPlayer2 < 3 && winPlayer3 < 3){
          setTimeout(initRound, 3000)
        }

        if(winPlayer1 == 3){
          gameOver = true;
          message.innerText = `Le joueur "X" a gagné !`;
          stopTimer()
        }
        else if (winPlayer2 == 3){
          gameOver = true;
          message.innerText = `Le joueur "O" a gagné !`;
          stopTimer()
        }
      }

      buttonRightUpBlock = true
      buttonRightMiddleBlock = true
      buttonRightDownBlock = true
      buttonLeftUpBlock = true
      buttonLeftMiddleBlock = true
      buttonLeftDownBlock = true
      buttonUpRightBlock = true
      buttonMiddleRightBlock = true
      buttonDownRightBlock = true
      buttonUpLeftBlock = true
      buttonMiddleLeftBlock = true
      buttonDownLeftBlock = true
    }
  }else{
    if(timerJoueur1 == 0 && timerJoueur2 == 0){
      if(round == "1"){
        gameOver = true;
        stopTimer()
        message.innerText = `Le joueur "H" a gagné !`;
        winPlayer3 += 1
        Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3} `
      }
      else if (round == "3"){
          message.innerText = `Le joueur "H" a gagné la manche !`;
          winPlayer3 += 1
          Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3}`
          gameOver = true;
          stopTimer()
    
          roundTotal = winPlayer1 + winPlayer2 + winPlayer3
    
          if(winPlayer3 < 2){
            setTimeout(initRound, 3000)
          }
    
          if(winPlayer3 == 2){
            gameOver = true;
            message.innerText = `Le joueur "H" a gagné !`;
            stopTimer()
          }
      }
      else if (round == "5"){
          message.innerText = `Le joueur "H" a gagné la manche !`;
          winPlayer3 += 1
          Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3}`
          gameOver = true;
          stopTimer()
    
          roundTotal = winPlayer1 + winPlayer2 + winPlayer3
    
          if(winPlayer3 < 3){
            setTimeout(initRound, 3000)
          }
    
          if(winPlayer3 == 3){
            gameOver = true;
            message.innerText = `Le joueur "H" a gagné !`;
            stopTimer()
          }
      }
    }
    else if (timerJoueur1 == 0 && timerJoueur3 == 0){
      if(round == "1"){
        gameOver = true;
        stopTimer()
        message.innerText = `Le joueur "O" a gagné !`;
        winPlayer2 += 1
        Joueur2.innerHTML = `Joueur 2 (O) <br> manche ${winPlayer2} `
      }
      else if (round == "3"){
          message.innerText = `Le joueur "O" a gagné la manche !`;
          winPlayer2 += 1
          Joueur2.innerHTML = `Joueur 2 (O) <br> manche ${winPlayer2}`
          gameOver = true;
          stopTimer()
    
          roundTotal = winPlayer1 + winPlayer2 + winPlayer3
    
          if(winPlayer2 < 2){
            setTimeout(initRound, 3000)
          }
    
          if(winPlayer2 == 2){
            gameOver = true;
            message.innerText = `Le joueur "O" a gagné !`;
            stopTimer()
          }
      }
      else if (round == "5"){
        message.innerText = `Le joueur "O" a gagné la manche !`;
        winPlayer2 += 1
        Joueur2.innerHTML = `Joueur 2 (O) <br> manche ${winPlayer2}`
        gameOver = true;
        stopTimer()
  
        roundTotal = winPlayer1 + winPlayer2 + winPlayer3
  
        if(winPlayer2 < 3){
          setTimeout(initRound, 3000)
        }
  
        if(winPlayer2 == 3){
          gameOver = true;
          message.innerText = `Le joueur "O" a gagné !`;
          stopTimer()
        }
      }
    }
    else if (timerJoueur2 == 0 && timerJoueur3 == 0){
      if(round == "1"){
        gameOver = true;
        stopTimer()
        message.innerText = `Le joueur "X" a gagné !`;
        winPlayer1 += 1
        Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1} `
      }
      else if (round == "3"){
          message.innerText = `Le joueur "X" a gagné la manche !`;
          winPlayer1 += 1
          Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1}`
          gameOver = true;
          stopTimer()
    
          roundTotal = winPlayer1 + winPlayer2 + winPlayer3
    
          if(winPlayer1 < 2){
            setTimeout(initRound, 3000)
          }
    
          if(winPlayer1 == 2){
            gameOver = true;
            message.innerText = `Le joueur "X" a gagné !`;
            stopTimer()
          }
      }
      else if (round == "5"){
        message.innerText = `Le joueur "X" a gagné la manche !`;
        winPlayer1 += 1
        Joueur1.innerHTML = `Joueur 2 (X) <br> manche ${winPlayer1}`
        gameOver = true;
        stopTimer()
  
        roundTotal = winPlayer1 + winPlayer2 + winPlayer3
  
        if(winPlayer1 < 3){
          setTimeout(initRound, 3000)
        }
  
        if(winPlayer1 == 3){
          gameOver = true;
          message.innerText = `Le joueur "X" a gagné !`;
          stopTimer()
        }
      }
    }
  }
}

//Clean toutes les cellules
const cleanCellule = () => {
  cells.forEach((cell) => {
    cell.innerText = ""
  });
  cells1.forEach((cell) => {
    cell.innerText = ""
  });
  cells2.forEach((cell) => {
    cell.innerText = ""
  });
  cells3.forEach((cell) => {
    cell.innerText = ""
  });
  cells4.forEach((cell) => {
    cell.innerText = ""
  });
  cells5.forEach((cell) => {
    cell.innerText = ""
  });
}

//Réinitialise une nouvelle manche
const initRound = () => {
  board = ["","","","","","","","",""];
  board1 = ["","","","","","","","",""];
  board2 = ["","","","","","","","",""];
  board3 = ["","","","","","","","",""];
  board4 = ["","","","","","","","",""];
  board5 = ["","","","","","","","",""];
  gameOver = false
  timerEnd1 = false
  timerEnd2 = false
  timerEnd3 = false

  if (twoPlayer == true){
    if(roundTotal == 1 || roundTotal == 3){
      currentPlayer = "O"
      Joueur1.style.color = "";
      Joueur2.style.color = "#E708FF";
    }
    else if(roundTotal == 2 || roundTotal == 4){
      currentPlayer = "X"
      Joueur1.style.color = "#E708FF";
      Joueur2.style.color = "";
    }
  }
  else{
    if(roundTotal == 1 || roundTotal == 4){
      currentPlayer = "O"
      Joueur1.style.color = "";
      Joueur2.style.color = "#E708FF";
      Joueur3.style.color = "";
    }
    else if(roundTotal == 2 || roundTotal == 5){
      currentPlayer = "H"
      Joueur1.style.color = "";
      Joueur2.style.color = "";
      Joueur3.style.color = "#E708FF";
    }
    else if(roundTotal == 3 || roundTotal == 6){
      currentPlayer = "X"
      Joueur1.style.color = "#E708FF";
      Joueur2.style.color = "";
      Joueur3.style.color = "";
    }
  }
  
  message.innerText = ""
  Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1} `
  Joueur2.innerHTML = `Joueur 2 (O) <br> manche ${winPlayer2} `
  Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3} `

  if(twoPlayer == true){
    if(timer == "thirtySeconds"){
    timerJoueur1 = 30
    timerJoueur2 = 30
    timerIDJoueur1.innerText = timerJoueur1
    timerIDJoueur2.innerText = timerJoueur2
  }else if(timer == "sixtySeconds"){
    timerJoueur1 = 60
    timerJoueur2 = 60
    timerIDJoueur1.innerText = timerJoueur1
    timerIDJoueur2.innerText = timerJoueur2
  }else{
    timerIDJoueur1.innerText = ""
    timerIDJoueur2.innerText = ""
  }
  }else{
    if(timer == "thirtySeconds"){
      timerJoueur1 = 30
      timerJoueur2 = 30
      timerJoueur3 = 30
      timerIDJoueur1.innerText = timerJoueur1
      timerIDJoueur2.innerText = timerJoueur2
      timerIDJoueur3.innerText = timerJoueur3
    }else if(timer == "sixtySeconds"){
      timerJoueur1 = 60
      timerJoueur2 = 60
      timerJoueur3 = 60
      timerIDJoueur1.innerText = timerJoueur1
      timerIDJoueur2.innerText = timerJoueur2
      timerIDJoueur3.innerText = timerJoueur3
    }else{
      timerIDJoueur1.innerText = ""
      timerIDJoueur2.innerText = ""
      timerIDJoueur3.innerText = ""
    }
  }
  
  if(gameMenu.style.display == "none" && timer != "infini"){
    stopTimer()
    startTimer()
  }

  cleanCellule()
}

// Vérifie si un joueur a gagné
const checkWin = () => {
	const winningPositions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	winningPositions.forEach((position) => {
		const [a, b, c] = position;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			
      if(round == "1"){
        gameOver = true;
        stopTimer()
        if (board[a] == "X" && board[b] == "X" && board[c] == "X") {
        message.innerText = `Le joueur "X" a gagné !`;
          winPlayer1 += 1
          Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1} `
        }
        else if (board[a] == "O" && board[b] == "O" && board[c] == "O"){
          message.innerText = `Le joueur "O" a gagné !`;
          winPlayer2 += 1
          Joueur2.innerHTML = `Joueur 2 (0) <br> manche ${winPlayer2} `
        } else {
          message.innerText = `Le joueur "H" a gagné !`;
          winPlayer3 += 1
          Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3} `
        }
      }
      else if (round == "3"){
        if (board[a] == "X" && board[b] == "X" && board[c] == "X") {
            message.innerText = `Le joueur "X" a gagné la manche !`;
            winPlayer1 += 1
            Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1}`
            gameOver = true;
            stopTimer()
          }
          else if (board[a] == "O" && board[b] == "O" && board[c] == "O"){
            message.innerText = `Le joueur "O" a gagné la manche!`;
            winPlayer2 += 1
            Joueur2.innerHTML = `Joueur 2 (0) <br> manche ${winPlayer2}`
            gameOver = true;
            stopTimer()
          } else {
            message.innerText = `Le joueur "H" a gagné la manche!`;
            winPlayer3 += 1
            Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3}`
            gameOver = true;
            stopTimer()
          }

          roundTotal = winPlayer1 + winPlayer2 + winPlayer3

          if(winPlayer1 < 2 && winPlayer2 < 2 && winPlayer3 < 2){
            setTimeout(initRound, 3000)
          }

          if(winPlayer1 == 2){
            gameOver = true;
            message.innerText = `Le joueur "X" a gagné !`;
            stopTimer()
          }
          else if (winPlayer2 == 2){
            gameOver = true;
            message.innerText = `Le joueur "O" a gagné !`;
            stopTimer()
          }
          else if(winPlayer3 == 2){
            gameOver = true;
            message.innerText = `Le joueur "H" a gagné !`;
            stopTimer()
          }

      }
      else if (round == "5"){
        if (board[a] == "X" && board[b] == "X" && board[c] == "X") {
          message.innerText = `Le joueur "X" a gagné la manche !`;
          winPlayer1 += 1
          Joueur1.innerHTML = `Joueur 1 (X) <br> manche ${winPlayer1}`
          gameOver = true;
          stopTimer()
        }
        else if (board[a] == "O" && board[b] == "O" && board[c] == "O"){
          message.innerText = `Le joueur "O" a gagné la manche!`;
          winPlayer2 += 1
          Joueur2.innerHTML = `Joueur 2 (0) <br> manche ${winPlayer2}`
          gameOver = true;
          stopTimer()
        } else {
          message.innerText = `Le joueur "H" a gagné la manche!`;
          winPlayer3 += 1
          Joueur3.innerHTML = `Joueur 3 (H) <br> manche ${winPlayer3}`
          gameOver = true;
          stopTimer()
        }

        roundTotal = winPlayer1 + winPlayer2 + winPlayer3

        if(winPlayer1 < 3 && winPlayer2 < 3 && winPlayer3 < 3){
          setTimeout(initRound, 3000)
        }

        if(winPlayer1 == 3){
          gameOver = true;
          message.innerText = `Le joueur "X" a gagné !`;
          stopTimer()
        }
        else if (winPlayer2 == 3){
          gameOver = true;
          message.innerText = `Le joueur "O" a gagné !`;
          stopTimer()
        }
        else if(winPlayer3 == 3){
          gameOver = true;
          message.innerText = `Le joueur "H" a gagné !`;
          stopTimer()
        }
      }
          buttonRightUpBlock = true
          buttonRightMiddleBlock = true
          buttonRightDownBlock = true
          buttonLeftUpBlock = true
          buttonLeftMiddleBlock = true
          buttonLeftDownBlock = true
          buttonUpRightBlock = true
          buttonMiddleRightBlock = true
          buttonDownRightBlock = true
          buttonUpLeftBlock = true
          buttonMiddleLeftBlock = true
          buttonDownLeftBlock = true
    }
  });
}

reloadMenu.addEventListener("click", () => {
  location.reload()
})

reload.addEventListener("click", init)

init()
