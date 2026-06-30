<template>
  <section class="section">
    <h2 class="title">Student Profile</h2>

    <div class="form">
      <h3 class="form-title">My Details</h3>
      <label class="label">Name</label>
      <input v-model="profile.name" placeholder="Enter your name" class="input" />
      <label class="label">Email</label>
      <input v-model="profile.email" placeholder="Enter your email" class="input" />
      <label class="label">Semester</label>
      <input v-model="profile.semester" placeholder="Enter semester" class="input" />
    </div>

    <div class="enrolled-box">
      <h3 class="form-title">
        Enrolled Courses ({{ store.enrolledCourses.length }}) —
        Total Credits: {{ store.totalCredits }}
      </h3>
      <p v-if="store.enrolledCourses.length === 0" class="empty">
        No courses enrolled yet.
      </p>
      <ul v-else class="list">
        <li v-for="course in store.enrolledCourses" :key="course.id" class="list-item">
          <span>{{ course.name }} — {{ course.code }}</span>
          <button class="remove-btn" @click="store.unenroll(course.id)">Remove</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useEnrollmentStore } from '../stores/enrollment'

const store = useEnrollmentStore()
const profile = reactive({ name: '', email: '', semester: '' })
</script>

<style scoped>
.section { padding: 40px 32px; }
.title { font-size: 1.5rem; color: #1a73e8; margin-bottom: 24px; }
.form {
  background: white; padding: 24px;
  border-radius: 8px; margin-bottom: 24px;
  border: 1px solid #d0d7de; max-width: 500px;
}
.form-title { margin-bottom: 16px; color: #333; }
.label { display: block; font-weight: bold; color: #555; margin-bottom: 4px; }
.input {
  width: 100%; padding: 10px; font-size: 1rem;
  border: 1px solid #d0d7de; border-radius: 6px; margin-bottom: 16px;
}
.enrolled-box { background-color: #e8f0fe; padding: 24px; border-radius: 8px; }
.empty { color: #666; }
.list { list-style: none; }
.list-item {
  display: flex; justify-content: space-between;
  align-items: center; padding: 10px 0;
  border-bottom: 1px solid #d0d7de;
}
.remove-btn {
  padding: 6px 12px; background-color: #d93025;
  color: white; border: none; border-radius: 6px; cursor: pointer;
}
</style>