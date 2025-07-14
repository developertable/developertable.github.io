let nameRect = document.querySelector('#nameRect');
let gameRect = document.querySelector('#gameRect');
let gameBox = document.querySelector('#gameBox');
let resultRect = document.querySelector('#resultRect');
let blocks = document.querySelectorAll('.gameBlock');
let playerBtn = document.querySelector('#playerBtn');
let gameOverDiv = document.querySelector('#gameOverDiv');
let namesBox;
let gameOverText = document.querySelector('#gameOverText');
let playAgainBtn = document.querySelector('#playAgainBtn');
let smileyBox = document.querySelector('#smileyBox');
let smilies = document.querySelectorAll('.smiley');
let playerStyle1;
let playerStyle2;
let selectedSmilies = [];
let scoreBox = document.querySelector('#scoreBox');
let scoreCard = document.createElement('div');
let resetScore = document.querySelector('#resetScore');
let player1Score = 0;
let player2Score = 0;
let tieScore = 0;

const availableEmojis = ['🥴', '😶', '😡', '🤬', '😱', '😳', '🤮', '🥳', '🤧', '😋', '⭕', '❌' ];

function chooseSmiley(smileyNumber) {
  let emoji = availableEmojis[smileyNumber];
  let index = selectedSmilies.indexOf(emoji);
  let smileyBtn = document.querySelectorAll('.smiley')[smileyNumber];
  
  if (index === -1 && selectedSmilies.length < 2) {
    selectedSmilies.push(emoji);
    smileyBtn.style.background = '#8bafe6';
    console.log("Added smiley " + emoji);
    
    if (selectedSmilies.length === 1) {
      playerStyle1 = emoji;
    } else if (selectedSmilies.length === 2) {
      playerStyle2 = emoji;

    }
  } else if (index !== -1) {
    selectedSmilies.splice(index, 1);
    smileyBtn.style.background = '';
    console.log("Removed smiley " + emoji);

    playerStyle1 = selectedSmilies[0] || undefined;
    playerStyle2 = selectedSmilies[1] || undefined;
  }
  
}

let gameOver = false;
let gameBoard = 
['', '', '',
'', '', '',
'', '', '',
];

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],   
  [0,3,6], [1,4,7], [2,5,8],   
  [0,4,8], [2,4,6]             
];
let player1Input = document.querySelector('#player1');
let player2Input = document.querySelector('#player2');
let player1Name = '';
let player2Name = '';
let currentPlayer = playerStyle1;

function printNames() {
  player1Name = player1Input.value.trim();
  player2Name = player2Input.value.trim();

  if (player1Name === '' || player2Name === '') {
    alert('Please enter both player names');
    return;
  }
  
  if (!playerStyle1 || !playerStyle2) {
    alert('Please select 2 different emojis');
    return;
  }
  
  currentPlayer = playerStyle1;
  
  let existingNamesBox = document.querySelector('#namesBox');
  if (existingNamesBox) {
    existingNamesBox.remove();
  }
  
  let namesBox = document.createElement('div');
  namesBox.id = 'namesBox';
  namesBox.innerHTML = `
    <p>${player1Name}: ${playerStyle1}</p>
    <p>${player2Name}: ${playerStyle2}</p>`;
  nameRect.appendChild(namesBox);
  
  playerBtn.disabled = true;
  playerBtn.style.cursor = 'not-allowed';

  displayScore();
};

function playerMove(event) {
  if (gameOver) {
    gameOverDiv.style.display = 'block';
    return;
  }

  if (!player1Name || !player2Name) {
    alert('Please enter names, select emojis & submit!');
    return;
  }
  if (!playerStyle1 || !playerStyle2) {
    alert('Please select 2 different emojis first!');
    return;
  }

  let clickedBlock = event.target;
  let blockIndex = parseInt(clickedBlock.getAttribute('data-index'));

  if (gameBoard[blockIndex] !== '') {
    alert('This spot is already taken!');
    return;
  }

  gameBoard[blockIndex] = currentPlayer;
  clickedBlock.textContent = currentPlayer;
  if (checkWin() == true) {
    let winnerName = currentPlayer === playerStyle1 ? player1Name : player2Name;
    gameOverText.textContent = `🎉 ${winnerName} wins!`;
    gameOver = true;

    if (currentPlayer === playerStyle1) {
      player1Score++;
    } else {
      player2Score++;
    }
    displayScore();
    return;
  }
  if (checkTie()) {
    gameOverText.textContent = "It's a draw!";
    gameOver = true;
    gameOverDiv.style.display = 'block';
    tieScore++;
    displayScore();
    return;
  }
  currentPlayer = currentPlayer === playerStyle1 ? playerStyle2 : playerStyle1;

}

function checkWin() {
  for (let combination of winningCombinations) {
    let [a,b,c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      blocks[a].style.backgroundColor = '#4CAF50';
      blocks[b].style.backgroundColor = '#4CAF50';
      blocks[c].style.backgroundColor = '#4CAF50';
      gameOverDiv.style.display = 'block';
      return true;
    }
  }
  return false;
}
function checkTie() {
  return  tie = gameBoard.every(cell => cell !== '');
}
function resetAll() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = playerStyle1;
  gameOver = false;
  
  blocks.forEach(block => {
  block.textContent = '';
  block.style.backgroundColor = '';
  });
  
  gameOverDiv.style.display = 'none';
  gameOverText.textContent = '';
}

function displayScore() {
  if (player1Name && player2Name) {
    scoreCard.innerHTML = `
      <h1>Score</h1>
      <p>${player1Name}: ${player1Score}</p>
      <p>${player2Name}: ${player2Score}</p>
      <p>Ties: ${tieScore}</p>`;
    
    scoreBox.innerHTML = '';
    scoreBox.appendChild(scoreCard);
  }
}

