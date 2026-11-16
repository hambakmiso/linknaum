import LinkCard from "@/components/LinkCard";
import Profile from "@/components/Profile";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-5 py-10">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      {/* 상단: 원형 프로필 사진 + 이름 + 한 줄 소개 */}
      <Profile name={profile.name} bio={profile.bio} image={profile.image} />

      {/* 하단: 링크 카드 3개 (세로 배치) */}
      <ul className="flex flex-col gap-6">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard {...link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
