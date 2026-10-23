/**
 * 既存IDENTIVEのmicroCMS（works-detail）を読み取り専用で参照する。
 * GETのみ。書き込み・削除は一切行わない。キーはサーバー側でのみ使用する。
 */
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

type MicroCMSImage = { url: string; width?: number; height?: number };

export type Work = {
  id: string;
  title?: string;
  subtitle?: string;
  category?: string[] | string;
  client?: string;
  outline?: string;
  scope?: string;
  project?: string;
  siteUrl?: string;
  thumbnail?: MicroCMSImage;
  hero_image?: MicroCMSImage;
  image?: MicroCMSImage[];
};

type ListResponse<T> = { contents: T[]; totalCount: number };

async function get<T>(path: string): Promise<T> {
  if (!SERVICE_DOMAIN || !API_KEY) throw new Error("microCMS env is not set");
  const res = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/${path}`, {
    headers: { "X-MICROCMS-API-KEY": API_KEY },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`microCMS error: ${res.status}`);
  return res.json();
}

export async function getWorks(limit = 100): Promise<Work[]> {
  try {
    const data = await get<ListResponse<Work>>(`works-detail?limit=${limit}`);
    return data.contents ?? [];
  } catch {
    return [];
  }
}

export async function getWork(id: string): Promise<Work | null> {
  try {
    return await get<Work>(`works-detail/${id}`);
  } catch {
    return null;
  }
}

/** microCMS画像APIでWebPに変換したURL */
export function toWebp(url: string, quality = 85): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}fm=webp&q=${quality}`;
}

export function toTagArray(category: Work["category"]): string[] {
  if (Array.isArray(category)) return category.filter(Boolean);
  if (typeof category === "string") return category.split(",").map((c) => c.trim()).filter(Boolean);
  return [];
}

export function workThumb(work: Work): MicroCMSImage | undefined {
  return work.thumbnail ?? work.hero_image ?? work.image?.[0];
}

/** 担当範囲（改行・読点区切り）を配列にする */
export function toList(text?: string): string[] {
  return (text ?? "").split(/[\n、,，]/).map((s) => s.trim()).filter(Boolean);
}
