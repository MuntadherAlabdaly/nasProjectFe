import pool from "../db";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return new Response(
      JSON.stringify({ success: true, time: result.rows[0] }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
