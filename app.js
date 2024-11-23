import { fetchQuestions } from './api.js';


let questions = [];
let currentQuestionIndex = 0;
let score = 0;


async function initQuiz() {
  try {
    
    questions = await fetchQuestions(10, 'easy');
    if (!questions.length) throw new Error('No questions available');
    renderQuestion();
  } catch (error) {
    console.error('Error initializing quiz:', error);
    document.getElementById('quiz-container').innerHTML = `
      <p>Failed to load questions. Please try again later.</p>`;
  }
}


function renderQuestion() {
  const question = questions[currentQuestionIndex];
  if (!question) return endQuiz();

  
  const { question: text, incorrect_answers, correct_answer } = question;

  
  document.getElementById('question-area').innerHTML = `<h2>${text}</h2>`;
  const answers = shuffleArray([...incorrect_answers, correct_answer]);
  document.getElementById('answer-options').innerHTML = answers
    .map((ans, i) => `<button class="answer-btn" data-answer="${ans}">${ans}</button>`)
    .join('');


  document.querySelectorAll('.answer-btn').forEach(btn =>
    btn.addEventListener('click', handleAnswer)
  );


  updateProgressBar();
}


function handleAnswer(event) {
  const selected = event.target.getAttribute('data-answer');
  const correct = questions[currentQuestionIndex].correct_answer;


  if (selected === correct) score += 1;

  currentQuestionIndex += 1;
  renderQuestion();
}


function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;
}


function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


function endQuiz() {
  document.getElementById('quiz-container').innerHTML = `
    <h1>Quiz Over</h1>
    <p>Your score: ${score}/${questions.length}</p>`;
  localStorage.setItem('quizScore', score);
}


initQuiz();
