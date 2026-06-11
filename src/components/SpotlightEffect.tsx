"use client";

import { useEffect } from "react";

/**
 * Cursor-tracking spotlight for cards. One passive document-level listener
 * feeds --spot-x/--spot-y custom properties to whichever `.card-glass` /
 * `.card-spotlight` element the pointer is over; the glow itself is painted
 * by CSS (see globals.css). Renders nothing.
 */
export default function SpotlightEffect() {
  useEffect(() => {
    // Touch devices have no meaningful cursor position; skip entirely.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onPointerMove = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const card = target.closest(".card-glass, .card-spotlight");
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
