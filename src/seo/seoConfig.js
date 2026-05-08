/**
 * CILO / Richi Food Products — Central SEO Configuration
 * 2026-level: OpenGraph, Twitter, Schema.org JSON-LD, AI-optimized metadata
 */

export const SITE = {
  name: 'CILO Juice | Richi Food Products',
  shortName: 'CILO Juice',
  tagline: 'Premium Natural Beverages & Fresh Juices',
  domain: 'https://richifoodproducts.com',
  defaultImage: 'https://richifoodproducts.com/og-image.jpg',
  logo: 'https://richifoodproducts.com/images/logo.png',
  twitterHandle: '@cilojuice',
  locale: 'en_IN',
  language: 'en',
  country: 'IN',
  address: {
    street: '489/1, Karagur Village, Paiyur - 2',
    city: 'Krishnagiri',
    state: 'Tamil Nadu',
    zip: '635112',
    country: 'India',
  },
  contacts: {
    email: 'richifoodproduct@gmail.com',
    phone: '+91 94435 18521',
  },
  social: {
    instagram: 'https://instagram.com/cilojuice',
    facebook: 'https://facebook.com/cilojuice',
  },
  gst: '33ABJFR2254F1ZD',
  fssai: '12424011000549',
}

/** Page-level SEO metadata map */
export const PAGE_SEO = {
  home: {
    title: "CILO Juice | Premium Natural Beverages & Fresh Juices — Tamil Nadu",
    description:
      "CILO by Richi Food Products — Tamil Nadu's premium fruit juice and carbonated beverage brand. 12+ flavors, 100 KL/day capacity. B2B contract manufacturing & white-label solutions.",
    keywords:
      'CILO juice, Richi Food Products, premium juice Tamil Nadu, fresh fruit juice India, mango juice, orange juice, carbonated beverages, B2B juice manufacturer, wholesale beverages South India',
    url: '/',
  },
  about: {
    title: 'About CILO Juice | Richi Food Products — Krishnagiri, Tamil Nadu',
    description:
      'Founded in 2020 in Krishnagiri District, Tamil Nadu, Richi Food Products manufactures premium CILO juices and carbonated beverages with 100 KL/day capacity. FSSAI certified, GST registered.',
    keywords:
      'Richi Food Products, CILO juice company, Tamil Nadu beverage manufacturer, juice factory India, FSSAI certified, food manufacturer Krishnagiri',
    url: '/about',
  },
  products: {
    title: 'Products | Premium Juice & Carbonated Drinks — CILO Juice',
    description:
      "Explore CILO's full range of premium beverages: Mango, Apple, Orange, Grape, Pineapple, Cola, Paneer Soda, Jeera Masala, and more. Available in 200ml, 500ml, 1L, 2L.",
    keywords:
      'CILO juice products, mango juice, orange juice, apple juice, pineapple juice, carbonated drinks, paneer soda, jeera masala drink, cola, buy juice online',
    url: '/products',
  },
  contact: {
    title: 'Contact CILO Juice | B2B Inquiries & Partnerships',
    description:
      'Get in touch with Richi Food Products for B2B partnerships, contract manufacturing, white-label inquiries, and dealership opportunities. Call +91 94435 18521.',
    keywords:
      'contact CILO juice, juice manufacturer contact, B2B beverage supplier, contract manufacturing Tamil Nadu, white label beverages India, juice dealership',
    url: '/contact',
  },
  blog: {
    title: 'The CILO Journal | Juice & Beverage Insights',
    description:
      'Read the latest articles on premium beverages, juice health benefits, beverage trends, and the CILO brand story. Your source for juice industry insights.',
    keywords:
      'juice blog, beverage insights, healthy drinks articles, mango juice benefits, fruit juice wellness, India beverage industry',
    url: '/blog',
  },
  dealership: {
    title: 'Dealership Opportunities | Become a CILO Juice Distributor',
    description:
      'Join the CILO Juice distribution network. Attractive margins, strong brand support, and a proven product lineup. Apply for dealership across Tamil Nadu, Karnataka, and beyond.',
    keywords:
      'CILO juice dealership, juice distributor India, beverage distribution Tamil Nadu, FMCG dealership, juice wholesale, become a distributor',
    url: '/dealership',
  },
  gallery: {
    title: 'Photo Gallery | Visual World of CILO Juice & Facilities',
    description:
      'Explore the visual world of CILO Juice — from our premium fruit juice lineup to our state-of-the-art manufacturing facilities in Krishnagiri, Tamil Nadu.',
    keywords:
      'CILO juice gallery, juice factory photos, beverage manufacturing India, product photography, Krishnagiri factory, food production visuals',
    url: '/gallery',
  },
  csr: {
    title: 'CSR & Sustainability | Our Commitment to the Community',
    description:
      'Richi Food Products is committed to social responsibility. Learn about our initiatives in water conservation, community health, and sustainable manufacturing practices.',
    keywords:
      'CSR initiatives, sustainable juice brand, community support Tamil Nadu, water conservation India, ethical manufacturing, corporate social responsibility',
    url: '/csr',
  },
  investors: {
    title: 'Investor Relations | Growth & Vision — Richi Food Products',
    description:
      'Explore the growth story and future vision of Richi Food Products. Information for partners and investors looking to join our journey in the premium beverage market.',
    keywords:
      'investor relations, beverage industry growth, food tech investment India, Richi Food Products financials, FMCG growth story, invest in juice brand',
    url: '/investors',
  },
  insights: {
    title: 'Industry Insights | Beverage Trends & Innovation',
    description:
      'Deep dives into the beverage industry: market trends, consumer behavior, and CILO\'s approach to innovation in the healthy refreshment space.',
    keywords:
      'beverage market trends, juice industry analysis, consumer health trends, food innovation India, beverage sector insights',
    url: '/insights',
  },
  location: {
    title: 'Presence & Distribution | CILO Juice South India Locations',
    description:
      'Find where CILO Juice is served. Our presence across Tamil Nadu, Karnataka, and our growing distribution network in South India.',
    keywords:
      'CILO juice locations, buy juice Tamil Nadu, distribution network India, beverage availability South India, Krishnagiri head office',
    url: '/location',
  },
}

