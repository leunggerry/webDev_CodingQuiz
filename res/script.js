/**
 * Global Variables
 ******************************************************************************/
var quizFormEl = document.querySelector("#quiz-form");
var startQuizFormEl = document.querySelector("#start-quiz-form");
var questionId = 0;
var userScore = 60;
var highScores = [];

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
  "JavaScript,terminal/bash,for loops, console.log",
];
const correctAnswersLib = ["alerts", "parentheses", "all of the above", "quotes", "console.log"];
/**
 * Function Definitions
 ******************************************************************************/
var askCodingQuestionWrapper = function (questionIndex, prevQVerdict = null) {
  // check if this question form is already there otherwise create it
  var questionAsked = document.querySelector("#question-content");
  // console.log("question asked: " + questionAsked);
  if (questionAsked) {
    askNextQuestionHandler(questionIndex, prevQVerdict);
  }
  // quiz just started, ask first question
  else {
    createQuestionElement(questionIndex);
  }
};

var createQuestionElement = function (questionIndex) {
  //create question element form as well as answer element form
  var questionElementForm = document.createElement("div");
  questionElementForm.className = "question-group";
  questionElementForm.id = "question-content";
  questionElementForm.setAttribute("data-question-index", questionIndex);

  // populate question element with text content
  questionElementForm.innerHTML =
    "<h3 class='question-content-string' id='question-text-id'>" +
    questionsLib[questionIndex] +
    "</h3>";
  //append the question child to the quiz form parent
  quizFormEl.appendChild(questionElementForm);

  //create answer div section
  var multipleChoiceFormEl = document.createElement("div");
  multipleChoiceFormEl.className = "multiple-choice-wrapper-form";
  multipleChoiceFormEl.id = "multiple-choice-wrapper-form";
  quizFormEl.appendChild(multipleChoiceFormEl);
  //create answer elements
  var mulChoices = answersLib[questionIndex];
  mulChoices = mulChoices.split(",");

  for (var i = 0; i < mulChoices.length; i++) {
    choiceEl = createAnswerButton(mulChoices[i], i + 1);
    multipleChoiceFormEl.appendChild(choiceEl);
  }
};

var askNextQuestionHandler = function (questionIndex, prevQVerdict) {
  var questionEl = document.querySelector("#question-text-id");
  var mulChoiceFromEl = document.querySelector("#multiple-choice-wrapper-form");

  //update the h3 element with the next question
  questionEl.textContent = questionsLib[questionIndex];

  //get the answer div and update with the new MC options
  var mulChoices = answersLib[questionIndex];
  mulChoices = mulChoices.split(",");

  for (var i = 0; i < mulChoices.length; i++) {
    console.log("update answer button " + i + " option: " + mulChoices[i]);
    updateAnswerButton(mulChoices[i], i + 1);
  }
};
/**
 * @function createAnswerButton()
 *
 * @description Given the string of the multiple choice answer. Take that
 *              answer and create and create a button and return it to the
 *              caller.
 *
 * @param {*} choice
 * @param {*} index
 * @returns
 */
var createAnswerButton = function (choice, index) {
  // create mulitple choice button and return the element
  var choiceEl = document.createElement("button");
  choiceEl.className = "multiple-choice-option-group";
  choiceEl.id = "choice-" + index;
  choiceEl.setAttribute("data-option-answer", choice);
  choiceEl.textContent = index + ". " + choice;
  return choiceEl;
};

var updateAnswerButton = function (choice, index) {
  var choiceEl = document.querySelector("#choice-" + index);

  // console.log(choiceEl);

  choiceEl.setAttribute("data-option-answer", choice);
  choiceEl.textContent = index + ". " + choice;
};
/**
 *
 * @param {*} event
 */
