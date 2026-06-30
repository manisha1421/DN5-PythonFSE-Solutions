<template>
  <Header />
  <RouterView />
  <footer class="footer">
    <p>&copy; 2025 Student Portal. All rights reserved.</p>
  </footer>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; background-color: #f4f6f9; color: #333; }
.footer {
  background-color: #1a73e8; color: white;
  text-align: center; padding: 20px;
  font-size: 0.9rem; margin-top: 40px;
}
</style>