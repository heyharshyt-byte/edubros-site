"use client";

import { useEffect, useRef, useState } from "react";
import { instagramEmbedUrl, type InstagramPost } from "@/lib/instagram";
import styles from "./instagram.module.css";

export default function InstagramDialog({ item, onClose }: { item: InstagramPost; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const element = dialog.current!;
    const oldOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    const timeout = window.setTimeout(() => setSlow(true), 12000);
    return () => { window.clearTimeout(timeout); element.close(); document.body.style.overflow = oldOverflow; };
  }, []);

  function close() {
    // Remove the modal's inert background before restoring the triggering card.
    dialog.current?.close();
    onClose();
  }

  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="instagram-player-heading"
    onCancel={event => { event.preventDefault(); close(); }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }}>
    <div className={styles.dialogHeader}>
      <div><p className={styles.eyebrow}>From @edubros.in</p><h2 id="instagram-player-heading">{item.title}</h2></div>
      <button type="button" className={styles.close} aria-label="Close Instagram post" onClick={close}>×</button>
    </div>
    <div className={styles.embed}>
      {!loaded && <p className={styles.loading} role="status">{slow ? "Taking longer than expected. You can open the original post below." : "Loading the original Instagram post…"}</p>}
      <iframe src={instagramEmbedUrl(item.url)} title={`${item.title} · Instagram post`}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin" onLoad={() => setLoaded(true)} />
    </div>
    <div className={styles.dialogFooter}>
      <p>Instagram may ask you to sign in. If the player is unavailable, open the original post below.</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer">Open original post on Instagram <span aria-hidden="true">↗</span></a>
    </div>
  </dialog>;
}
