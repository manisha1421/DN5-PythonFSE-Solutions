import apiClient from './apiClient';

// Get all courses (mapped from posts)
export async function getAllCourses() {
  const posts = await apiClient.get('/posts?_limit=5');
  return posts;
}

// Get course by ID
export async function getCourseById(id) {
  const post = await apiClient.get(`/posts/${id}`);
  return post;
}

// Simulate enroll student
export async function enrollStudent(studentId, courseId) {
  const result = await apiClient.post('/posts', {
    userId: studentId,
    title: `Enrollment for course ${courseId}`,
    body: 'Student enrolled successfully'
  });
  return result;
}