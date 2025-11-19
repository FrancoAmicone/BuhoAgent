import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    console.log("📨 Received request:", { message, sessionId });

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      console.error("❌ N8N_WEBHOOK_URL not configured");
      return NextResponse.json(
        { error: "N8N webhook URL not configured" },
        { status: 500 }
      );
    }

    console.log("🚀 Calling n8n webhook:", n8nWebhookUrl);

    // Llamar al webhook de n8n con el formato esperado
    const payload = { 
      chatInput: message,
      sessionId: sessionId 
    };
    
    console.log("📤 Sending payload:", payload);

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📥 n8n response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ n8n webhook error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return NextResponse.json(
        { 
          error: "Workflow error",
          details: `n8n returned ${response.status}: ${errorText}`
        },
        { status: 500 }
      );
    }

    // Intentar parsear como JSON, si falla, asumir que es texto plano
    const responseText = await response.text();
    console.log("📦 Raw response:", responseText.substring(0, 200));
    
    let data;
    try {
      // Intentar parsear como JSON
      data = JSON.parse(responseText);
      console.log("✅ Parsed as JSON:", data);
    } catch {
      // Si no es JSON válido, envolver el texto en el formato esperado
      console.log("📝 Response is plain text, wrapping in JSON format");
      data = { reply: responseText };
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error calling n8n webhook:", error);
    return NextResponse.json(
      { 
        error: "Workflow error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

