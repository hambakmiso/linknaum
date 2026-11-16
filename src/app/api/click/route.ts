import { links } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

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
