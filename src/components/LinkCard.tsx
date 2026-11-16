"use client";

import type { LinkItem } from "@/data/profile";

type Props = LinkItem & {
  count: number;
  onClick: () => void;
};

export default function LinkCard({ id, title, url, count, onClick }: Props) {
  function recordClick() {
    onClick();
    try {
      // 페이지 이동/새 탭 열림과 무관하게 전송되도록 keepalive 사용
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
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
      className="flex w-full items-center rounded-2xl border border-zinc-300 bg-white px-5 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      {/* 좌우 균형을 위한 빈 칸 — 제목은 가운데 유지 */}
      <span className="w-12" aria-hidden />
      <span className="flex-1 text-center">{title}</span>
      <span className="w-12 text-right text-xs text-zinc-500 dark:text-zinc-400">
        {count}회
      </span>
    </a>
  );
}
