#!/usr/bin/env node

/*!
Copyright 2023 Cassondra Roberts

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import * as Yargs from "yargs";
import { hideBin } from "yargs/helpers";

import globConcat from "./index.js";

import { default as settings } from "fast-glob/out/settings.js";

const Settings = settings.default;
const yargs = Yargs.default(hideBin(process.argv));

const ignoredFastGlobOpts = [
	"onlyDirectories",
	"stats",
	"objectMode",
	"_options",
];

yargs
	.scriptName("glob-concat")
	.command(
		"$0 [options] <files..>",
		"Concatenate files matching a glob pattern",
		(yargs) => {
			yargs.positional("files", {
				describe: "Files or globs to be matched and concatenated",
				array: true,
				required: true,
				alias: "f",
				normalize: true,
				type: "string",
			});
			yargs.options({
				output: {
					alias: "o",
					describe: "Name of the output file",
					type: "string",
					normalize: true,
					required: false,
				},
				allowEmpty: {
					alias: "ae",
					describe: "If true, no files or matches will not throw an error",
					type: "boolean",
					default: true,
				},
				sourcemap: {
					alias: "map",
					describe: "If true, a sourcemap will be generated",
					type: "boolean",
					default: true,
				},
				...Object.getOwnPropertyNames(new Settings())
					.filter((prop) => !ignoredFastGlobOpts.includes(prop))
					.reduce((acc, prop) => {
						acc[prop] = {
							describe: `[fast-glob] ${prop}`,
							required: false,
							type: typeof new Settings()[prop],
						};
						return acc;
					}, {}),
			});
		},
		async ({ files, output, sourcemap, ...options }) =>
			globConcat(files, output, {
				map: sourcemap,
				cwd: process.cwd(),
				...options,
			})
				.then((result) => {
					if (result.content && !output) {
						process.stdout.write(result.content, "utf8");
					}
				})
				.catch((error) => {
					console.error(error.message);
					process.exit(1);
				}),
	)
	.example(
		"glob-concat *.css -o index.css",
		"This will concatenate the found *.css files to index.css",
	)
	.showHelpOnFail(true, "Specify --help for available options")
	.help(true)
	.wrap(yargs.terminalWidth()).argv;
