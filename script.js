const container = document.querySelector(".container");
const questionContainer = document.querySelector(".questions-container");
const cardContainer = document.querySelector(".card-container");
const cardListContainer = document.querySelector("#card-list-container");
const errorContainer = document.querySelector(".error-container");
const error = document.querySelector("#error");
// buttons
const addFlashcards = document.querySelector("#add-flashcard-btn");
const closeBtn = document.querySelector("#close-btn");
const saveBtn = document.querySelector("#save-btn");

// inputs
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

let editBool = false;

// Helper Functions
function hideQuestion() {
  container.classList.remove("hide");
  questionContainer.classList.add("hide");
  if (editBool) {
    editBool = false;
    submitQuestion();
  }
}

function disableButtons(value) {
  let editButtons = document.querySelectorAll(".edit");
  // turn NodeList into an array
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
}

function modifyElement(element, edit = false) {
  // use edit button to find its parent card div - button container -> card div
  let parentDiv = element.parentElement.parentElement;

  // if edit is true show the cards question and answer value in the input on the form
  if (edit) {
    // get the text of the answer paragraph
    let parentAnswer = parentDiv.querySelector(".answer-div").innerText;
    // get the text of the question on the card
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;
    answer.value = parentAnswer;
    question.value = parentQuestion;
    // disable all the edit buttons in the card list
    disableButtons(true);
  }
  // remove the card from the card list
  parentDiv.remove();
}

function deleteCard(element) {
  let parentDiv = element.parentElement.parentElement;
  console.log(parentDiv);
  parentDiv.remove();
}

function displayCard() {
  // create a div
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML += `<p class="question-div">${question.value}</p>`;
  let displayAnswer = document.createElement("p");
  displayAnswer.classList.add("answer-div");
  displayAnswer.classList.add("hide");
  displayAnswer.innerText = answer.value;

  // button link to hide and show answer
  let link = document.createElement("a");
  link.setAttribute("href", "#");
  link.classList.add("show-hide-btn");
  link.innerHTML = "Show/Hide";
  // add event listener to link button
  link.addEventListener("click", () => {
    // hide the display Answer div
    displayAnswer.classList.toggle("hide");
  });

  // create button container for edit and delete buttons
  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  // create edit button
  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "edit");
  // add font awesome edit icon
  editBtn.innerHTML += `<i class="fa-solid fa-pen-to-square"></i>`;
  editBtn.addEventListener("click", () => {
    editBool = true;
    modifyElement(editBtn, true);
    // show the question form again
    questionContainer.classList.remove("hide");
  });
  disableButtons(false);
  // create delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete");
  deleteBtn.innerHTML += `<i class="fa-solid fa-trash-can"></i>`;
  deleteBtn.addEventListener("click", () => {
    // function that will delete current card
    deleteCard(deleteBtn);
  });

  // append the edit and delete button to the button container
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);
  // append the children to the card div
  div.appendChild(link);
  div.appendChild(displayAnswer);
  div.appendChild(buttonContainer);
  // append the card to the card list container
  cardListContainer.insertAdjacentElement("beforeend", div);
}

// ================ EVENT LISTENERS ==============
// Add flashcard button - display question container
addFlashcards.addEventListener("click", () => {
  container.classList.add("hide");
  // clear the inputs
  question.value = "";
  answer.value = "";
  // display the question form
  questionContainer.classList.remove("hide");
});

closeBtn.addEventListener("click", hideQuestion);

// Save button - save new flashcard
saveBtn.addEventListener("click", () => {
  editBool = false;
  // get the question value
  let tempQuestion = question.value.trim();
  // get the answer value
  let tempAnswer = answer.value.trim();

  if (!tempQuestion || !tempAnswer) {
    errorContainer.classList.remove("hide");
    error.innerText = "Input fields cannot be empty";
  } else {
    errorContainer.classList.add("hide");
    // show container
    container.classList.remove("hide");
    // hide the question container
    questionContainer.classList.add("hide");
    // display the card - create the card
    displayCard();
    // after displaying the card then reset the question and answer values
    question.value = "";
    answer.value = "";
  }
});
