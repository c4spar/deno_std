// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isWindows } from "./_os.ts";
import { format as posixFormat } from "./posix/format.ts";
import { format as windowsFormat } from "./windows/format.ts";
import type { FormatInputPathObject } from "./_interface.ts";

/**
 * Generate a path from a {@linkcode FormatInputPathObject} object. It does the
 * opposite of {@linkcode https://jsr.io/@std/path/doc/~/parse | parse()}.
 *
 * @example Usage
 * ```ts
 * import { format } from "@std/path/format";
 * import { assertEquals } from "@std/assert/assert-equals";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(format({ dir: "C:\\path\\to", base: "script.ts" }), "C:\\path\\to\\script.ts");
 * } else {
 *   assertEquals(format({ dir: "/path/to/dir", base: "script.ts" }), "/path/to/dir/script.ts");
 * }
 * ```
 *
 * @param pathObject Object with path components.
 * @returns The formatted path.
 */
export function format(pathObject: FormatInputPathObject): string {
  return isWindows ? windowsFormat(pathObject) : posixFormat(pathObject);
}
