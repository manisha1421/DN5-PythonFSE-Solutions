<template>
  <header class="header">
    <RouterLink to="/" class="site-name">Student Portal</RouterLink>
    <nav>
      <ul class="nav-list">
        <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
        <li><RouterLink to="/courses" class="nav-link">Courses</RouterLink></li>
        <li><RouterLink to="/profile" class="nav-link">Profile</RouterLink></li>
        <li class="badge">Enrolled: {{ store.enrolledCourses.length }}</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useEnrollmentStore } from '../stores/enrollment'
const store = useEnrollmentStore()
</script>

<style scoped>
.header {
  background-color: #1a73e8;
  color: white;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.site-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
.nav-list {
  list-style: none;
  display: flex;
  gap: 24px;
  align-items: center;
}
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}
.badge {
  background-color: white;
  color: #1a73e8;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}
</style>