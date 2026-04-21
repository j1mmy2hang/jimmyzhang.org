import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

function noteIndexPlugin(): Plugin {
  const script = resolve(__dirname, 'scripts/build-note-index.mjs');
  const contentDir = resolve(__dirname, '../content');
  // Sections whose .md edits should regenerate indexes. The note-index covers
  // notes; the per-section JSONs cover the others.
  const watchedSections = ['note', 'writing', 'project', 'newsletter', 'photo'].map((s) =>
    resolve(contentDir, s)
  );
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
      for (const d of watchedSections) server.watcher.add(d);
      server.watcher.on('change', async (p) => {
        if (!p.endsWith('.md')) return;
        if (!watchedSections.some((d) => p.startsWith(d))) return;
        await run();
        server.ws.send({ type: 'full-reload' });
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
