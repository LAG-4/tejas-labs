import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { studio } from "@/lib/studio";
import { ProposalView } from "./proposal-view";

/** Slugs that should never render a proposal (real site namespaces). */
const RESERVED_SLUGS = new Set(["api"]);

/** Turn a URL slug into a display name: "acme-corp" -> "Acme Corp",
 *  "acme_corp" -> "Acme Corp", "acme.io" -> "Acme.io". */
function clientNameFromSlug(slug: string): string {
  const parts = slug
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return parts
    .map((part) =>
      part
        .split(".")
        .map((seg) => (seg ? seg[0].toUpperCase() + seg.slice(1) : seg))
        .join("."),
    )
    .join(" ");
}

/** Stable, slug-derived "Proposal No." so each client link feels numbered. */
function proposalNumberFromSlug(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h << 5) - h + slug.charCodeAt(i);
    h |= 0;
  }
  return `#${(Math.abs(h) % 10000).toString().padStart(4, "0")}`;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = clientNameFromSlug(slug);
  return {
    title: `Proposal for ${name}`,
    description: `A proposal prepared for ${name} — AI chatbots, automation, lead-gen sites, and full-stack builds from ${studio.name}.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `A proposal for ${name}`,
      description: `Prepared exclusively for ${name} by ${studio.name}.`,
      type: "website",
    },
  };
}

export default async function ProposalPage({ params }: Props) {
  const { slug } = await params;
  if (!slug || RESERVED_SLUGS.has(slug.toLowerCase())) notFound();

  const clientName = clientNameFromSlug(slug);
  const preparedOn = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const proposalNo = proposalNumberFromSlug(slug);

  return (
    <ProposalView
      clientName={clientName}
      slug={slug}
      preparedOn={preparedOn}
      proposalNo={proposalNo}
    />
  );
}
