import { notFound } from "next/navigation";

import { getListDetail, ListDetailView, toPositiveInt } from "@/features/lists";

// DB-backed content must render per request (no DATABASE_URL at build time).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const listId = toPositiveInt(id);
  if (!listId) return { title: "Списък" };
  const list = await getListDetail(listId);
  return { title: list ? `${list.emoji} ${list.title}` : "Списък" };
}

export default async function ListPage({ params }) {
  const { id } = await params;
  const listId = toPositiveInt(id);
  if (!listId) notFound();
  const list = await getListDetail(listId);
  if (!list) notFound();
  return <ListDetailView list={list} />;
}
