import { context } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';

await mkdir('dist/assets', { recursive: true });
await cp('public', 'dist', { recursive: true });
const builder = await context({ entryPoints: ['src/main.jsx'], bundle: true, sourcemap: true, outfile: 'dist/assets/app.js', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"development"' }, logLevel: 'info' });
await builder.rebuild();
await builder.watch();
await builder.serve({ servedir: 'dist', host: '127.0.0.1', port: 3000 });
console.log('Personal website: http://localhost:3000');
let stopping = false;
async function stop() { if (stopping) return; stopping = true; await builder.dispose(); process.exit(0); }
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
