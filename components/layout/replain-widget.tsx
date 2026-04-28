"use client";

import { useEffect } from "react";

const WIDGET_ID = "69172753-bb77-4bf1-868b-35024e43f973";
const SCRIPT_ID = "replain-widget-script";
const LOAD_DELAY_MS = 12_000;

declare global {
  interface Window {
    replainSettings?: { id: string };
  }
}

export function ReplainWidget() {
  useEffect(() => {
    let loaded = false;
    let idleId: number | null = null;
    let timeoutId: number | null = null;
    const events = ["pointerdown", "keydown", "touchstart"] as const;

    const loadWidget = () => {
      if (loaded || document.getElementById(SCRIPT_ID)) return;
      loaded = true;
      window.replainSettings = { id: WIDGET_ID };

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://widget.replain.cc/dist/client.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    const scheduleIdleLoad = () => {
      timeoutId = window.setTimeout(() => {
        if ("requestIdleCallback" in window && window.requestIdleCallback) {
          idleId = window.requestIdleCallback(loadWidget, { timeout: 4_000 });
          return;
        }

        loadWidget();
      }, LOAD_DELAY_MS);
    };

    events.forEach((event) => {
      window.addEventListener(event, loadWidget, { once: true, passive: true });
    });
    scheduleIdleLoad();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, loadWidget);
      });
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (idleId !== null && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return null;
}
