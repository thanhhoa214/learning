import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import slugify from "slugify";
import { writeFile } from "fs";

export async function GET(request: Request, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("link");
  const type = searchParams.get("type");

  if (!url) {
    return NextResponse.json({ data: "No URL" });
  }

  console.log("type", type);

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;
  const data = ytdl(
    url,
    type === "video" ? { quality: "highest" } : { filter: "audioonly" }
  );

  return new Response(data as any, {
    headers: {
      "content-type": type === "video" ? "video/mp4" : "audio/mp3",
      "Content-Disposition": `attachment; filename="${slugify(title)}.${
        type === "video" ? "mp4" : "mp3"
      }"`,
    },
  });
}
