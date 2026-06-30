<template>
  <section class="section">
    <button class="back-btn" @click="router.push('/courses')">
      ← Back to Courses
    </button>
    <div v-if="course" class="card">
      <h2 class="title">{{ course.name }}</h2>
      <p class="info">Code: {{ course.code }}</p>
      <p class="info">Credits: {{ course.credits }}</p>
      <p class="info">Grade: {{ course.grade }}</p>
      <button class="enroll-btn" @click="onEnroll">Enroll in this Course</button>
    </div>
    <p v-else>Course not found!</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data'
import { useEnrollmentStore } from '../stores/enrollment'

const route = useRoute()
const router = useRouter()
const store = useEnrollmentStore()

const course = computed(() =>
  courses.find(c => c.id === parseInt(route.params.id))
)

function onEnroll() {
  if (course.value) {
    store.enroll(course.value)
    router.push('/profile')
  }
}
</script>

<style scoped>
.section { padding: 40px 32px; }
.back-btn {
  margin-bottom: 20px; padding: 8px 16px;
  background-color: white; color: #1a73e8;
  border: 1px solid #1a73e8; border-radius: 6px; cursor: pointer;
}
.card {
  background: white; padding: 32px;
  border-radius: 8px; border: 1px solid #d0d7de; max-width: 500px;
}
.title { font-size: 1.8rem; color: #1a73e8; margin-bottom: 16px; }
.info { font-size: 1.1rem; color: #555; margin-bottom: 12px; }
.enroll-btn {
  margin-top: 16px; padding: 12px 24px;
  background-color: #1a73e8; color: white;
  border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;
}
</style>