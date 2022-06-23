/**
 * Global Variables
 ******************************************************************************/
var highScoresContentEl = document.querySelector("#high-scores-wrapper");
var restartButtonEl = document.querySelector("#go-back");
var clearScoresButtonEl = document.querySelector("#clear-scores");
/**
 * Function Definitions
 ******************************************************************************/
var loadHighScores = function () {
  var userScores = localStorage.getItem("highScores");

  if (!userScores) {
    return [];
  }
  userScores = JSON.parse(userScores);
  console.log("high scores retreived: " + userScores);
  return userScores;
};

var loadHighScoresViewHandler = function () {
  // grab the high scores fromt he localStorage
  var highScores = loadHighScores();

  //create score list element
  for (var scoreIndex = 0; scoreIndex < highScores.length; scoreIndex++) {
    var scoreElementDivEl = document.createElement("div");
    scoreElementDivEl.id = "scoreElementId";
    scoreElementDivEl.className = "score";
    scoreElementDivEl.innerHTML =
      "<span>" +
      (scoreIndex + 1) +
      ". " +
      highScores[scoreIndex].name +
      " - " +
      highScores[scoreIndex].score +
      "</span>";

    console.log(scoreElementDivEl);
    highScoresContentEl.appendChild(scoreElementDivEl);
  }
};

var restartQuizButtonHandler = function () {
  window.location.href = "./index.html";
};

var clearScoresHandler = function () {
  localStorage.clear();
  restartQuizButtonHandler();
};
/**
 * Main Program
 ******************************************************************************/
window.addEventListener("load", loadHighScoresViewHandler);
restartButtonEl.addEventListener("click", restartQuizButtonHandler);
clearScoresButtonEl.addEventListener("click", clearScoresHandler);
