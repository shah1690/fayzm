"use client";

import { useEffect, useState } from "react";

const labels = [
  "Multi-Sector Textile Cluster",
  "Ko'p tarmoqli to'qimachilik klasteri",
  "Многоотраслевой текстильный кластер",
];

export function MultiLangText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % labels.length);
        setVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="text-sm text-white/50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {labels[index]}
    </span>
  );
}
