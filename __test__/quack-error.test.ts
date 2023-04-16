import { QuackError } from "../quack-error.ts";
import { assertEquals, assertExists, assertInstanceOf } from "./deps.ts";

Deno.test("QuackError", async (t) => {
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

  await t.step("fromResponse", () => {
    const response = new Response(null, { status: 500, statusText: "Thats an error" });
    const quackError = QuackError.fromResponse(response);

    assertEquals(quackError.name, "Response Error: [500]");
    assertEquals(quackError.message, "Thats an error");
  });
});
