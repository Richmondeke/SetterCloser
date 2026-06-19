import { NextRequest, NextResponse } from "next/server";
import { Composio } from "composio-core";

export async function POST(req: NextRequest) {
  try {
    const { appName, userId = "default_user" } = await req.json();
    
    // Get API key from request headers or process.env
    const apiKey = req.headers.get("x-composio-key") || process.env.COMPOSIO_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Composio API key is required. Please set process.env.COMPOSIO_API_KEY or provide it in the connection modal." },
        { status: 400 }
      );
    }

    // Map app names to Composio slugs
    const appMap: Record<string, string> = {
      crm: "hubspot",
      email: "gmail",
      calendar: "googlecalendar",
      linkedin: "linkedin",
    };
    
    const composioApp = appMap[appName] || appName;

    // Initialize Composio
    const composio = new Composio({ apiKey });
    
    // Initiate connection using the correct SDK v0.5.39 method
    const connectionRequest = await composio.connectedAccounts.initiate({
      appName: composioApp,
      entityId: userId,
    });
    
    return NextResponse.json({
      redirectUrl: connectionRequest.redirectUrl,
      connectedAccountId: connectionRequest.connectedAccountId || "",
    });
  } catch (error: any) {
    console.error("Composio Connection Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initiate Composio connection" },
      { status: 500 }
    );
  }
}
