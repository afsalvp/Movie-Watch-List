import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Movie-Watch-List/',  // This must match the repo name!
  plugins: [react()],
});
