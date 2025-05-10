<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Movie-Watch-List/',  // This must match the repo name!
=======
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Movie-Watch-List/', // 👈 Add this line
>>>>>>> 1782041b870417481aef3d3f051a9009a9a3cd4f
  plugins: [react()],
});
