import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { streamEnabled } = await req.json();
    const configPath = path.join(process.cwd(), "public/config.json");

    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData);

    config.streamEnabled = streamEnabled;

    await fs.writeFile(configPath, JSON.stringify(config, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
