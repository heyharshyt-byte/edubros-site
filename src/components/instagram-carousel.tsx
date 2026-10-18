"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { filterInstagramStories, type InstagramPost, type StoryFilter } from "@/lib/instagram";
import styles from "./instagram.module.css";

const InstagramDialog = dynamic(() => import("./instagram-dialog"));
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getMotion = () => window.matchMedia(motionQuery).matches;
const serverMotion = () => true;
const filterOptions: { value: StoryFilter; label: string }[] = [
  { value: "all", label: "All stories" },
  { value: "visa", label: "Visa approvals" },
  { value: "interview", label: "Student interviews" },
];

export function InstagramCarousel({ items, label, id, filters = false }: {
  items: InstagramPost[]; label: string; id: string; filters?: boolean;
}) {
  const [filter, setFilter] = useState<StoryFilter>("all");
  const [selected, setSelected] = useState<InstagramPost | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visible = useMemo(() => filterInstagramStories(items, filter), [items, filter]);

  return <>
    <CarouselRail items={visible} label={label} id={id} modalOpen={!!selected}
      onOpen={(item, button) => { trigger.current = button; setSelected(item); }}
      toolbar={filters ? <div className={styles.filters} role="group" aria-label="Filter student stories">
        {filterOptions.map(option => <button type="button" key={option.value} aria-pressed={filter === option.value}
          aria-controls={`${id}-viewport`} onClick={() => setFilter(option.value)}>{option.label}</button>)}
      </div> : <p className={styles.eyebrow}>{label}</p>} />
    {filters && <p className="sr-only" role="status">{visible.length} {filter === "all" ? "student stories" : filter === "visa" ? "visa approvals" : "student interviews"}</p>}
    {selected && <InstagramDialog item={selected} onClose={() => {
      setSelected(null);
      trigger.current?.focus({ preventScroll: true });
    }} />}
  </>;
}

