"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ id, title, url }: LinkItem) {
  function recordClick() {
    const payload = JSON.stringify({ id });
    try {
      // 페이지 이동/새 탭 열림과 무관하게 전송되도록 keepalive 사용
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    } catch {
      // 클릭 집계 실패는 링크 이동을 막지 않음
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      className="block w-full rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      {title}
    </a>
  );
}
