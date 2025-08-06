import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ui.dedevs.com';
const sourceUrl = process.env.NEXT_PUBLIC_SOURCE_URL || 'https://devcdn-ui.dedevs.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'DeDevs UI - Modern Component Library for AI, DeFi & Developer Applications',
    template: '%s | DeDevs UI',
  },
  description: 'DeDevs UI is a comprehensive component library featuring AI interfaces, DeFi/Web3 components, and developer portfolio elements. Built on shadcn/ui with TypeScript, Tailwind CSS, and modern React patterns.',
  keywords: [
    'React components',
    'UI library',
    'shadcn/ui',
    'TypeScript',
    'Tailwind CSS',
    'AI components',
    'DeFi components',
    'Web3 UI',
    'Developer portfolio',
    'Component registry',
    'Design system',
    'Next.js components',
    'Accessible components',
    'Modern UI',
    'Component library',
  ],
  authors: [
    {
      name: 'DeDevs Club',
      url: 'https://ui.dedevs.com',
    },
  ],
  creator: 'DeDevs Club',
  publisher: 'DeDevs Club',
  category: 'Technology',
  classification: 'Web Development',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'DeDevs UI',
    title: 'DeDevs UI - Modern Component Library for AI, DeFi & Developer Applications',
    description: 'Comprehensive component library featuring AI interfaces, DeFi/Web3 components, and developer portfolio elements. Built on shadcn/ui with TypeScript and Tailwind CSS.',
    images: [
      {
        url: `${sourceUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'DeDevs UI - Modern Component Library',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dedevsclub',
    creator: '@dedevsclub',
    title: 'DeDevs UI - Modern Component Library',
    description: 'Comprehensive component library for AI, DeFi & developer applications. Built on shadcn/ui.',
    images: [`${sourceUrl}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION,
  //   yandex: process.env.YANDEX_VERIFICATION,
  //   yahoo: process.env.YAHOO_VERIFICATION,
  //   other: {
  //     'msvalidate.01': process.env.BING_VERIFICATION || '',
  //   },
  // },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': baseUrl,
    },
  },
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
};

export function createMetadata({
  title,
  description,
  image,
  path = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
} = {}): Metadata {
  const url = `${baseUrl}${path}`;
  const imageUrl = image || `${sourceUrl}/opengraph-image.png`;

  return {
    ...defaultMetadata,
    title: title ? `${title} | DeDevs UI` : defaultMetadata.title,
    description: description || defaultMetadata.description,
    keywords: tags ? [...(defaultMetadata.keywords as string[]), ...tags] : defaultMetadata.keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      url,
      title: title || defaultMetadata.openGraph?.title,
      description: description || defaultMetadata.openGraph?.description,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || 'DeDevs UI',
          type: 'image/png',
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        tags,
      }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || defaultMetadata.twitter?.title,
      description: description || defaultMetadata.twitter?.description,
      images: [imageUrl],
    },
    alternates: {
      ...defaultMetadata.alternates,
      canonical: url,
    },
  };
}
