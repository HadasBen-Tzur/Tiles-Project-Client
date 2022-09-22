import { defineConfig } from 'vite';
import { setDefaultResultOrder } from 'dns';
import react from '@vitejs/plugin-react';

setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		cors: true,
		host: 'localhost',
	},
});
