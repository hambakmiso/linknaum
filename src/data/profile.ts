export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

// 더미 값 — 나중에 실제 내용으로 교체
export const profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  image: "/profile.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "Github", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com/blog" },
];
