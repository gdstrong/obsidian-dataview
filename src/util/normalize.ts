import { Duration } from "luxon";

/** Normalize a duration to all of the proper units. */
export function normalizeDuration(dur: Duration) {
	return dur.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds").normalize();
}

/** Get the folder containing the given path (i.e., like computing 'path/..') */
export function getParentFolder(path: string): string {
	return path.split("/").slice(0, -1).join("/");
}

/** Get the file name for the file, without any parent directories. */
export function getFileName(path: string): string {
	if (path.includes("/")) path = path.substring(path.lastIndexOf("/") + 1);
	if (path.endsWith(".md")) path = path.substring(0, path.length - 3);
	return path;
}

const ALLOWABLE_VAR_CHARACTERS = /[0-9\w\p{Letter}\p{Emoji_Presentation}\-]/;
const WHITESPACE = /\s/;

/** Convert an arbitrary variable name into something JS/query friendly. */
export function canonicalizeVarName(name: string): string {
	// Strip down to purely alphanumeric + spaces.
	let result = "";
	for (let index = 0; index < name.length; index++) {
		let ch = name[index];
		if (ch.match(WHITESPACE)) {
			result += "-";
			continue;
		}

		if (!ch.match(ALLOWABLE_VAR_CHARACTERS)) continue;
		result += ch.toLocaleLowerCase();
	}

	return result;
}

/** Try calling the given function; on failure, return the error message.  */
export function tryOrPropogate<T>(func: () => T): T | string {
	try {
		return func();
	} catch (error) {
		return "" + error + "\n\n" + error.stack;
	}
}