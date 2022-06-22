/**
 * Global Variables
 ******************************************************************************/
var quizFormEl = document.querySelector("#quiz-form");
var startQuizFormEl = document.querySelector("#start-quiz-form");
var questionId = 0;

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
var askCodingQuestionWrapper = function (questionIndex) {
  // check if this question form is already there otherwise create it
  var questionAsked = document.querySelector("#question-content");
  // console.log("question asked: " + questionAsked);
  if (questionAsked) {
    askNextQuestionHandler(questionIndex);
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
  mulChoices = answersLib[questionIndex];
  mulChoices = mulChoices.split(",");

  for (var i = 0; i < mulChoices.length; i++) {
    choiceEl = createAnswerButton(mulChoices[i], i + 1);
    multipleChoiceFormEl.appendChild(choiceEl);
  }
};

var askNextQuestionHandler = function (questionIndex) {
  questionEl = document.querySelector("#question-text-id");

  console.log(questionEl);
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
  choiceEl.setAttribute("data-option-answer", choice);
  //choiceEl.id = "choice-" + choice;
  choiceEl.textContent = index + ". " + choice;
  return choiceEl;
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
  pageTitleEl.textContent = "";
  introContentEl.textContent = "";

  //remove the start button
  startButtonEl.parentElement.removeChild(startButtonEl);

  //start pull up the quiz questions
  askCodingQuestionWrapper(questionId);
};

// wait for the answer button click
var quizAnswerVerifyButtonHandler = function (event) {
  var eventTarget = event.target;
  var qId = questionId; // global var
  if (eventTarget.matches(".multiple-choice-option-group")) {
    console.log("selected answer from mcq");
    var userAnswer = eventTarget.getAttribute("data-option-answer");
    // console.log(correctAnswersLib[questionId]);
    // console.log(userAnswer);
    if (userAnswer === correctAnswersLib[questionId]) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
    questionId = qId + 1;
    askCodingQuestionWrapper(questionId++);
  }
};
/**
 * Main Program
 ******************************************************************************/
// 1. click event handler for the start quiz button
startQuizFormEl.addEventListener("click", startQuizHandler);
// 2. click event handler for the answer quiz button
quizFormEl.addEventListener("click", quizAnswerVerifyButtonHandler);