/** Organization JSON-LD Schema */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.domain}/#organization`,
    name: 'Richi Food Products Private Limited',
    alternateName: 'CILO Juice',
    url: SITE.domain,
    logo: {
      '@type': 'ImageObject',
      url: SITE.logo,
      width: 200,
      height: 80,
    },
    description:
      'CILO by Richi Food Products — A premium fruit juice and carbonated beverage manufacturer in Tamil Nadu, India. Established 2020. FSSAI certified, 100 KL/day production capacity.',
    foundingDate: '2020',
    foundingLocation: 'Krishnagiri, Tamil Nadu, India',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '489/1, Karagur Village, Paiyur - 2',
      addressLocality: 'Krishnagiri',
      addressRegion: 'Tamil Nadu',
      postalCode: '635112',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-94435-18521',
        contactType: 'sales',
        areaServed: ['IN'],
        availableLanguage: ['English', 'Tamil'],
      },
    ],
    sameAs: [SITE.social.instagram, SITE.social.facebook],
    vatID: SITE.gst,
    leiCode: SITE.fssai,
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
    knowsAbout: [
      'Fruit Juice Manufacturing',
      'Carbonated Beverages',
      'Contract Manufacturing',
      'White Label Beverages',
      'B2B Food Products',
    ],
  }
}

/** Website JSON-LD Schema */
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.name,
    description: SITE.tagline,
    publisher: { '@id': `${SITE.domain}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.domain}/products?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-IN',
  }
}

/** Product JSON-LD Schema */
export function buildProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `CILO ${product.name}`,
    description: product.description || `Premium ${product.name} beverage by CILO Juice, crafted by Richi Food Products in Tamil Nadu.`,
    image: `${SITE.domain}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'CILO Juice',
    },
    manufacturer: { '@id': `${SITE.domain}/#organization` },
    category: product.category || 'Beverages',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE.domain}/#organization` },
    },
    countryOfOrigin: { '@type': 'Country', name: 'India' },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'FSSAI License', value: SITE.fssai },
      { '@type': 'PropertyValue', name: 'GST Number', value: SITE.gst },
    ],
  }
}

/** Article / Blog Post JSON-LD Schema */
export function buildArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `${SITE.domain}${post.image}`,
    },
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CILO Juice | Richi Food Products',
      logo: { '@type': 'ImageObject', url: SITE.logo },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.domain}/blog/${post.slug}`,
    },
    keywords: post.tags ? post.tags.join(', ') : '',
    articleSection: post.category,
    inLanguage: 'en-IN',
  }
}

/** BreadcrumbList JSON-LD Schema */
export function buildBreadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${SITE.domain}${crumb.path}`,
    })),
  }
}

/** FAQ JSON-LD Schema */
export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/** LocalBusiness JSON-LD Schema */
export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${SITE.domain}/#localbusiness`,
    name: 'Richi Food Products Private Limited (CILO Juice)',
    image: SITE.logo,
    url: SITE.domain,
    telephone: '+91-94435-18521',
    email: SITE.contacts.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '489/1, Karagur Village, Paiyur - 2',
      addressLocality: 'Krishnagiri',
      addressRegion: 'Tamil Nadu',
      postalCode: '635112',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.5257,
      longitude: 78.2143,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    servesCuisine: 'Beverages',
    priceRange: 'Rs.Rs.',
    areaServed: ['Tamil Nadu', 'Karnataka', 'South India'],
  }
}
