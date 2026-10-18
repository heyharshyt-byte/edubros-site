export type InstagramPost = {
  id: string;
  title: string;
  note: string;
  kind: "reel" | "visa" | "interview";
  image: string;
  url: string;
  views?: string;
};

// Curated, owner-approved public posts. Counts are a snapshot, not a live feed.
export const instagramViewsChecked = "18 October 2026";

export const instagramReels: InstagramPost[] = [
  { id: "DXp8EBtNeNa", title: "Most watched · No. 01", note: "Original reel from the Edubros feed", kind: "reel", views: "289K", image: "/media/instagram/DXp8EBtNeNa.jpg", url: "https://www.instagram.com/reel/DXp8EBtNeNa/" },
  { id: "DdJqGLCNybx", title: "Padova: your next chapter", note: "Admissions reel · 2027 intake", kind: "reel", views: "77.1K", image: "/media/instagram/DdJqGLCNybx.jpg", url: "https://www.instagram.com/reel/DdJqGLCNybx/" },
  { id: "DYaKvC3oukg", title: "Most watched · No. 03", note: "Original reel from the Edubros feed", kind: "reel", views: "60.9K", image: "/media/instagram/DYaKvC3oukg.jpg", url: "https://www.instagram.com/reel/DYaKvC3oukg/" },
  { id: "DdojyjGN5Zb", title: "Your Padova application guide", note: "Documents, requirements & next steps", kind: "reel", views: "47.8K", image: "/media/instagram/DdojyjGN5Zb.jpg", url: "https://www.instagram.com/reel/DdojyjGN5Zb/" },
  { id: "DaDMWLhsDcd", title: "Most watched · No. 05", note: "Original reel from the Edubros feed", kind: "reel", views: "42.2K", image: "/media/instagram/DaDMWLhsDcd.jpg", url: "https://www.instagram.com/reel/DaDMWLhsDcd/" },
  { id: "DY4v3ayMlY5", title: "Most watched · No. 06", note: "Original reel from the Edubros feed", kind: "reel", views: "18.2K", image: "/media/instagram/DY4v3ayMlY5.jpg", url: "https://www.instagram.com/reel/DY4v3ayMlY5/" },
];

export const instagramStories: InstagramPost[] = [
  { id: "DejzaAysifU", title: "Next stop: Italy, Jaismeen.", note: "Italy study visa · October 2026", kind: "visa", image: "/media/instagram/DejzaAysifU.webp", url: "https://www.instagram.com/p/DejzaAysifU/" },
  { id: "DeMUjIdMJJs", title: "Ritika on feeling at home.", note: "Student interview · Life in Italy", kind: "interview", image: "/media/instagram/DeMUjIdMJJs.jpg", url: "https://www.instagram.com/reel/DeMUjIdMJJs/" },
  { id: "DdteSWTsnYS", title: "A new beginning for Ritika.", note: "Italy study visa · September 2026", kind: "visa", image: "/media/instagram/DdteSWTsnYS.webp", url: "https://www.instagram.com/p/DdteSWTsnYS/" },
  { id: "DeJ98e4saHO", title: "Nishant’s scholarship story.", note: "Student interview · His experience", kind: "interview", image: "/media/instagram/DeJ98e4saHO.jpg", url: "https://www.instagram.com/reel/DeJ98e4saHO/" },
];

export type StoryFilter = "all" | "visa" | "interview";
export function filterInstagramStories(items: InstagramPost[], filter: StoryFilter) {
  return filter === "all" ? items : items.filter(item => item.kind === filter);
}

export function instagramEmbedUrl(url: string): string {
  const parsed = new URL(url);
  if (parsed.origin !== "https://www.instagram.com" || parsed.username || parsed.password || !/^\/(reel|p)\/[\w-]+\/$/.test(parsed.pathname) || parsed.search || parsed.hash) {
    throw new Error("Expected a canonical Instagram post URL");
  }
  return `${parsed.origin}${parsed.pathname}embed/`;
}
