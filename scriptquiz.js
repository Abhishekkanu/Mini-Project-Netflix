const questionElement = document.getElementById("question");
const options = document.querySelectorAll(".option");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-question");
const watchNowButton = document.getElementById("watch-now");
const movieImageContainer = document.getElementById("movie-image-container");
const movieImage = document.getElementById("movie-image");
const answerMessage = document.getElementById("answer-message");

const triviaData = [
  {
    question: "What movie is this dialogue from: 'All is well.'",
    options: {
      a: "3 Idiots",
      b: "PK",
      c: "Taare Zameen Par",
      d: "Dangal",
    },
    correctAnswer: "a",
    image: "tools/images/idiots.jpg",
    video: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
  },
  // Add other questions here
  {
    question: "What movie is this dialogue from: 'I'll be back.'",
    options: {
      a: "The Terminator",
      b: "Predator",
      c: "Die Hard",
      d: "Rambo",
    },
    correctAnswer: "a",
    image: "tools/images/terminator 2-1080x1920.jpg",
    video: "https://www.youtube.com/watch?v=nGrW-OR2uDk" 
  },
  {
    question: "What movie is this dialogue from: 'Mogambo khush hua.'",
    options: {
      a: "Sholay",
      b: "Mr. India",
      c: "Dilwale Dulhania Le Jayenge",
      d: "Lagaan",
    },
    correctAnswer: "b",
    image: "tools/images/mr.jpg",
    video:"https://www.youtube.com/watch?v=-WZfpNYVvKk"
  },
  
  {
    question: "What movie is this dialogue from: 'May the Force be with you.'",
    options: {
      a: "Star Wars",
      b: "E.T.",
      c: "Avatar",
      d: "Guardians of the Galaxy",
    },
    correctAnswer: "a",
    image: "tools/images/star.jpg",
    video: "https://www.youtube.com/watch?v=77cH35TTz60"
  },

  {
    question: "What movie is this dialogue from: 'Kitne aadmi the?'",
    options: {
      a: "Sholay",
      b: "Deewar",
      c: "Zanjeer",
      d: "Don",
    },
    correctAnswer: "a",
    image: "tools/images/sholay.jpg",
    video:"https://www.youtube.com/watch?v=P2yL3K_LG_A"
  },

  {
    question: "What movie is this dialogue from: 'Why so serious?'",
    options: {
      a: "The Dark Knight",
      b: "Joker",
      c: "Inception",
      d: "Batman Begins",
    },
    correctAnswer: "a",
    image: "tools/images/dark.jpg",
    video:"https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    question: "What movie is this dialogue from: 'Rahul, naam toh suna hoga.'",
    options: {
      a: "Dilwale Dulhania Le Jayenge",
      b: "Kabhi Khushi Kabhie Gham",
      c: "Kuch Kuch Hota Hai",
      d: "Kal Ho Naa Ho",
    },
    correctAnswer: "c",
    image: "tools/images/kuch.jpg",
    video:"https://www.youtube.com/watch?v=N_N-mohMDG4"
  },

  {
    question: "What movie is this dialogue from: 'Life is like a box of chocolates.'",
    options: {
      a: "The Green Mile",
      b: "Rain Man",
      c: "Forrest Gump",
      d: "Big Fish",
    },
    correctAnswer: "c",
    image: "tools/images/forrest.jpg",
    video:"https://www.youtube.com/watch?v=bLvqoHBptjg"
  },
  {
    question: "What movie is this dialogue from: 'Aaj mere paas gaadi hai, bangla hai, paisa hai.'",
    options: {
      a: "Deewar",
      b: "Agneepath",
      c: "Shakti",
      d: "Kabhi Kabhi",
    },
    correctAnswer: "a",
    image: "tools/images/deewar.jpg",
    video:"https://www.youtube.com/watch?v=HqXWxwOZk60"
  },
 
  {
    question: "What movie is this dialogue from: 'Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain.'",
    options: {
      a: "Dilwale Dulhania Le Jayenge",
      b: "Kuch Kuch Hota Hai",
      c: "Mohabbatein",
      d: "Rab Ne Bana Di Jodi",
    },
    correctAnswer: "a",
    image: "tools/images/dilwale.jpg",
    video:"https://www.youtube.com/watch?v=cmax1C1p660"
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  if (currentQuestionIndex >= triviaData.length) {
    endQuiz();
    return;
  }

  const currentQuestion = triviaData[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  movieImage.src = currentQuestion.image;
  movieImage.style.display = "none";

  options.forEach((button, index) => {
    const optionKey = ["a", "b", "c", "d"][index];
    button.textContent = currentQuestion.options[optionKey];
    button.disabled = false;
    button.style.backgroundColor = "#ff6f61";
  });

  movieImageContainer.style.display = "none";
  watchNowButton.style.display = "none";
  answerMessage.textContent = ""; // Clear previous message
}

function checkAnswer(selectedOption) {
  const currentQuestion = triviaData[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    answerMessage.textContent = "Correct! 🎉";
    answerMessage.style.color = "green";
  } else {
    answerMessage.textContent = "Incorrect! ❌";
    answerMessage.style.color = "red";
  }

  movieImageContainer.style.display = "block";
  movieImage.style.display = "block";
  watchNowButton.style.display = "inline-block";

  options.forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === currentQuestion.correctAnswer) {
      button.style.backgroundColor = "#4CAF50";
    } else {
      button.style.backgroundColor = "#FF0000";
    }
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

function endQuiz() {
  // Clear the trivia content and show the final message
  questionElement.textContent = "Quiz Complete! 🎉";
  options.forEach((button) => (button.style.display = "none"));
  movieImageContainer.style.display = "none";
  watchNowButton.style.display = "none";
  answerMessage.textContent = `Your final score is ${score} out of ${triviaData.length}!`;
  answerMessage.style.color = "blue";

  // Replace "Next Question" button with a "Restart" button
  nextButton.textContent = "Restart Quiz";
  nextButton.style.display = "inline-block";

  // Restart the quiz when the "Restart Quiz" button is clicked
  nextButton.addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  options.forEach((button) => (button.style.display = "inline-block"));
  nextButton.textContent = "Next Question";
  loadQuestion();
}

options.forEach((option) => {
  option.addEventListener("click", () => {
    checkAnswer(option.dataset.answer);
  });
});

nextButton.addEventListener("click", nextQuestion);

watchNowButton.addEventListener("click", () => {
  const currentQuestion = triviaData[currentQuestionIndex];
  if (currentQuestion.video) {
    window.open(currentQuestion.video, "_blank");
  }
});

loadQuestion();
