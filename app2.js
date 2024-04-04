document.addEventListener('DOMContentLoaded', runAfterDOM);

let courseData = {
  "courses": [
    {
      "id": "101",
      "name": "Introduction to Computer Science",
      "instructor": "Dr. Alan Turing",
      "description": "An introductory course to the fundamentals of computer science, covering algorithms, data structures, and basic programming.",
      "image": "https://example.com/images/intro-to-cs.jpg",
      "learningOutcomes": [
        "Understand the foundational principles of computer science",
        "Apply basic programming concepts in a modern programming language",
        "Analyze and implement simple data structures and algorithms"
      ]
    },
    // Add more courses here...
  ]
};

let selectedCourse = null;

function runAfterDOM() {
  renderCourses(courseData.courses);
}

function renderCourses(courses) {
  const coursesContainer = document.getElementById('courses-container');
  coursesContainer.innerHTML = '';
  courses.forEach(course => {
    const courseHtml = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${course.image}" class="card-img-top" alt="${course.name}">
          <div class="card-body">
            <h5 class="card-title">${course.name}</h5>
            <p class="card-text">${course.description}</p>
            <button class="btn btn-primary choose-btn" data-id="${course.id}">Choose Course</button>
          </div>
        </div>
      </div>
    `;
    coursesContainer.innerHTML += courseHtml;
  });
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('choose-btn')) {
    const courseId = e.target.getAttribute('data-id');
    selectedCourse = courseData.courses.find(course => course.id === courseId);
    renderForm();
  }
});

function renderForm() {
  const formContainer = document.getElementById('form-container');
  formContainer.innerHTML = `
    <form id="course-form">
      <div class="mb-3">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" name="name" required>
      </div>
      <div class="mb-3">
        <label for="address">Address</label>
        <input type="text" class="form-control" id="address" name="address" required>
      </div>
      <div class="mb-3">
        <label for="telephone">Telephone</label>
        <input type="tel" class="form-control" id="telephone" name="telephone" required>
      </div>
      <div class="mb-3">
        <label for="reason">Reason for choosing course</label>
        <textarea class="form-control" id="reason" name="reason" rows="3" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `;

  const formElement = document.getElementById('course-form');
  formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(formElement);
    const studentData = {};
    formData.forEach((value, key) => {
      studentData[key] = value;
    });
    studentData.course = selectedCourse.name;
    console.log('Submitted Data:', studentData);
    // You can perform further actions here, such as sending data to a server or displaying a confirmation message.
  });
}