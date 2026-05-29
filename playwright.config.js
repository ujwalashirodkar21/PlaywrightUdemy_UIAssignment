// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: null,           // ensures Playwright uses full screen resolution
    launchOptions: {
      args: ['--start-maximized'] // starts browser maximized
    }
  }
});

