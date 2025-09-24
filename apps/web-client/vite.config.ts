import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const PROJECT_DIR = path.resolve(__dirname).split(path.sep).slice(0, -2).join(path.sep);
  const env = loadEnv(mode, PROJECT_DIR);
  return {
    root: __dirname,
    base: `/`,
    env,
    envDir: PROJECT_DIR,
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