function CarouselRail({ items, label, id, toolbar, modalOpen, onOpen }: {
  items: InstagramPost[]; label: string; id: string; toolbar: ReactNode; modalOpen: boolean;
  onOpen: (item: InstagramPost, button: HTMLButtonElement) => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);
  const motion = useSyncExternalStore(subscribeMotion, getMotion, serverMotion);
  const [paused, setPaused] = useState(false);
  const [looping, setLooping] = useState(false);
  const [inView, setInView] = useState(false);
  const runtime = useRef({ cycle: 0, step: 0, hover: false, focused: false, suspendUntil: 0, fraction: 0 });

  useEffect(() => {
    const element = viewport.current!;
    const group = firstGroup.current!;
    element.scrollLeft = 0;
    const measure = () => {
      const padding = getComputedStyle(element);
      const gap = parseFloat(getComputedStyle(group).gap) || 0;
      runtime.current.cycle = group.offsetWidth + gap;
      runtime.current.step = (group.firstElementChild as HTMLElement)?.offsetWidth + gap;
      setLooping(group.offsetWidth > element.clientWidth - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight));
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    resize.observe(group);
    const intersection = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    intersection.observe(element);
    const suspend = () => { runtime.current.suspendUntil = performance.now() + 8000; };
    element.addEventListener("pointerdown", suspend, { passive: true });
    element.addEventListener("wheel", suspend, { passive: true });
    element.addEventListener("touchstart", suspend, { passive: true });
    return () => {
      resize.disconnect(); intersection.disconnect();
      element.removeEventListener("pointerdown", suspend);
      element.removeEventListener("wheel", suspend);
      element.removeEventListener("touchstart", suspend);
    };
  }, [items]);

  useEffect(() => {
    if (!looping || !inView || paused || motion || modalOpen) return;
    const element = viewport.current!;
    let frame = 0;
    let previous = performance.now();
    function animate(now: number) {
      const delta = Math.min(now - previous, 50);
      previous = now;
      const state = runtime.current;
      if (!document.hidden && !state.hover && !state.focused && now >= state.suspendUntil) {
        state.fraction += delta * 0.026;
        if (state.fraction >= 1 && state.cycle > 0) {
          const step = Math.floor(state.fraction);
          element.scrollLeft = (element.scrollLeft + step) % state.cycle;
          state.fraction -= step;
        }
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [looping, inView, paused, motion, modalOpen]);

  function move(direction: number) {
    const element = viewport.current!;
    const state = runtime.current;
    state.suspendUntil = performance.now() + 8000;
    const position = element.scrollLeft % state.cycle;
    const target = position + direction * state.step;
    if (target < 0 || target >= state.cycle) {
      element.scrollLeft = (target + state.cycle) % state.cycle;
      return;
    }
    if (element.scrollLeft >= state.cycle) element.scrollLeft = position;
    element.scrollBy({ left: direction * state.step, behavior: motion ? "auto" : "smooth" });
  }

  return <div role="region" aria-roledescription="carousel" aria-label={label}>
    <div className={`${styles.wrap} ${styles.toolbar}`}>
      {toolbar}
      <div className={styles.controls}>
        <button type="button" className={styles.pause} aria-label={`${paused ? "Resume" : "Pause"} ${label.toLowerCase()}`}
          aria-pressed={paused || motion} disabled={!looping || motion} onClick={() => setPaused(value => !value)}>
          <span aria-hidden="true">{paused || motion ? "▶" : "Ⅱ"}</span><span>{motion ? "Motion off" : paused ? "Play" : "Pause"}</span>
        </button>
        <button type="button" aria-label={`Previous ${label.toLowerCase()}`} disabled={!looping} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label={`Next ${label.toLowerCase()}`} disabled={!looping} onClick={() => move(1)}>→</button>
      </div>
    </div>
    <div ref={viewport} id={`${id}-viewport`} className={styles.viewport}
      onMouseEnter={() => { runtime.current.hover = true; }} onMouseLeave={() => { runtime.current.hover = false; }}
      onFocusCapture={event => {
        runtime.current.focused = true;
        const button = event.target as HTMLElement;
        if (!button.matches(":focus-visible")) return;
        requestAnimationFrame(() => {
          if (!viewport.current || document.activeElement !== button) return;
          const windowRect = viewport.current.getBoundingClientRect();
          const cardRect = button.getBoundingClientRect();
          if (cardRect.left < windowRect.left + 20) viewport.current.scrollLeft += cardRect.left - windowRect.left - 20;
          else if (cardRect.right > windowRect.right - 20) viewport.current.scrollLeft += cardRect.right - windowRect.right + 20;
        });
      }}
      onBlurCapture={event => { runtime.current.focused = event.currentTarget.contains(event.relatedTarget); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          const buttons = [...firstGroup.current!.querySelectorAll<HTMLButtonElement>("button")];
          const index = buttons.indexOf(event.target as HTMLButtonElement);
          if (index < 0) return;
          event.preventDefault();
          const direction = event.key === "ArrowLeft" ? -1 : 1;
          buttons[(index + direction + buttons.length) % buttons.length]?.focus({ preventScroll: true });
        }
      }}>
      <div className={styles.track}>
        <div ref={firstGroup} className={styles.group}>
          {items.map(item => <MediaCard key={item.id} item={item} onOpen={onOpen} />)}
        </div>
        {looping && <div className={styles.group} aria-hidden="true">
          {items.map(item => <MediaCard key={item.id} item={item} onOpen={onOpen} duplicate />)}
        </div>}
      </div>
    </div>
  </div>;
}

function MediaCard({ item, duplicate = false, onOpen }: {
  item: InstagramPost; duplicate?: boolean; onOpen: (item: InstagramPost, button: HTMLButtonElement) => void;
}) {
  const [failed, setFailed] = useState(false);
  return <article className={styles.card}>
    <button type="button" className={`${styles.media} ${item.kind === "visa" ? styles.visa : ""}`}
      tabIndex={duplicate ? -1 : 0} aria-label={`${item.kind === "visa" ? "View" : "Watch"} ${item.title} on Instagram`}
      onClick={event => onOpen(item, event.currentTarget)}>
      {!failed ? <Image src={item.image} alt="" fill sizes="(max-width: 760px) 266px, 310px" onError={() => setFailed(true)} /> :
        <span className={styles.imageFallback}>View the original post on Instagram</span>}
      <span className={styles.cardTop}><span className={styles.tag}>{item.kind === "visa" ? "Visa approved" : item.kind === "interview" ? "Student interview" : "Instagram reel"}</span><span className={styles.instagramMark} aria-hidden="true" /></span>
      {item.kind !== "visa" && <span className={styles.play} aria-hidden="true">▶</span>}
      {item.views && <span className={styles.cardBottom}><span className={styles.views}>{item.views}<small>views</small></span><span className={styles.source}>On @edubros.in</span></span>}
    </button>
    <div className={styles.caption}><div><h3>{item.title}</h3><p>{item.note}</p></div><span aria-hidden="true">↗</span></div>
  </article>;
}
