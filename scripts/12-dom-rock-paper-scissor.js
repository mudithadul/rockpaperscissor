const score = JSON.parse(localStorage.getItem('score')) || {
  tie: 0,
  computer: 0,
  you: 0,
};

var intervalId = undefined;


function resetScore() {
  score.tie = 0;
  score.computer = 0;
  score.you = 0;
  localStorage.removeItem('score');
  updateScore(score);
  document.querySelector(".js-moves-parapraph").innerHTML = "";
  document.querySelector(".js-result-paragraph").innerHTML="";
}

document.querySelector(".js-rock-button").addEventListener('click', () => {
  playGame('rock');
});
document.querySelector(".js-paper-button").addEventListener('click', () => {
  playGame('paper');
});
document.querySelector(".js-scissor-button").addEventListener('click', () => {
  playGame('scissor');
});

function playGame(humanSelection) {
  let computer = getComputerMove();
  let win = getWhoWin(humanSelection, computer);
  console.log(`The Winner is: ${win}`);

  document.querySelector(".js-moves-parapraph").innerHTML = 
  `You : 
  <img src="images/${humanSelection}-emoji.png" class="move-icon">
  <img src="images/${computer}-emoji.png" class="move-icon"> 
  : Computer`;

  const whoWinElement = document.querySelector(".js-result-paragraph");

  if (win === 'Tie') {
    score.tie += 1;
    whoWinElement.innerHTML = "It's a Tie";
  } else if (win === 'Computer') {
    score.computer += 1;
    whoWinElement.innerHTML = "Computer Win";
  } else if (win === 'You') {
    score.you += 1;
    whoWinElement.innerHTML = "You Win";
  }
  console.log(`Tie:${score.tie} Computer:${score.computer} You:${score.you}`);
  localStorage.setItem('score', JSON.stringify(score));
  updateScore(score);
}

function updateScore(params) {
    document.querySelector('.js-score-paragraph').innerHTML = `Win:${params.you} Losses:${params.computer} Tie:${params.tie}`;
  }

function getComputerMove() {
  let val = Math.floor(Math.random() * 3 + 1);
  if (val === 1) {
    return 'rock';
  } else if (val === 2) {
    return 'paper';
  } else if (val === 3) {
    return 'scissor';
  }
}
function getWhoWin(human, computer) {
  if (human === 'rock') {
    if (computer === 'rock') {
      return 'Tie';
    } else if (computer === 'paper') {
      return 'Computer';
    } else if (computer === 'scissor') {
      return 'You';
    }

  } else if (human === 'paper') {
    if (computer === 'rock') {
      return 'You';
    } else if (computer === 'paper') {
      return 'Tie';
    } else if (computer === 'scissor') {
      return 'Computer';
    }

  } else if (human === 'scissor') {
    if (computer === 'rock') {
      return 'Computer';
    } else if (computer === 'paper') {
      return 'You';
    } else if (computer === 'scissor') {
      return 'Tie';
    }

  }

}
function autoPlay() {

  if (intervalId !== undefined) {
    clearInterval(intervalId);
    resetScore();
    return;
  }
  intervalId = setInterval(function () {
    let humanMove = getComputerMove();
    playGame(humanMove);
  }, 4000);

}
