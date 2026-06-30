<template>
  <section class="section">
    <h2 class="title">Available Courses</h2>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search courses..."
      class="search-input"
    />
    <div class="grid">
      <div v-for="course in filteredCourses" :key="course.id">
        <CourseCard v-bind="course" @enroll="onEnroll" />
        <button class="detail-btn" @click="router.push(`/courses/${course.id}`)">
          View Details
        </button>
      </div>
    </div>
    <p v-if="filteredCourses.length === 0" class="empty">No courses found.</p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CourseCard from '../components/CourseCard.vue'
import { courses } from '../data'
import { useEnrollmentStore } from '../stores/enrollment'

const router = useRouter()
const store = useEnrollmentStore()
const searchTerm = ref('')
const courseList = ref([])

onMounted(() => {
  courseList.value = courses
})

const filteredCourses = computed(() =>
  courseList.value.filter(c =>
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

function onEnroll(course) {
  store.enroll(course)
  router.push('/profile')
}
</script>

<style scoped>
.section { padding: 40px 32px; }
.title { font-size: 1.5rem; color: #1a73e8; margin-bottom: 20px; }
.search-input {
  width: 100%; padding: 10px 16px; font-size: 1rem;
  border: 1px solid #d0d7de; border-radius: 6px; margin-bottom: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.detail-btn {
  margin-top: 8px; width: 100%; padding: 8px;
  background-color: white; color: #1a73e8;
  border: 1px solid #1a73e8; border-radius: 6px; cursor: pointer;
}
.empty { color: #666; padding: 20px; }
</style>