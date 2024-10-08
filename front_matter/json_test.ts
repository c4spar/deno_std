// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { test } from "./test.ts";
import { extract } from "./json.ts";
import {
  runExtractJsonTests,
  runExtractTypeErrorTests,
  runTestInvalidInputTests,
  runTestValidInputTests,
} from "./_test_utils.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("test() handles valid input", () => {
  runTestValidInputTests("json", test);
});

Deno.test("test() handles invalid input", () => {
  runTestInvalidInputTests("json", test);
});

Deno.test("json() extracts type error on invalid input", () => {
  runExtractTypeErrorTests("json", extract);
});

Deno.test("json() parses json delineate by ---json", async () => {
  await runExtractJsonTests(extract);
});

Deno.test("extractJson() allows whitespaces after the header", () => {
  assertEquals(extract('---json  \n{"foo": 0}\n---\n').attrs, { foo: 0 });
  assertEquals(extract('= json =  \n{"foo": 0}\n---\n').attrs, { foo: 0 });
});
