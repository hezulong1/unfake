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
