import pool from "../db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, name, description, price, available, img, updated_at FROM MenuItems WHERE deleted_at IS NULL ORDER BY id ASC"
    );

    return new Response(JSON.stringify({ success: true, data: result.rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req) {
  try {
    const { name, description, price, available, img } = await req.json();
    const result = await pool.query(
      "INSERT INTO MenuItems (name, description, price, available, img, updated_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
      [name, description, price, available, img]
    );

    return new Response(
      JSON.stringify({ success: true, data: result.rows[0] }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
