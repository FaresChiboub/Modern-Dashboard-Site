// types/next-auth.d.ts or next-auth.d.ts (if directly in the root)
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string; // Adding accessToken to the session type
  }
}
