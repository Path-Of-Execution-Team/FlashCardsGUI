/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3001',
    specPattern: 'tests/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'tests/utils/e2e.ts',
  },
});
