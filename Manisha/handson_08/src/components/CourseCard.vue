<template>
  <article class="card">
    <h3>{{ name }}</h3>
    <p>{{ code }}</p>
    <span class="credits">Credits: {{ credits }}</span>
    <p>Grade: {{ grade }}</p>
    <button class="enroll-btn" @click="$emit('enroll', { id, name, code, credits, grade })">
      Enroll
    </button>
  </article>
</template>

<script setup>
defineProps({
  id: Number,
  name: String,
  code: String,
  credits: Number,
  grade: String
})
defineEmits(['enroll'])
</script>

<style scoped>
.card {
  background: white;
  padding: 20px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
.card h3 { margin-bottom: 8px; color: #333; }
.card p { color: #666; margin-bottom: 8px; }
.credits { font-weight: bold; color: #1a73e8; display: block; margin-bottom: 8px; }
.enroll-btn {
  padding: 8px 16px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>