// Import course data from data.js
import { courses } from './data.js';

// ── Task 1: ES6+ Syntax Practice ──

// Use map() to format course strings
const formattedCourses = courses.map(
  ({ code, name, credits }) => `${code} — ${name} (${credits} credits)`
);
console.log("Formatted Courses:", formattedCourses);

// Use filter() to get courses with credits >= 4
const highCreditCourses = courses.filter(({ credits }) => credits >= 4);
console.log("High Credit Courses count:", highCreditCourses.length);

// Use reduce() to calculate total credits
const totalCredits = courses.reduce((sum, { credits }) => sum + credits, 0);
console.log("Total Credits:", totalCredits);

// ── Task 2: DOM Rendering ──

// Select elements
const courseGrid = document.querySelector('.course-grid');
const totalCreditsEl = document.getElementById('total-credits');
const selectedCourseEl = document.getElementById('selected-course');

// Function to render course cards
function renderCourses(courseList) {
  // Clear existing cards
  courseGrid.innerHTML = '';

  // Create and append each card
  courseList.forEach(course => {
    const article = document.createElement('article');
    article.className = 'course-card';
    article.setAttribute('tabindex', '0');
    article.setAttribute('data-id', course.id);
    article.innerHTML = `
      <h3>${course.name}</h3>
      <p>${course.code}</p>
      <span>Credits: ${course.credits}</span>
      <p class="grade">Grade: ${course.grade}</p>
    `;
    courseGrid.appendChild(article);
  });

  // Update total credits
  const currentTotal = courseList.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `Total Credits: ${currentTotal}`;
}

// Initial render
renderCourses(courses);

// ── Task 3: Event Listeners ──

// Search filter
const searchInput = document.getElementById('search-courses');
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(term)
  );
  renderCourses(filtered);
});

// Sort by Credits button
const sortBtn = document.getElementById('sort-btn');
sortBtn.addEventListener('click', () => {
  const sorted = [...courses].sort((a, b) => b.credits - a.credits);
  renderCourses(sorted);
});

// Event delegation - click on course card
courseGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.course-card');
  if (card) {
    const id = parseInt(card.getAttribute('data-id'));
    const course = courses.find(c => c.id === id);
    selectedCourseEl.style.display = 'block';
    selectedCourseEl.textContent =
      `Selected: ${course.name} | Grade: ${course.grade}`;
  }
});