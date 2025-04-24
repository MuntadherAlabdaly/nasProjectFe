import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { videoId } = await req.json();

    if (!videoId || typeof videoId !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid video ID" }),
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public/videoId.json");

    let videoData = { videoIds: [] };

    try {
      await fs.access(filePath);
      const fileContent = await fs.readFile(filePath, "utf-8");
      videoData = JSON.parse(fileContent);
    } catch {
      videoData = { videoIds: [] };
    }


    videoData = { videoIds: [videoId] }
    await fs.writeFile(filePath, JSON.stringify(videoData, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}