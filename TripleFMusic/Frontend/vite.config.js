/**
 * Vite configuration file.
 * @module vite.config
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Define the Vite configuration.
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [react()],
})
