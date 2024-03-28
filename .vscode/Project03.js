// script.js

document.addEventListener('DOMContentLoaded', async function () {
    const appContainer = document.getElementById('app');
    const source = document.getElementById('quiz-template').innerHTML;
    const template = Handlebars.compile(source);
  
    // Fetch quiz data from the static API
    const quizData = await fetch('https://my-json-server.typicode.com/yourusername/yourrepo/questions')
                          .then(response => response.json())
                          .catch(err => console.error('Error fetching quiz data:', err));
  
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
  
    function renderQuestion() {
      const question = quizData[currentQuestionIndex];
      const context = {
        question: question.question,
        options: question.options // Assuming options is an array of choices
      };
      const html = template(context);
      appContainer.innerHTML = html;
  
      // Attach event listener for submitting answers
      document.getElementById('quizForm').addEventListener('submit', handleAnswer);
    }
  
    function handleAnswer(event) {
      event.preventDefault();
      const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
      const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
  
      if (selectedAnswer === correctAnswer) {
        // Show correct answer message
        document.getElementById('feedback').innerText = 'Brilliant!';
        setTimeout(() => {
          document.getElementById('feedback').innerText = '';
          nextQuestion();
        }, 1000);
        correctAnswers++;
      } else {
        // Show correct answer explanation
        const explanation = quizData[currentQuestionIndex].explanation;
        document.getElementById('feedback').innerText = `Incorrect. The correct answer is: ${explanation}`;
        document.getElementById('nextBtn').addEventListener('click', nextQuestion);
      }
    }
  
    function nextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        renderQuestion();
      } else {
        showResults();
      }
    }
  
    function showResults() {
      const score = (correctAnswers / quizData.length) * 100;
      let message;
      if (score >= 80) {
        message = `Congratulations ${localStorage.getItem('username')}! You pass the quiz with ${score}%`;
      } else {
        message = `Sorry ${localStorage.getItem('username')}, you fail the quiz with ${score}%`;
      }
      const context = { message };
      const html = template(context);
      appContainer.innerHTML = html;
    }
  
    // Start quiz when the page loads
    renderQuestion();
  });
  