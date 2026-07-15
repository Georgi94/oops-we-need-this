import { SpaceOverview } from "@/features/lists";

// DB-backed content must render per request (no DATABASE_URL at build time).
export const dynamic = "force-dynamic";

export default function HomePage() {
  return <SpaceOverview />;
}
