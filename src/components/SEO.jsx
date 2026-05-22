/**
 * Universal SEO head component.
 */
import { Helmet } from 'react-helmet-async'
import { SITE } from '../seo/seoConfig'

/**
 * @param {string}  title
 * @param {string}  description
 * @param {string}  [url]
 * @param {string}  [image]
 * @param {string}  [keywords]
 * @param {string}  [type]
 * @param {object|object[]} [schema]
 * @param {string}  [robots]
 * @param {string}  [publishedAt]
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
  const brandTokens = [SITE.companyName, SITE.brandName, SITE.shortName].filter(Boolean)
  const hasBrandInTitle = title ? brandTokens.some((token) => title.includes(token)) : false
  const fullTitle = title
    ? (hasBrandInTitle ? title : `${title} | ${SITE.companyName}`)
    : SITE.name
  const metaDesc = description || SITE.tagline
  const canonicalUrl = `${SITE.domain}${url}`
  const ogImage = image || SITE.defaultImage
  const schemas = schema
    ? Array.isArray(schema) ? schema : [schema]
    : []

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE.shortName} - ${metaDesc.slice(0, 80)}`} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:creator" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${SITE.shortName} - Premium Juice Brand`} />

      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {publishedAt && <meta property="article:author" content={SITE.companyName || SITE.name} />}

      <meta name="bingbot" content="index,follow" />
      <meta name="slurp" content="index,follow" />
      <meta name="GPTBot" content="index,follow" />
      <meta name="Claude-Web" content="index,follow" />
      <meta name="PerplexityBot" content="index,follow" />

      {schemas.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}
