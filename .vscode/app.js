 // Define API endpoint for quiz questions
const API_URL = 'C:\Users\brand\Documents\GitHub\Web-Development-Projects-2.0\.vscode\quiz_math.json';

// Handle form submission
$('#start_form').submit(async function(e) {
  e.preventDefault();
  const name = $('#name').val();
  const selectedQuiz = $('#quiz').val();
  const quizData = await fetchQuizData(selectedQuiz);
  startQuiz(name, quizData);
});

// Fetch quiz data from API
async function fetchQuizData(quizName) {
  try {
    const response = await fetch(`${API_URL}/${quizName}`);
    
    if (!response.ok) {
      throw new Error('Error fetching quiz data');
    }
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return [];
  }
}

// Start quiz
function startQuiz(name, questions) {
  let currentQuestionIndex = 0;
  let score = 0;

  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const template = Handlebars.compile($('#question_template').html());
    const html = template(question);
    $('#question_container').html(html);
  }

  function displayFeedback(correctAnswer) {
    const template = Handlebars.compile($('#feedback_template').html());
    const html = template({ correct_answer: correctAnswer });
    $('#feedback_container').html(html).show();
    $('#next_question_btn').on('click', nextQuestion);
  }

  function nextQuestion() {
    $('#feedback_container').hide();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      showQuizResult();
    }
  }

  function showQuizResult() {
    const scorePercentage = (score / questions.length) * 100;
    const resultMessage = scorePercentage >= 80 ? `Congratulations ${name}! You passed the quiz.` : `Sorry ${name}, you failed the quiz.`;
    $('#quiz_view').html(`<h2>${resultMessage}</h2>
                          <button id="restart_quiz_btn">Restart Quiz</button>`);
    $('#restart_quiz_btn').on('click', () => location.reload());
  }

  // Event delegation for handling option clicks
  $('#question_container').on('click', '.option', function() {
    const selectedAnswer = $(this).data('answer');
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      score++;
      displayFeedback('Correct!');
      setTimeout(nextQuestion, 1000);
    } else {
      displayFeedback(correctAnswer);
    }
  });

  // Start the quiz by displaying the first question
  displayQuestion();
  $('#start_page').hide();
  $('#quiz_view').show();
}

// Initialize app or perform other setup tasks as needed
$(document).ready(function() {
  // Additional setup or initialization code can go here
});