var startQuizHandler = function (event) {
  event.preventDefault();

  //get rid of the welcome screen
  var pageTitleEl = document.querySelector(".page-title");
  var introContentEl = document.querySelector("#intro-content");
  var startButtonEl = document.querySelector("#start-quiz-btn");
  var introSectionEl = document.querySelector("#intro-section-id");
  // pageTitleEl.textContent = "";
  // introContentEl.textContent = "";

  pageTitleEl.remove();
  introContentEl.remove();
  introSectionEl.remove();
  //remove the start button
  startButtonEl.parentElement.removeChild(startButtonEl);
  startQuizFormEl.remove();

  //start pull up the quiz questions
  askCodingQuestionWrapper(questionId);
};

var recordUsernameScore = function () {
  var questionDivEl = document.querySelector("#question-content");
  var mcDivEl = document.querySelector("#multiple-choice-wrapper-form");

  // remove the current content to create the form to record user name and score
  questionDivEl.remove();
  mcDivEl.remove();

  // create header for High Score element
  var highScoreHeaderEl = document.createElement("h2");
  highScoreHeaderEl.id = "high-scores-header";
  highScoreHeaderEl.textContent = "All Done!";

  quizFormEl.appendChild(highScoreHeaderEl);

  // show user score
  var scoreEl = document.createElement("p");
  scoreEl.textContent = "Your final score is: " + userScore;

  quizFormEl.appendChild(scoreEl);

  // create input for user's initials
  var userInfoFormEl = document.createElement("form");
  userInfoFormEl.className = "user-info";
  userInfoFormEl.innerHTML = "<label for='user-name'>Enter Initials:</label>";

  quizFormEl.appendChild(userInfoFormEl);
  var userInitalEl = document.createElement("INPUT");

  userInitalEl.name = "user-name";
  userInitalEl.id = "user-name";
  userInitalEl.setAttribute("type", "text");
  userInitalEl.setAttribute("placeholder", "Your Initials");

  userInfoFormEl.appendChild(userInitalEl);

  // create submit button
  var submitEl = document.createElement("button");
  submitEl.id = "submit-id";
  submitEl.type = "submit";
  submitEl.className = "btn submit-btn";
  submitEl.textContent = "Submit";
  userInfoFormEl.appendChild(submitEl);
  console.log(submitEl);
};

// wait for the answer button click
var quizAnswerVerifyButtonHandler = function (event) {
  var eventTarget = event.target;
  var qId = questionId; // global var
  var isCorrect;
  if (eventTarget.matches(".multiple-choice-option-group")) {
    console.log("selected answer from mcq " + qId);
    var userAnswer = eventTarget.getAttribute("data-option-answer");
    console.log("correct answer is: " + correctAnswersLib[qId]);
    console.log("user answer is " + userAnswer);
    if (userAnswer === correctAnswersLib[qId]) {
      console.log("correct");
      isCorrect = "Correct!";
    } else {
      isCorrect = "Wrong!";
      console.log("wrong");
    }

    questionId = qId + 1;
    // get the next question and update the page
    // check if we have reached the end of the quiz and if so ask user to enter initials
    if (questionId < questionsLib.length) {
      askCodingQuestionWrapper(questionId, isCorrect);
    } else {
      recordUsernameScore();
    }
  }
};

var loadUserData = function () {
  highScores = localStorage.getItem("highScores");

  if (!highScores) {
    return false;
  }
  return highScores;
};
var saveUserData = function (event) {
  event.preventDefault();
  console.log("saving user data");
  var username = document.querySelector("input[name='user-name']").value;
  var userObj = {
    name: username,
    score: userScore,
  };

  highScores.push(userObj);
  localStorage.setItem("highScores", JSON.stringify(highScores));
};
/**
 * Main Program
 ******************************************************************************/
// 1. click event handler for the start quiz button
startQuizFormEl.addEventListener("click", startQuizHandler);
// 2. click event handler for the answer quiz button
quizFormEl.addEventListener("click", quizAnswerVerifyButtonHandler);
// 3. submit user name and score
quizFormEl.addEventListener("submit", saveUserData);
