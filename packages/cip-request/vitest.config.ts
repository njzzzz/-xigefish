import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    environment: 'jsdom',
    clearMocks: true,
    setupFiles: './vitest.setup.ts',
    exclude: [ 'node_modules' ],
  },
})
