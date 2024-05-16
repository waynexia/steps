import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'istanbul',
    },
  },
  // For TypeScript support
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

// How to use Vitest:
// - Run tests with `vitest run`
// - Watch mode: `vitest watch`
// - UI dashboard: `vitest ui`
// - For coverage: `vitest run --coverage`
