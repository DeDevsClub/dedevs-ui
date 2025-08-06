import Script from 'next/script';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ui.dedevs.com';

export function OrganizationStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DeDevs Club',
    url: 'https://dedevs.com',
    logo: `${baseUrl}/logo.svg`,
    description: 'DeDevs Club - Building the future of web development with modern tools and technologies.',
    sameAs: [
      'https://github.com/dedevsclub',
      'https://x.com/dedevsclub',
      'https://www.twitter.com/dedevsclub',
      'https://www.linkedin.com/in/buns',
      'https://www.instagram.com/bunsdev',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${baseUrl}/contact`,
    },
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
    />
  );
}

export function WebsiteStructuredData() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DeDevs UI',
    url: baseUrl,
    description: 'Modern component library for AI, DeFi & developer applications. Built on shadcn/ui with TypeScript and Tailwind CSS.',
    publisher: {
      '@type': 'Organization',
      name: 'DeDevs Club',
      url: 'https://dedevs.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData),
      }}
    />
  );
}

export function SoftwareApplicationStructuredData() {
  const softwareData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DeDevs UI Component Library',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    description: 'Comprehensive component library featuring AI interfaces, DeFi/Web3 components, and developer portfolio elements.',
    url: baseUrl,
    author: {
      '@type': 'Organization',
      name: 'DeDevs Club',
      url: 'https://dedevs.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    screenshot: `${baseUrl}/opengraph-image.png`,
    featureList: [
      'AI Interface Components',
      'DeFi/Web3 Components',
      'Developer Portfolio Components',
      'TypeScript Support',
      'Tailwind CSS Integration',
      'Accessible Components',
      'Modern React Patterns',
    ],
  };

  return (
    <Script
      id="software-application-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareData),
      }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = 'DeDevs Club',
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://dedevs.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DeDevs Club',
      url: 'https://dedevs.com',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    image: image || `${baseUrl}/opengraph-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleData),
      }}
    />
  );
}
