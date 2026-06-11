import type { Metadata } from "next";
import PublicPortfolioView from "./PublicPortfolioView";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ t?: string; a?: string; hf?: string; bf?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} — Profolyo`,
  };
}

export default async function PublicPortfolioPage({ params, searchParams }: Props) {
  const { username } = await params;
  const { t, a, hf, bf } = await searchParams;

  return (
    <PublicPortfolioView
      username={username}
      templateOverride={t}
      accentOverride={a ? decodeURIComponent(a) : undefined}
      headingFontOverride={hf ? decodeURIComponent(hf) : undefined}
      bodyFontOverride={bf ? decodeURIComponent(bf) : undefined}
    />
  );
}
