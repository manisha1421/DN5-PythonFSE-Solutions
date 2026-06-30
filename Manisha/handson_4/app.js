// Import course data
import { courses } from './data.js';

// ── Existing course rendering from Hands-On 3 ──
const courseGrid = document.querySelector('.course-grid');
const totalCreditsEl = document.getElementById('total-credits');
const selectedCourseEl = document.getElementById('selected-course');

function renderCourses(courseList) {
  courseGrid.innerHTML = '';
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
  const currentTotal = courseList.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `Total Credits: ${currentTotal}`;
}

renderCourses(courses);

// Search
const searchInput = document.getElementById('search-courses');
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = courses.filter(c => c.name.toLowerCase().includes(term));
  renderCourses(filtered);
});

// Sort
const sortBtn = document.getElementById('sort-btn');
sortBtn.addEventListener('click', () => {
  const sorted = [...courses].sort((a, b) => b.credits - a.credits);
  renderCourses(sorted);
});

// Card click
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

// ── Task 1: Promises & async/await ──

// Fetch single user with async/await
async function fetchUser(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const user = await response.json();
    console.log(`User ${id} name:`, user.name);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

// Simulate delayed course fetch
function fetchAllCourses() {
  return new Promise(resolve => {
    setTimeout(() => resolve(courses), 1000);
  });
}

// Show loading then render after delay
async function loadCoursesWithDelay() {
  totalCreditsEl.textContent = 'Loading courses...';
  const loaded = await fetchAllCourses();
  renderCourses(loaded);
  console.log('Courses loaded after delay!');
}

loadCoursesWithDelay();

// Promise.all - fetch two users simultaneously
async function fetchTwoUsers() {
  const [user1, user2] = await Promise.all([
    fetchUser(1),
    fetchUser(2)
  ]);
  console.log('Both users fetched:',user1.name, '&', user2.name);
}

fetchTwoUsers();

// ── Task 2: Fetch API with Error Handling ──

const notificationsList = document.getElementById('notifications-list');
const retryBtn = document.getElementById('retry-btn');

// Reusable fetch function
async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} — ${response.statusText}`);
  }
  return response.json();
}

// Show spinner while loading
function showSpinner() {
  notificationsList.innerHTML = '<div class="spinner"></div>';
  retryBtn.style.display = 'none';
}

// Render notification cards
function renderNotifications(posts) {
  notificationsList.innerHTML = '';
  posts.slice(0, 5).forEach(post => {
    const card = document.createElement('div');
    card.className = 'notification-card';
    card.innerHTML = `
      <h4>${post.title}</h4>
      <p>${post.body}</p>
    `;
    notificationsList.appendChild(card);
  });
}

// Load notifications from API
async function loadNotifications() {
  showSpinner();
  try {
    const posts = await apiFetch(
      'https://jsonplaceholder.typicode.com/posts'
    );
    renderNotifications(posts);
  } catch (error) {
    notificationsList.innerHTML =
      `<p class="error-msg">⚠️ Failed to load notifications: ${error.message}</p>`;
    retryBtn.style.display = 'block';
  }
}

// Retry button
retryBtn.addEventListener('click', loadNotifications);

// Initial load
loadNotifications();

// ── Task 3: Axios via CDN ──
// Axios is loaded via CDN in index.html
// See comment in index.html for the script tag

async function loadWithAxios() {
  try {
    // Axios auto-parses JSON, throws on non-2xx
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
      { params: { userId: 1 } }
    );
    console.log('Axios fetched posts for user 1:',
      response.data.length, 'posts');
  } catch (error) {
    console.error('Axios error:', error.message);
  }
}

// Add Axios interceptor
axios.interceptors.request.use(config => {
  console.log('API call started:', config.url);
  return config;
});

loadWithAxios();

/*
  Fetch vs Axios — 3 key differences:
  1. fetch() does NOT throw on HTTP errors (404, 500) — must check response.ok manually
     Axios throws automatically on non-2xx responses
  2. fetch() returns raw Response — must call .json() to parse
     Axios automatically parses JSON and returns response.data
  3. fetch() has no built-in timeout support
     Axios supports timeout: axios.get(url, { timeout: 5000 })
*/