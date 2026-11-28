import assert from "node:assert/strict";
import { test } from "node:test";
import { extractYouTubeId } from "../src/lib/youtube";
const id = "dQw4w9WgXcQ";
test("accepts common YouTube video links", () => {
  for (const url of [id, "https://www.youtube.com/watch?v="+id, "https://youtu.be/"+id+"?si=x", "https://m.youtube.com/shorts/"+id, "https://youtube.com/live/"+id, "https://www.youtube-nocookie.com/embed/"+id]) assert.equal(extractYouTubeId(url), id);
});
test("rejects malformed and lookalike URLs", () => {
  for (const url of ["", "https://notyoutube.com/watch?v="+id, "https://youtube.com.evil.test/watch?v="+id, "https://youtu.be/"+id+"extra", "https://youtube.com/watch?v=short", "https://youtube.com@evil.test/watch?v="+id, "https://youtube.com/playlist?list="+id]) assert.equal(extractYouTubeId(url), null);
});
