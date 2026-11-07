## [1.0.2](https://github.com/castastrophe/glob-concat-cli/compare/v1.0.1...v1.0.2) (2025-11-04)

### Bug Fixes

- linted all assets with updated tooling ([51a1c0c](https://github.com/castastrophe/glob-concat-cli/commit/51a1c0cf93e6e5aeccaf23a9b98484a729c45e8e))

# Change log

## [1.0.1](https://github.com/castastrophe/glob-concat-cli/compare/v1.0.0...v1.0.1) (2023-09-20)

### Bug Fixes

- dependencies pulled out of devDep ([6a707ce](https://github.com/castastrophe/glob-concat-cli/commit/6a707ce67dc784844cfe437974cb69fb5d9c4f64))
- update utf-8 syntax ([f838208](https://github.com/castastrophe/glob-concat-cli/commit/f838208b19798fa03e25ac373211794199c81373))

## 2.0.0

### Major Changes

- eb1cb60: Require Node 24 or later. Node 22 is no longer supported: it entered maintenance on 2025-10-21 & reaches end of life on 2027-04-30. Support follows the Node.js maintenance schedule: Node 24 (in maintenance since 2026-10-20) is supported until its end of life on 2028-04-30, & Node 26 (LTS since 2026-10-28) until 2029-04-30. CI runs on Node 26 & 24.

### Patch Changes

- eb1cb60: Migrate the ESLint configuration to the flat config format for ESLint 10. The optional catch binding in `index.js` drops its unused variable; behavior is unchanged.
- eb1cb60: List Buy Me a Coffee beside GitHub Sponsors in the funding field.
- eb1cb60: Point the author, repository, & bugs links at the allons-y.studio domain & the allonsy-studio organization.
- eb1cb60: Update development dependencies & tooling: ESLint 10, ava 7, c8 11, eslint-plugin-jsonc 3, jsonc-eslint-parser 3, globals 17, Yarn 4.14, & the GitHub Actions in CI. Lint Markdown with `@eslint/markdown` in place of markdownlint, & run CI on Node 26 & 24. Add AGENTS.md, CODEOWNERS, & the merge queue trigger. None of this changes the published package.

## 1.0.0 (2023-09-19)

### Features

- initialize glob concatenation project ([cacd612](https://github.com/castastrophe/glob-concat-cli/commit/cacd612ab660707429c9d87df9a66972df5b185e))
