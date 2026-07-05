import { NextResponse } from "next/server";
import { getDb } from "../../../lib/db";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const offset = Math.max(0, parseInt(searchParams.get("offset") ?? "0", 10));
  const limit = Math.min(96, Math.max(1, parseInt(searchParams.get("limit") ?? "48", 10)));
  const source = searchParams.get("source") ?? "";

  const sql = getDb();
  if (!sql) return NextResponse.json([], { status: 503 });

  try {
    let rows;
    if (source && source !== "all") {
      rows = await sql`
        SELECT slug, source, title, price, original_price, discount_pct,
               currency, image_url, category, detected_at
        FROM deals
        WHERE source = ${source}
        ORDER BY detected_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      rows = await sql`
        SELECT slug, source, title, price, original_price, discount_pct,
               currency, image_url, category, detected_at
        FROM deals
        ORDER BY detected_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }
    return NextResponse.json(rows);
  } catch (e) {
    console.error("[api/deals]", e.message);
    return NextResponse.json([], { status: 500 });
  }
}
