export const runtime = "nodejs";

export const dynamic = "force-dynamic";

import { waitUntil } from "@vercel/functions";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"), // Limit to 10 requests per 10 seconds
  prefix: "@upstash/ratelimit",
  analytics: true,
});

export async function GET(request: Request) {
  const identifier = request.headers.get("x-forwarded-for") || "";
  const { success, limit, remaining, pending } = await ratelimit.limit(
    identifier
  );

  const response = {
    success,
    limit,
    remaining,
  };

  // Use waitUntil to ensure the analytics are submitted before the function exits
  waitUntil(pending);

  // If rate limit exceeded, return 429 status with the response
  if (!success) {
    return new Response(JSON.stringify(response), { status: 429 });
  }

  // Otherwise, return the response
  return new Response(JSON.stringify(response));
}
