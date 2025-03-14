import { createRouter, createWebHistory } from 'vue-router';

export const staticRoutes = Object.entries(import.meta.glob('./demo/*.vue')).map(([src, component]) => {
  const name = src.replace(/^.*\/(.*)\.vue$/, '$1');
  return {
    name,
    path: '/' + name,
    component,
  };
});

export function setupRouter() {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/', redirect: staticRoutes[0].path },
      ...staticRoutes,
    ],
  });

  return router;
}
