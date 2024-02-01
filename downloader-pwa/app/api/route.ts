import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import slugify from "slugify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("link");
  const type = searchParams.get("type");

  if (!url) {
    return NextResponse.json({ data: "No URL" });
  }

  console.log("type", type);

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;
  const data = ytdl(url, {
    filter: type === "video" ? "audioandvideo" : "audioonly",
  });

  return new Response(data as any, {
    headers: {
      "content-type": type === "video" ? "video/mp4" : "audio/mp3",
      "Content-Disposition": `attachment; filename="${slugify(title)}.${
        type === "video" ? "mp4" : "mp3"
      }"`,
    },
  });
}
