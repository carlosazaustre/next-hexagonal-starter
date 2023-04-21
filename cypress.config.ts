/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";

export default defineConfig({
	video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
