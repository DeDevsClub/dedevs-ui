import Head from 'next/head';
import { ArticleStructuredData, BreadcrumbStructuredData } from './structured-data';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  noindex?: boolean;
  canonical?: string;
}

export function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  breadcrumbs,
  noindex = false,
  canonical,
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ui.dedevs.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonicalUrl = canonical || fullUrl;
  const imageUrl = image || `${baseUrl}/opengraph-image.png`;

  const pageTitle = title 
    ? `${title} | DeDevs UI` 
    : 'DeDevs UI - Modern Component Library for AI, DeFi & Developer Applications';

  const pageDescription = description || 
    'DeDevs UI is a comprehensive component library featuring AI interfaces, DeFi/Web3 components, and developer portfolio elements. Built on shadcn/ui with TypeScript, Tailwind CSS, and modern React patterns.';

  const allKeywords = [
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
    ...keywords,
  ].join(', ');

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={allKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="DeDevs UI" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={fullUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />
        <meta property="twitter:site" content="@dedevsclub" />
        <meta property="twitter:creator" content="@dedevsclub" />
        
        {/* Article specific meta tags */}
        {type === 'article' && publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {type === 'article' && modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}
        {type === 'article' && author && (
          <meta property="article:author" content={author} />
        )}
        
        {/* Additional SEO tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.github.com" />
      </Head>
      
      {/* Structured Data */}
      {type === 'article' && title && description && (
        <ArticleStructuredData
          title={title}
          description={description}
          url={fullUrl}
          datePublished={publishedTime}
          dateModified={modifiedTime}
          author={author}
          image={imageUrl}
        />
      )}
      
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbStructuredData items={breadcrumbs} />
      )}
    </>
  );
}
