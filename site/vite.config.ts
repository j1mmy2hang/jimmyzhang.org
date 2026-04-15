import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

function noteIndexPlugin(): Plugin {
  const script = resolve(__dirname, 'scripts/build-note-index.mjs');
  const notesDir = resolve(__dirname, '../content/note');
  let running: Promise<void> | null = null;
  const run = () => {
    if (running) return running;
    running = new Promise((res) => {
      const p = spawn('node', [script], { stdio: 'inherit' });
      p.on('close', () => {
        running = null;
        res();
      });
    });
    return running;
  };
  return {
    name: 'note-index',
    async buildStart() {
      await run();
    },
    configureServer(server) {
      server.watcher.add(notesDir);
      server.watcher.on('change', async (p) => {
        if (p.startsWith(notesDir) && p.endsWith('.md')) {
          await run();
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), noteIndexPlugin()],
  publicDir: resolve(__dirname, '../content'),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
