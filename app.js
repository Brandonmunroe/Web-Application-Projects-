let currentQuestionIndex = 0;
let score = 0;
let questions = [];
var quizData;

document.addEventListener('DOMContentLoaded',runAfterDOM);

function runAfterDOM(){
    fetchQuizzes();
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

 function startQuiz() {
  const studentName = document.getElementById('name').value.trim();
  if (!studentName) {
    alert('Please enter your name');
    return;
  }

  const quizId = document.getElementById('quiz_selection').value


  // Filters the quiz data by selected quiz 
  questions = quizData.filter(function(item) {
    return item.id == quizId;
  })[0].questions;

  // Proceed with starting the quiz based on the selected quizId
  document.getElementById('quiz_view').style.display = 'block';
  //shows the score always
  document.getElementById('scoreboard').innerHTML = score;

  // Render the first question of the selected quiz
  renderQuestion(currentQuestionIndex);
  
}

//renders question 
function renderQuestion(index){
  var question=questions[index];
  var questionTemplate;

  switch(question.type){
    case "multiple-choice":
      questionTemplate = document.getElementById('question_multiple_choice_template').innerHTML;
      break;

      case "narrative":
      questionTemplate = document.getElementById('question_narrative_answer_template').innerHTML;
      break;

      case "image-selection":
        questionTemplate = document.getElementById('question_image_answer_template').innerHTML;
        break;

        default: break;
  }
  
  const template = Handlebars.compile(questionTemplate);
  const html = template(questions[index]);
  document.getElementById('question_container').innerHTML=html;
}

//renders feedback 
function renderFeedBack(answer){
    const feedBackTemplate = document.getElementById('feedback_template').innerHTML;
    const template = Handlebars.compile(feedBackTemplate);
    const html = template({answer});
    document.getElementById('feedback_container').innerHTML=html;
    document.getElementById('feedback_container').style.display='block';
}

//checks if answer is correct
function isAnswerCorrect(question, selection, correctAnswer){
  renderFeedBack(correctAnswer); 

console.log('q', currentQuestionIndex)
    console.log('qq', questions.length - 1) 

if(selection === correctAnswer){
    score++;
}

//if end of quiz
if(currentQuestionIndex === (questions.length - 1)){
  document.getElementById('next_question_btn').style.display = 'none';
}

//shows updated score
document.getElementById('scoreboard').innerHTML = score;
}

//moves the quiz to the next question
function nextQuestion(){
  document.getElementById('feedback_container').style.display='none';
  currentQuestionIndex++;
  renderQuestion(currentQuestionIndex);
}


    
