import { InstagramCarousel } from "./instagram-carousel";
import { instagramReels, instagramStories, instagramViewsChecked } from "@/lib/instagram";
import styles from "./instagram.module.css";

export function InstagramReels() {
  return (
    <section id="instagram-reels" aria-labelledby="instagram-reels-heading" className={styles.section}>
      <div className={`${styles.wrap} ${styles.heading}`}>
        <div>
          <p className={styles.eyebrow}><span aria-hidden="true">✦</span> The Edubros edit · On Instagram</p>
          <h2 id="instagram-reels-heading">Italy, one reel<br /><em>at a time.</em></h2>
        </div>
        <div className={styles.aside}>
          <p>The conversations, practical advice and little moments that bring studying in Italy to life.</p>
          <a className={styles.textLink} href="https://www.instagram.com/edubros.in/" target="_blank" rel="noopener noreferrer">Explore @edubros.in <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <InstagramCarousel items={instagramReels} label="Our most-watched reels" id="reels" />
      <div className={`${styles.wrap} ${styles.footer}`}>
        <span>Tap a reel to watch. Swipe to explore.</span>
        <span>Views checked {instagramViewsChecked}</span>
      </div>
      <MediaPrivacyNote />
    </section>
  );
}

export function InstagramStories() {
  return (
    <section id="student-stories" aria-labelledby="student-stories-heading" className={`${styles.section} ${styles.dark}`}>
      <div className={`${styles.wrap} ${styles.heading}`}>
        <div>
          <p className={styles.eyebrow}><span aria-hidden="true">✦</span> The people behind the journey</p>
          <h2 id="student-stories-heading">Real students.<br /><em>New beginnings.</em></h2>
        </div>
        <div className={styles.aside}>
          <p>Visa celebrations, first impressions and honest conversations with students taking their next step in Italy.</p>
          <span className={styles.handnote}>Their stories, in their own words.</span>
        </div>
      </div>
      <InstagramCarousel items={instagramStories} label="Student stories" id="stories" filters />
      <MediaPrivacyNote />
      <div className={`${styles.wrap} ${styles.storyBottom}`}>
        <span>Your next chapter could start with a conversation.</span>
        <a href="/applynow">Start your application <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

function MediaPrivacyNote() {
  return <p className={`${styles.wrap} ${styles.privacy}`}>Opening a post loads Instagram media from Meta. <a href="/applynow/privacy#instagram-media">About embedded media</a></p>;
}
