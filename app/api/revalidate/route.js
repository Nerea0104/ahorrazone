import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/es/ofertas");
  revalidatePath("/en/ofertas");

  const slug = searchParams.get("slug");
  if (slug) {
    revalidatePath(`/es/ofertas/${slug}`);
    revalidatePath(`/en/ofertas/${slug}`);
  }

  return NextResponse.json({ revalidated: true });
}
