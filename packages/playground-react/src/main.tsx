import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const domNode = document.querySelector('#root')!;

createRoot(domNode).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
