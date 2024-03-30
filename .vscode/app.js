let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let startTime;
let elapsedInterval;
var quizData;

document.addEventListener('DOMContentLoaded',runAfterDOM);

function runAfterDOM(){
    fetchQuizzes();
    document.getElementById('start_quiz').addEventListener('click', startQuiz);
    document.getElementById('loading-indicator').style.display = 'none';
}

async function fetchQuizzes() {
  try {
    console.log('Fetching quizzes...');
    document.getElementById('loading-indicator').style.display = 'block';
    
    const response = await fetch('https://my-json-server.typicode.com/Brandonmunroe/Web-Application-Projects-/quizzes');
    const quizzes = await response.json();
    quizData = quizzes;
    console.log('Quizzes:', quizzes);

    const selectElement = document.getElementById('quiz_selection');
    quizzes.forEach(quiz => {
      const option = document.createElement('option');
      option.value = quiz.id;
      option.text = quiz.name; // Assuming quiz object has a 'name' property
      selectElement.appendChild(option);
    });

    document.getElementById('loading-indicator').style.display = 'none';
  } catch (error) {
    console.error('Failed to fetch quizzes', error);
    document.getElementById('quiz_error').textContent = 'Failed to load quizzes. Please try again later';
    document.getElementById('loading-indicator').style.display = 'none';
  }
}

async function startQuiz() {
  const studentName = document.getElementById('name').value.trim();
  if (!studentName) {
    alert('Please enter your name');
    return;
  }
  const quizId = document.getElementById('quiz_selection').value;
  let questions = quizData.filter(function(item) {
    return item.id == quizId;
  })[0].questions;
  console.log('questions', questions)
  // Proceed with starting the quiz based on the selected quizId

  document.getElementById('quiz_view').style.display = 'block';
  const questionTemplate = document.getElementById('question_template').innerHTML;
  const template = Handlebars.compile(questionTemplate);
  const html = template({questions});
  document.getElementById('question_container').innerHTML=html;
}



    
