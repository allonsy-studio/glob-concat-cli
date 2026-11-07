# glob-concat-cli

A command-line tool that concatenates files matched by [fast-glob] patterns, writing to
a file or to stdout, and emitting a sourcemap by default. Empty files are skipped
unless asked for: that behavior exists so build pipelines don't choke on them.

ESM only, Node >= 22.21, Yarn 4.

[fast-glob]: https://github.com/mrmlnc/fast-glob#pattern-syntax

## Layout

| Path        | Purpose                                                                   |
| ----------- | ------------------------------------------------------------------------- |
| `index.js`  | The whole library. Default export does the work; also exports `MESSAGES`. |
| `cli.js`    | yargs wrapper, the `glob-concat` bin. Argument parsing only.              |
| `test.js`   | The whole AVA suite.                                                      |
| `fixtures/` | Input files (CSS & markdown, including an intentionally empty one).       |
| `expected/` | Expected output, compared as exact strings.                               |
| `COPYRIGHT` | The license header text.                                                  |

Keep argument parsing in `cli.js` and behavior in `index.js`. Anything worth testing
belongs on the `index.js` side, because that's what the suite drives.

## Commands

```sh
yarn test        # ava
yarn coverage    # c8 over the suite
yarn lint        # prettier --check, eslint, markdownlint
yarn lint:fix    # the same three with --write / --fix
```

## Testing

Tests use `mock-fs`, not a temp directory: `fixtures/` is loaded into a mocked
filesystem in `beforeEach`, and reads of real files go through `mock.bypass()`. Two
consequences worth remembering: anything touching the real filesystem inside a test
needs that bypass, and user-facing strings are asserted against the exported
`MESSAGES` object rather than hardcoded, so a copy change means updating `MESSAGES`,
not the test.

New behavior gets a fixture, an expected file, and a case in `test.js`.

## Conventions

- Keep code self-documenting. When a comment is warranted, keep it brief and explain
  only the _why_ the code can't show; never restate what the code does.
- husky + lint-staged run on commit and commitlint checks the message. Don't bypass
  with `--no-verify`.
- README sections between `weaver:*:START` / `weaver:*:END` markers are auto-generated
  by Weaver; never edit inside them.

## Commits, releases & pull requests

Releases go through **Changesets** on `main`, as in most of the org. A change a consumer
would notice needs a changeset (`yarn changeset`): the bump type & the summary you write
become the changelog entry, so write the summary for a human reader. Merging to `main`
opens a "Version Packages" pull request; merging that publishes to npm. Docs, tests, CI,
& internal refactors need none.

Conventional Commits, enforced by commitlint: `<type>(<optional-scope>): <imperative
subject>`, lowercase, no trailing period. Fill in
[`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md); see
[`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for the full flow.

Never add AI attribution to a commit or a PR: no `Co-Authored-By` trailer, no
"Generated with …" footer, no session URLs.

## Prose style

Prose in this repo (README, commit bodies, PR descriptions) follows the
[studio style guide](https://github.com/allonsy-studio/.github/blob/main/AGENTS.md#style-guide):
sentence-case headings, `&` over "and", `:` over em dashes.
