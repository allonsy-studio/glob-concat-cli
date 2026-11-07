import fs, { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import test from "ava";

import globConcat, { MESSAGES } from "./index.js";

const ROOT = process.cwd();
let work;

/** Read a committed expectation. */
function readFile(filename) {
	return readFileSync(join(ROOT, filename), "utf-8");
}

test.beforeEach(() => {
	work = mkdtempSync(join(tmpdir(), "glob-concat-"));
	cpSync(join(ROOT, "fixtures"), join(work, "fixtures"), { recursive: true });
	mkdirSync(join(work, "expected"));
	process.chdir(work);
});

test.afterEach.always(() => {
	process.chdir(ROOT);
	rmSync(work, { recursive: true, force: true });
});
test.serial("concatenate two files", async (t) => {
	return (
		globConcat(
			["./fixtures/file-1.md", "./fixtures/file-2.md"],
			"./expected/concat.md",
			{ fs: fs },
		)
			.then((result) => {
				t.is(
					result.content,
					readFile("./expected/concat.md"),
					"content matches",
				);
				t.assert(result.map, "content matches");
			})
			// No errors should be thrown, so fail the test if one is
			.catch((error) => {
				t.fail(error.message);
			})
	);
});

test.serial("concatenate with globs", async (t) => {
	const output = "./expected/concat.md";
	return (
		globConcat(["./fixtures/*.md"], output, { fs: fs })
			.then((result) => {
				t.is(
					result.inputFiles.length,
					2,
					"number of input files found matches expected",
				);
				t.is(result.content, readFile("./expected/concat.md"), "content matches");
				t.assert(result.map, "sourcemap exists");
			})
			// No errors should be thrown, so fail the test if one is
			.catch((error) => {
				t.fail(error.message);
			})
	);
});

test.serial("concatenate with globs to stdout", async (t) => {
	return (
		globConcat(["./fixtures/*.css"], undefined, { fs: fs })
			.then((result) => {
				t.is(
					result.inputFiles.length,
					2,
					"number of input files found matches expected",
				);
				// Check the stdout for the expected content
				t.is(
					result.content,
					readFile("./expected/concat-stdout.css"),
					"content matches",
				);
			})
			// No errors should be thrown, so fail the test if one is
			.catch((error) => {
				t.fail(error.message);
			})
	);
});

test.serial("empty file with error", async (t) => {
	const output = "./expected/concat.md";
	return globConcat(["./fixtures/file-empty.md"], output, {
		allowEmpty: false,
		fs: fs,
	})
		.then((result) => {
			t.is(result.content, readFile("./expected/concat.md"), "content matches");
			t.assert(result.map, "sourcemap content matches");
		})
		.catch((error) => {
			t.is(
				error.message,
				MESSAGES.empty_file("./fixtures/file-empty.md", process.cwd()),
			);
		});
});

test.serial("no file input provided to script", async (t) => {
	return globConcat([], undefined, { allowEmpty: false, fs: fs })
		.then(() => t.fail("no input files should throw an error"))
		.catch((error) => {
			t.is(error.message, MESSAGES.no_input_files);
		});
});
