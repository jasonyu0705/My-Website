import { build } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';

await mkdir('dist/assets', { recursive: true });
await cp('public', 'dist', { recursive: true });
await build({ entryPoints: ['src/main.jsx'], bundle: true, minify: true, sourcemap: true, outfile: 'dist/assets/app.js', jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' }, target: ['es2022'], logLevel: 'info' });
