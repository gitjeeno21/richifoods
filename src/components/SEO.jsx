/**
 * SEO.jsx — Universal SEO Head Component
 * Handles: title, meta, OpenGraph, Twitter/X, canonical, schema, AI crawlers
 */
import { Helmet } from 'react-helmet-async'
import { SITE } from '../seo/seoConfig'

/**
 * @param {string}  title       - Page title (will be appended with site name)
 * @param {string}  description - Meta description (120-160 chars ideal)
 * @param {string}  [url]       - Canonical path e.g. "/products"
 * @param {string}  [image]     - Absolute OG image URL
 * @param {string}  [keywords]  - Comma separated keywords
 * @param {string}  [type]      - OG type: "website" | "article" | "product"
 * @param {object|object[]} [schema] - JSON-LD schema object(s)
 * @param {string}  [robots]    - Robots meta e.g. "noindex,nofollow"
 * @param {string}  [publishedAt] - ISO date for articles
 */
export default function SEO({
  title,
  description,
  url = '/',
  image,
  keywords = '',
  type = 'website',
  schema = null,
  robots = 'index,follow',
  publishedAt,
}) {
  const fullTitle = title
    ? `${title} | CILO Juice`
    : SITE.name
  const metaDesc = description || SITE.tagline
  const canonicalUrl = `${SITE.domain}${url}`
  const ogImage = image || SITE.defaultImage

  // Support single or array of schemas
  const schemas = schema
    ? Array.isArray(schema) ? schema : [schema]
    : []

  return (
    <Helmet>
      {/* ── Core ───────────────────────────────────────────── */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── OpenGraph ──────────────────────────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.shortName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE.shortName} — ${metaDesc.slice(0, 80)}`} />
      <meta property="og:locale" content={SITE.locale} />

      {/* ── Twitter / X Card ───────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:creator" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${SITE.shortName} — Premium Juice Brand`} />

      {/* ── Article-specific ───────────────────────────────── */}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {publishedAt && <meta property="article:author" content={SITE.name} />}

      {/* ── AI Crawler Hints ───────────────────────────────── */}
      <meta name="bingbot" content="index,follow" />
      <meta name="slurp" content="index,follow" />
      {/* Perplexity / ChatGPT / Claude — these respect standard robots */}
      <meta name="GPTBot" content="index,follow" />
      <meta name="Claude-Web" content="index,follow" />
      <meta name="PerplexityBot" content="index,follow" />

      {/* ── Structured Data JSON-LD ────────────────────────── */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}
