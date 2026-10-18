import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { filterInstagramStories, instagramEmbedUrl, instagramReels, instagramStories, instagramViewsChecked } from "../src/lib/instagram";

test("approved selection has six ranked reels and four real student posts", () => {
  assert.equal(instagramReels.length, 6);
  assert.equal(instagramStories.length, 4);
  assert.equal(new Set([...instagramReels, ...instagramStories].map(item => item.id)).size, 10);
  const counts = instagramReels.map(item => parseFloat(item.views!) * 1000);
  assert.deepEqual(counts, [...counts].sort((a, b) => b - a));
  assert.equal(instagramViewsChecked, "18 October 2026");
});

test("every thumbnail is a durable, existing local image, not an expiring CDN link", () => {
  for (const item of [...instagramReels, ...instagramStories]) {
    assert.match(item.image, /^\/media\/instagram\/[\w-]+\.(jpg|webp)$/);
    const file = join(process.cwd(), "public", item.image);
    assert.ok(existsSync(file), item.image);
    assert.ok(statSync(file).size > 1000);
    assert.ok(item.url.includes(`/${item.id}/`));
    assert.equal(instagramEmbedUrl(item.url), `${item.url}embed/`);
  }
});

test("story filters retain only the requested type without mutating the selection", () => {
  assert.equal(filterInstagramStories(instagramStories, "visa").length, 2);
  assert.ok(filterInstagramStories(instagramStories, "visa").every(item => item.kind === "visa"));
  assert.equal(filterInstagramStories(instagramStories, "interview").length, 2);
  assert.ok(filterInstagramStories(instagramStories, "interview").every(item => item.kind === "interview"));
  assert.equal(filterInstagramStories(instagramStories, "all").length, 4);
});

test("embed URLs reject unrelated hosts, credentials, paths, queries and fragments", () => {
  for (const url of ["javascript:alert(1)", "https://instagram.com/reel/abc/", "https://example.com/reel/abc/", "https://user:password@www.instagram.com/reel/abc/", "https://www.instagram.com/account/", "https://www.instagram.com/reel/abc/?token=test", "https://www.instagram.com/reel/abc/#test", "https://www.instagram.com/reel/abc/extra/"]) {
    assert.throws(() => instagramEmbedUrl(url));
  }
});
