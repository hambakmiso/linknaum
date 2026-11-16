import { links } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

// 모든 링크의 클릭 수를 한 번에 반환: { github: 42, linkedin: 0, ... }
export async function GET() {
  try {
    const client = await getMongoClient();
    const docs = await client
      .db("linknamu")
      .collection<{ _id: string; count: number }>("clicks")
      .find({ _id: { $in: links.map((link) => link.id) } })
      .toArray();
    const counts: Record<string, number> = {};
    for (const link of links) counts[link.id] = 0;
    for (const doc of docs) counts[doc._id] = doc.count;
    return Response.json(counts);
  } catch (error) {
    console.error("fetch counts failed", error);
    return Response.json({ error: "failed to fetch counts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const id = body?.id;

  if (typeof id !== "string" || !links.some((link) => link.id === id)) {
    return Response.json({ error: "invalid link id" }, { status: 400 });
  }

  try {
    const client = await getMongoClient();
    await client
      .db("linknamu")
      .collection<{ _id: string; count: number }>("clicks")
      .updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("click count failed", error);
    return Response.json({ error: "failed to record click" }, { status: 500 });
  }
}
