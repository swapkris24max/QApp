let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

async function loadQuestions() {
  const res = await fetch("questions.json");
  window.questions = await res.json();
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  const questionObj = questions[currentQuestionIndex];
  document.getElementById("question").textContent = questionObj.question;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  questionObj.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "block w-full text-left bg-gray-200 hover:bg-gray-300 py-2 px-3 rounded";
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  const questionObj = questions[currentQuestionIndex];
  if (selected === questionObj.answer) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById("quiz-container").innerHTML = `
    <h2 class="text-xl font-bold">Quiz Finished!</h2>
    <p class="mt-2">Your Score: ${score} / ${questions.length}</p>
    <button onclick="restartQuiz()" class="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Restart</button>
  `;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestions();
}

loadQuestions();
