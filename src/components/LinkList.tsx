"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import { links } from "@/data/profile";

export default function LinkList() {
  // 데이터를 받기 전에는 모두 0회
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Record<string, number> | null) => {
        if (cancelled || !data) return;
        // 응답 전에 눌렀던 클릭은 서버 값에 더해서 유지
        setCounts((prev) => {
          const next: Record<string, number> = { ...data };
          for (const [id, n] of Object.entries(prev)) {
            next[id] = (next[id] ?? 0) + n;
          }
          return next;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ul className="flex flex-col gap-6">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            {...link}
            count={counts[link.id] ?? 0}
            onClick={() =>
              setCounts((prev) => ({ ...prev, [link.id]: (prev[link.id] ?? 0) + 1 }))
            }
          />
        </li>
      ))}
    </ul>
  );
}
