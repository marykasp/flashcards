const container = document.querySelector(".container");
const questionContainer = document.querySelector(".questions-container");
const cardContainer = document.querySelector("card-container");
// buttons
const addFlashcards = document.querySelector("#add-flashcard-btn");
const closeBtn = document.querySelector("#close-btn");
const saveBtn = document.querySelector("#save-btn");

// inputs
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

// Add flashcard button - display question container
addFlashcards.addEventListener("click", () => {
  container.classList.add("hide");
  // clear the inputs
  question.value = "";
  answer.value = "";
  // display the question form
  questionContainer.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  questionContainer.classList.add("hide");
});
