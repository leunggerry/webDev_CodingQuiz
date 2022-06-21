/**
 * Global Variables
 ******************************************************************************/
var quizFormEl = document.querySelector("#quiz-form");
const questionsLib = [
  "Commonly used data types DO NOT include:",
  "The condition in an if/else statement is enclosed within ____.",
  "Arrays in JavaScript can be used to store ____.",
  "String values must be enclosed within ____ when being assigned to variables.",
  "A very useful tool used during development and debugging for printing content to the debugger is:",
];
const answersLib = [
  "strings,booleans,alerts,numbers",
  "quotes,curly brackets,parentheses,square brackets",
  "numbers and strings,other arrays,booleans,all of the above",
  "commas,curly brackets, quotes, parentheses",
  "JavaScript,terminal/bash,for loops, consol.log",
];
const correctAnswersLib = ["alerts", "parentheses", "all of the above", "quotes", "console.log"];
/**
 * Function Definitions
 ******************************************************************************/
var askCodingQuestionWrapper = function (index) {
  //create question element form as well as answer element form
  var questionElementForm = document.createElement("div");
  questionElementForm.className = "question-group";
  questionElementForm.id = "question-content";

  // populate question element with text content
  questionElementForm.innerHTML =
    "<h3 class='question-content-string' id='" + index + "'>" + questionsLib[index] + "</h3>";
  //append the question child to the quiz form parent
  quizFormEl.appendChild(questionElementForm);

  //create answer div section
  var multipleChoiceForm = document.createElement("ol");
  multipleChoiceForm.className = "multiple-choice-wrapper-content";
  quizFormEl.appendChild(multipleChoiceForm);
  //create answer elements
  mulChoices = answersLib[index];
  mulChoices = mulChoices.split(",");

  for (var i = 0; i < mulChoices.length; i++) {
    choiceEl = createAnswerButton(mulChoices[i], i + 1);
    multipleChoiceForm.appendChild(choiceEl);
  }
};

var createAnswerButton = function (choice, index) {
  // create mulitple choice button and return the element
  var choiceEl = document.createElement("button");
  choiceEl.className = "multiple-choice-option-group";
  choiceEl.id = "choice-" + choice;
  choiceEl.textContent = index + ". " + choice;
  return choiceEl;
};
/**
 *
 * @param {*} event
 */
var startQuizHandler = function (event) {
  event.preventDefault();
  console.log("starting quiz");

  //get rid of the welcome screen
  var pageTitleEl = document.querySelector(".page-title");
  var introContentEl = document.querySelector("#intro-content");
  var startButtonEl = document.querySelector("#start-quiz-btn");
  pageTitleEl.textContent = "";
  introContentEl.textContent = "";

  //remove the start button
  startButtonEl.parentElement.removeChild(startButtonEl);

  //start pull up the quiz questions
  for (var i = 0; i < questionsLib.length; i++) {
    var isCorrect = askCodingQuestionWrapper(i);
    if (!isCorrect) {
      return false;
    }
  }
};

/**
 * Main Program
 ******************************************************************************/
quizFormEl.addEventListener("click", startQuizHandler);
