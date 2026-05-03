/**
 * Photo asset registry.
 * Replace any of these IDs with your own Unsplash photo IDs (or swap for /public/ paths).
 * To self-host: drop a JPG into /public/img/ and change the value to "/img/your-file.jpg".
 */
export const photos = {
  hero: "1523365154888-8a758819b722", // Mediterranean coast, atmospheric
  about: "1587993720549-1aaa2992cdf0", // Conero coast (Marche, near Ancona)
  cities: {
    ancona: "1538513238982-676810e65b3b", // harbor with ferry at sunset
    bologna: "1666200094966-52254d810577", // Palazzo Re Enzo, Piazza Maggiore
    padova: "1652987363975-958fd0ffacaa", // Basilica of Saint Anthony
    milano: "1520440229-6469a149ac59", // Milan Duomo
    roma: "1552832230-c0197dd311b5", // Colosseum
    firenze: "1476362174823-3a23f4aa6d76", // Florence skyline + Duomo
  },
};

export function unsplash(id: string, w = 1600, q = 80, h?: number) {
  // Allow self-hosted paths (start with "/" or "http")
  if (id.startsWith("/") || id.startsWith("http")) return id;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `https://images.unsplash.com/photo-${id}?${params}`;
}
