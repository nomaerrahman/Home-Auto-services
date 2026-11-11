import { NextResponse } from "next/server";

/**
 * Lead capture endpoint (demo). Connect this to the client's CRM:
 * HubSpot, Jobber, ServiceTitan, GoHighLevel, or a Resend/Postmark email.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.phone) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  const reference = `APX-${Date.now().toString(36).slice(-6).toUpperCase()}`;
  console.log("[lead]", reference, { trade: body.trade, date: body.date, slot: body.slot, estimate: body.prefill?.estimate });
  return NextResponse.json({ ok: true, reference });
}
