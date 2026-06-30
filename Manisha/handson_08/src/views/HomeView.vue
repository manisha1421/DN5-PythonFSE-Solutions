<template>
  <div>
    <section class="hero">
      <h1 class="hero-title">Welcome to the Student Portal</h1>
      <p class="hero-text">
        Your one-stop destination to manage courses, grades, and your profile.
      </p>
      <button class="hero-btn" @click="router.push('/courses')">
        Explore Courses
      </button>
    </section>

    <section class="stats-bar">
      <div class="stat-item">
        <span class="stat-number">{{ store.enrolledCourses.length }}</span>
        <span class="stat-label">Courses Enrolled</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">3.8</span>
        <span class="stat-label">GPA</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">6</span>
        <span class="stat-label">Semester</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useEnrollmentStore } from '../stores/enrollment'
const router = useRouter()
const store = useEnrollmentStore()
</script>

<style scoped>
.hero {
  background-color: #e8f0fe;
  text-align: center;
  padding: 60px 32px;
}
.hero-title { font-size: 2rem; color: #1a73e8; margin-bottom: 16px; }
.hero-text { font-size: 1.1rem; color: #555; margin-bottom: 24px; }
.hero-btn {
  padding: 12px 28px; background-color: #1a73e8;
  color: white; border: none; border-radius: 6px;
  font-size: 1rem; cursor: pointer;
}
.stats-bar {
  background-color: #1a73e8;
  display: flex;
  justify-content: space-around;
  padding: 20px 32px;
}
.stat-item { display: flex; flex-direction: column; align-items: center; color: white; }
.stat-number { font-size: 1.8rem; font-weight: bold; }
.stat-label { font-size: 0.9rem; opacity: 0.85; }
</style>