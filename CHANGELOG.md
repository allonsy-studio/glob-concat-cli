# Change log

## 2.0.0 (2026-11-07)

### Major Changes

- [5bcd997](https://github.com/allonsy-studio/glob-concat-cli/commit/5bcd99756e855233b0f3c5c2113536fcd86ff07d): Require Node 24 or later. Node 22 is no longer supported: it entered maintenance on 2025-10-21 & reaches end of life on 2027-04-30. Support follows the Node.js maintenance schedule: Node 24 (in maintenance since 2026-10-20) is supported until its end of life on 2028-04-30, & Node 26 (LTS since 2026-10-28) until 2029-04-30. CI runs on Node 26 & 24.

### Patch Changes

- [b09484d](https://github.com/allonsy-studio/glob-concat-cli/commit/b09484d2cb41681102bab76214d9517186d1846b): List Buy Me a Coffee beside GitHub Sponsors in the funding field.
- [86990ea](https://github.com/allonsy-studio/glob-concat-cli/commit/86990eaa7c293a0c4429aa41299673f51333dcee): Migrate the ESLint configuration to the flat config format for ESLint 10. The optional catch binding in `index.js` drops its unused variable; behavior is unchanged.
- [99666ba](https://github.com/allonsy-studio/glob-concat-cli/commit/99666bae880481aaf0ae816544d21dd3638ebbc1): Point the author, repository, & bugs links at the allons-y.studio domain & the allonsy-studio organization.
- Update development dependencies & tooling: ESLint 10, ava 7, c8 11, eslint-plugin-jsonc 3, jsonc-eslint-parser 3, globals 17, Yarn 4.14, & the GitHub Actions in CI. Lint Markdown with `@eslint/markdown` in place of markdownlint, & run CI on Node 26 & 24. Add AGENTS.md, CODEOWNERS, & the merge queue trigger. None of this changes the published package.

## 1.0.2 (2025-11-04)

### Bug Fixes

- linted all assets with updated tooling ([51a1c0c](https://github.com/allonsy-studio/glob-concat-cli/commit/51a1c0cf93e6e5aeccaf23a9b98484a729c45e8e))

## 1.0.1 (2023-09-20)

### Bug Fixes

- dependencies pulled out of devDep ([6a707ce](https://github.com/allonsy-studio/glob-concat-cli/commit/6a707ce67dc784844cfe437974cb69fb5d9c4f64))
- update utf-8 syntax ([f838208](https://github.com/allonsy-studio/glob-concat-cli/commit/f838208b19798fa03e25ac373211794199c81373))

## 1.0.0 (2023-09-19)

### Features

- initialize glob concatenation project ([cacd612](https://github.com/allonsy-studio/glob-concat-cli/commit/cacd612ab660707429c9d87df9a66972df5b185e))
