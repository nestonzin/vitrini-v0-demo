import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("store_id", 1);

  if (category && category !== "todos") {
    query = query.eq("category", category);
  }

  const {
    data: products,
    error,
    count,
  } = await query.range(offset, offset + limit - 1).order("id");

  console.log('Query Response:', { products, error, count });
  console.log('Search Params:', { category, page, limit, offset });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    products,
    totalCount: count,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}
