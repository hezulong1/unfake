<script setup lang="ts">
import { staticRoutes } from './routes';
</script>

<template>
  <ul class="nav">
    <li v-for="menu of staticRoutes" :key="menu.path">
      <RouterLink :to="menu.path">{{ menu.name }}</RouterLink>
    </li>
  </ul>

  <div>
    <RouterView />
  </div>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
  user-select: none;
  color: #333;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

#app {
  display: grid;
  grid-template-columns: 241px 1fr;
  gap: 20px;
}

.nav {
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  flex-direction: column;
  min-height: 100vh;
  border-right: 1px solid #ddd;

  li {
    list-style: none;

    a {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 36px;
      background-color: rgba(0,0,0,.12);
      border-radius: 8px;
      transition: all .3s ease-in-out;

      &:hover {
        background-color: rgba(0,0,0,.22);
      }
    }
  }
}
</style>
