const questions = [
    {
      question: "What does CPU stands for? (Easy: 3 pts)",
      answers: [
        { text: "Central Processing Unit", correct: true },
        { text: "Central Power Unit", correct: false },
        { text: "Computer Processing Unit", correct: false },
        { text: "Computer Power Unit", correct: false },
      ]
    },
    {
      question: "What does RAM stands for? (Easy: 3 pts)",
      answers: [
        { text: "Random Accessories Memory", correct: false },
        { text: "Reading Accessing Memory", correct: false },
        { text: "Random Access Memory", correct: true },
        { text: "Reading Ascendant Memory", correct: false },
      ]
    },
    {
      question: "What Does does HTML stands for? (Easy: 3 pts)",
      answers: [
        { text: "Hypertext Markup Language", correct: true },
        { text: "Hyperbolic Markup Language", correct: false },
        { text: "Hypermart Markup Language", correct: false },
        { text: "HyperX Markup Language", correct: false },
      ]
    },
    {
      question: "Which number system is used internally by computers? (Easy: 3 pts)",
      answers: [
        { text: "Decimal", correct: false },
        { text: "Binary", correct: true },
        { text: "Hexadecimal", correct: false },
        { text: "Octal", correct: false },
      ]
    },
    {
      question: "Give an example of output device (Easy: 3 pts)",
      answers: [
        { text: "CPU", correct: false },
        { text: "Keyboard", correct: false },
        { text: "Mouse", correct: false },
        { text: "Monitor", correct: true },
      ]
    },
    {
      question: "Which logic gate produces a HIGH output only when all inputs are LOW? (Medium: 5 pts)",
      answers: [
        { text: "NAND", correct: false },
        { text: "NOR", correct: true },
        { text: "XOR", correct: false },
        { text: "AND", correct: false },
      ]
    },
    {
      question: "What kind of memory is non-volatile and can be electrically erased and reprogrammed? (Medium: 5 pts)",
      answers: [
        { text: "STRAM", correct: false },
        { text: "DRAM", correct: false },
        { text: "ROM", correct: false },
        { text: "Flash Memory", correct: true },
      ]
    },
    {
      question: "What is the output of a NAND gate if both inputs are 1? (Medium: 5 pts)",
      answers: [
        { text: "1", correct: false },
        { text: "0", correct: true },
        { text: "Undefined", correct: false },
        { text: "Depends on voltage", correct: false },
      ]
    },
    {
      question: "What is the critical path in a digital circuit? (Hard: 10 pts)",
      answers: [
        { text: "The shortest path between inputs and outputs", correct: false },
        { text: "The longest delay path determining clock speed", correct: true },
        { text: "The power path in logic circuits", correct: false },
        { text: "The path used for reset signals", correct: false },
      ]
    },
    {
      question: ". In embedded systems, what is the purpose of a watchdog timer? (Hard: 10 pts)",
      answers: [
        { text: "To manage real-time interrupts", correct: false },
        { text: "To monitor temperature in real-time", correct: false },
        { text: "To reboot the system in case of software malfunction", correct: true },
        { text: "To reduce power consumption", correct: false },
      ]
    },

  ];
 
  const questionElement = document.getElementById("question");
  const answersContainer = document.getElementById("answers");
  const nextButton = document.getElementById("next-btn");
  const scoreDisplay = document.getElementById("score");
  
  let currentQuestionIndex = 0;
  let score = 0;
  const prizeLevels = [3, 3, 3, 3, 3, 5, 5, 5, 10, 10];
  
  function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      setNextQuestion();
    });
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      questionElement.textContent = "Congratulations!";
      nextButton.style.display = "none";
      showCongratulations();
    }
  }
  
  function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answersContainer.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
  }
  
  function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";


  Array.from(answersContainer.children).forEach((btn) => {
    setStatusClass(btn, btn.dataset.correct === "true");
    btn.disabled = true;
  });

  if (correct) {
    score += prizeLevels[currentQuestionIndex];
    scoreDisplay.textContent = `Score: ${score}${"/50"}`;
  }

  nextButton.style.display = "block";
}

 
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }
 
  startGame();


function showCongratulations() {
  document.getElementById('congrats-container').classList.remove('hidden');
  startConfetti();
}

function restartQuiz() {
  location.reload(); 
}


const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let particles = [];

function randomColor() {
  const colors = ["#ff4b5c", "#ffd93d", "#6a2c70", "#00b8a9", "#f6416c"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createParticles() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - 200,
      speedX: Math.random() * 4 - 2,
      speedY: Math.random() * 5 + 2,
      radius: Math.random() * 6 + 2,
      color: randomColor()
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.y > window.innerHeight) {
      p.y = -10;
      p.x = Math.random() * window.innerWidth;
    }
  }
}

function startConfetti() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
  setInterval(drawParticles, 33); 
}





function showCongratulations() {
  document.getElementById('congrats-container').classList.remove('hidden');
  startConfetti();
}








  