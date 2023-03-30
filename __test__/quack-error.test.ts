import { assertEquals, assertExists, assertInstanceOf } from "https://git.quack.id/test-helpers/mod.ts";
import { QuackError } from "../quack-error.ts";

Deno.test("quack-error", async (t) => {
  await t.step("fromUnknown", () => {
    const unknownThatIsError: unknown = new Error("This is an error that is unknown");
    const quackError = QuackError.fromUnknown(unknownThatIsError);

    assertInstanceOf(quackError, QuackError);
    assertEquals(quackError.message, "This is an error that is unknown");
    assertExists(quackError.cause);
    assertEquals(quackError.cause, unknownThatIsError);

    const unknownThatIsString: unknown = "This is an error that is a string";

    const quackErrorString = QuackError.fromUnknown(unknownThatIsString);
    assertEquals(quackErrorString.message, "This is an error that is a string");
    assertEquals(quackErrorString.cause, undefined);
  });
});
