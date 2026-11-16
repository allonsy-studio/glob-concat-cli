import md from "@allons-y/opx-lint-md/eslint.config.js";

export default [
	...md,
	// Changesets writes this file on every release.
	{ ignores: ["CHANGELOG.md"] },
];
