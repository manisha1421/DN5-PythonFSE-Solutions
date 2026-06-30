import { courses } from './data.js';

const courseGrid = document.querySelector('.course-grid');
const totalCreditsEl = document.getElementById('total-credits');
const selectedCourseEl = document.getElementById('selected-course');
const resultsCount = document.getElementById('results-count');

// Render courses with accessibility attributes
function renderCourses(courseList) {
  courseGrid.innerHTML = '';

  courseList.forEach(course => {
    const article = document.createElement('article');
    article.className = 'course-card';
    // tabindex=0 makes cards keyboard accessible
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'listitem');
    article.setAttribute('data-id', course.id);
    article.setAttribute('aria-label',
      `${course.name}, ${course.code}, ${course.credits} credits, Grade ${course.grade}`
    );
    article.innerHTML = `
      <h3>${course.name}</h3>
      <p>${course.code}</p>
      <span>Credits: ${course.credits}</span>
      <p class="grade">Grade: ${course.grade}</p>
    `;
    courseGrid.appendChild(article);
  });

  // Update results count for screen readers
  resultsCount.textContent = `${courseList.length} course${courseList.length !== 1 ? 's' : ''} found`;

  const currentTotal = courseList.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `Total Credits: ${currentTotal}`;
}

renderCourses(courses);

// Search filter
const searchInput = document.getElementById('search-courses');
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(term)
  );
  renderCourses(filtered);
});

// Sort by Credits
const sortBtn = document.getElementById('sort-btn');
sortBtn.addEventListener('click', () => {
  const sorted = [...courses].sort((a, b) => b.credits - a.credits);
  renderCourses(sorted);
});

// Event delegation - click AND keyboard (Enter key) on cards
courseGrid.addEventListener('click', handleCardSelect);
courseGrid.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleCardSelect(e);
  }
});

function handleCardSelect(e) {
  const card = e.target.closest('.course-card');
  if (card) {
    const id = parseInt(card.getAttribute('data-id'));
    const course = courses.find(c => c.id === id);
    selectedCourseEl.style.display = 'block';
    selectedCourseEl.textContent =
      `Selected: ${course.name} | Grade: ${course.grade}`;
  }
}

// Notifications
const notificationsList = document.getElementById('notifications-list');
const retryBtn = document.getElementById('retry-btn');

async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return response.json();
}

function showSpinner() {
  notificationsList.innerHTML = '<div class="spinner" role="status" aria-label="Loading notifications"></div>';
  retryBtn.style.display = 'none';
}

function renderNotifications(posts) {
  notificationsList.innerHTML = '';
  posts.slice(0, 5).forEach(post => {
    const card = document.createElement('div');
    card.className = 'notification-card';
    card.setAttribute('role', 'article');
    card.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
    notificationsList.appendChild(card);
  });
}

async function loadNotifications() {
  showSpinner();
  try {
    const posts = await apiFetch(
      'https://jsonplaceholder.typicode.com/posts'
    );
    renderNotifications(posts);
  } catch (error) {
    notificationsList.innerHTML =
      `<p class="error-msg" role="alert">⚠️ Failed to load: ${error.message}</p>`;
    retryBtn.style.display = 'block';
  }
}

retryBtn.addEventListener('click', loadNotifications);
loadNotifications();