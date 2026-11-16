import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  image: string;
};

export default function Profile({ name, bio, image }: ProfileProps) {
  return (
    <section className="flex flex-col items-center gap-3 text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={160}
        height={160}
        priority
        className="h-40 w-40 rounded-full border border-zinc-300 object-cover dark:border-zinc-700"
      />
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{bio}</p>
    </section>
  );
}
