import pool from "../../db";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await pool.query(
      "SELECT * FROM MenuItems WHERE id = $1 AND deleted_at IS NULL",
      [id]
    );

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Item not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: result.rows[0] }),
      {
        status: 200,
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

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, description, price, available, img } = await req.json();

    const result = await pool.query(
      "UPDATE MenuItems SET name=$1, description=$2, price=$3, available=$4, img=$5, updated_at=NOW() WHERE id=$6 AND deleted_at IS NULL RETURNING *",
      [name, description, price, available, img, id]
    );

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Item not found or deleted" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ success: true, data: result.rows[0] }),
      {
        status: 200,
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

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const result = await pool.query(
      "UPDATE MenuItems SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Item not found or already deleted",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Item deleted" }),
      {
        status: 200,
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
