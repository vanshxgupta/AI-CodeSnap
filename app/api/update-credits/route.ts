import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, newCredits } = await req.json();

    if (!email || typeof newCredits !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await db
      .update(usersTable)
      .set({ credits: newCredits })
      .where(eq(usersTable.email, email));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Credits API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
