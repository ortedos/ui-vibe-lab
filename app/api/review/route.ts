import { NextResponse } from "next/server";
import OpenAI from "openai";

function fallbackReview(context: string) {
  return {
    score: 72,
    findings: [
      "Primary call to action is not dominant enough.",
      "The hierarchy between headline, support copy, and form fields can be clearer.",
      "One or two trust signals are missing near the conversion area."
    ],
    actions: [
      "Increase visual contrast for the main CTA.",
      "Reduce secondary text above the fold.",
      "Add one proof element near the form or action button.",
      "Shorten the initial flow to the first meaningful action.",
      `Check whether the screen context '${context}' matches the intended user job.`
    ]
  };
}

export async function POST(request: Request) {
  const { context } = await request.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ mode: "demo", review: fallbackReview(context || "generic landing page") });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: "You are a senior UX reviewer. Return JSON with score, findings, actions." },
      { role: "user", content: `Review this interface context: ${context}. Give a concise UX review as JSON.` }
    ]
  });

  try {
    return NextResponse.json({ mode: "ai", review: JSON.parse(completion.output_text) });
  } catch {
    return NextResponse.json({ mode: "fallback", review: fallbackReview(context || "generic landing page"), raw: completion.output_text });
  }
}
