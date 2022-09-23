import { Scriptable } from "@scriptable-run/client";
import fetch from "node-fetch";

const scriptable = new Scriptable({ customFetch: fetch });

const executeInput = {
  source: "return `Hello ${name}!`;",
  globals: { name: "World" },
};

scriptable.execute
  .execute(executeInput, {
    headers: {
      authorization: "Bearer access_key_v1_xxxx",
    },
  })
  .then(async (response) => {
    console.log(response.data);
  });
